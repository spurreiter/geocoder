'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
var isocode = require('../utils/isocode.cjs');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * @typedef {object} MapQuestForwardQuery
 * @property {string} address -
 * @property {number} [limit=5] Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [autocomplete]
 * @property {boolean} [fuzzyMatch]
 * @property {boolean} [routing]
 * @property {number[]} [bbox]
 * @property {number[]} [proximity]
 * @property {string[]} [country]
 */

/**
 * @typedef {object} MapQuestReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=5] Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [routing]
 * @property {string[]} [country]
 */

class MapQuestGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://developer.mapquest.com/documentation/geocoding-api
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit=5]
   * @param {string} [options.language]
   * @param {boolean} [options.licensed] Use licensed data instead of open data see https://developer.mapquest.com/documentation/open/
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options);

    const { apiKey, licensed = true, limit: maxResults, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      maxResults,
      key: apiKey
    };

    const domainPart = licensed ? 'www' : 'open';

    this.endpoint = `http://${domainPart}.mapquestapi.com/geocoding/v1/address`;
    this.revEndpoint = `http://${domainPart}.mapquestapi.com/geocoding/v1/reverse`;
  }

  /**
   * @param {string|MapQuestForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query) {
    let params = { ...this.params, location: query };

    if (typeof query !== 'string' && query.address) {
      const { address, limit, ...other } = query;
      params = { ...params, ...other, location: address, maxResults: limit };
    }

    const url = this.createUrl(this.endpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!Array.isArray(result?.results?.[0]?.locations)) {
      return this.wrapRaw([], result)
    }
    const results = result.results[0].locations.map(this._formatResult);
    // console.dir(results, { depth: null })
    return this.wrapRaw(results, result)
  }

  /**
   * @param {MapQuestReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    const { lat, lng, limit: maxResults, ...other } = query;
    const params = {
      ...this.params,
      ...other,
      location: `${lat},${lng}`,
      maxResults
    };

    const url = this.createUrl(this.revEndpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!Array.isArray(result?.results?.[0]?.locations)) {
      return this.wrapRaw([], result)
    }
    const results = result.results[0].locations.map(this._formatResult);
    // console.dir(results, { depth: null })
    return this.wrapRaw(results, result)
  }

  _formatResult(result = {}) {
    const {
      latLng = {},
      adminArea1,
      adminArea3,
      adminArea4,
      adminArea5,
      adminArea6,
      linkId,
      postalCode,
      sideOfStreet,
      street
    } = result;

    const formatted = {
      formattedAddress: [
        street,
        adminArea5,
        (adminArea3 + ' ' + postalCode).trim(),
        adminArea1
      ]
        .filter(Boolean)
        .join(', '),
      latitude: latLng.lat,
      longitude: latLng.lng,
      country: isocode.countryName(adminArea1 || undefined),
      countryCode: adminArea1 || undefined,
      state: adminArea3 || undefined,
      county: adminArea4 || undefined,
      city: adminArea5 || undefined,
      zipcode: postalCode || undefined,
      streetName: street || undefined,
      neighbourhood: adminArea6 || undefined,
      extra: {
        id: linkId,
        sideOfStreet: sideOfStreet || undefined
      }
    };

    return formatted
  }
}

exports.MapQuestGeocoder = MapQuestGeocoder;
