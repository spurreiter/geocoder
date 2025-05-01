'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
require('i18n-iso-countries');
var toUpperCase = require('../utils/toUpperCase.cjs');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * @typedef {object} OpenCageForwardQuery
 * @property {string} address -
 * @property {number} [limit=10] Maximum number of results to be returned
 * @property {string} [language]
 * @property {number} [abbrv]
 * @property {number[]} [bounds]
 * @property {number[]} [proximity]
 * @property {number} [roadinfo]
 */

/**
 * @typedef {object} OpenCageReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=10] Maximum number of results to be returned
 * @property {string} [language]
 * @property {number} [abbrv]
 * @property {number} [roadinfo]
 */

// http://geocoder.opencagedata.com/api.html#confidence
const CONFIDENCE_KM = {
  10: 0.25,
  9: 0.5,
  8: 1,
  7: 5,
  6: 7.5,
  5: 10,
  4: 15,
  3: 20,
  2: 25,
  1: Infinity,
  0: NaN
};

class OpenCageGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://opencagedata.com/api#quickstart
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit=10]
   * @param {string} [options.language]
   * @param {number} [options.abbrv]
   * @param {number} [options.roadinfo]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options);

    const { apiKey, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = { key: apiKey, ...params };
  }

  get endpoint() {
    return 'https://api.opencagedata.com/geocode/v1/json'
  }

  /**
   * @param {string|OpenCageForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query) {
    let params = { ...this.params, q: query };

    if (typeof query !== 'string' && query.address) {
      const { address, ...other } = query;
      params = { ...params, ...other, q: address };
    }

    const url = this.createUrl(this.endpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result?.results?.length) {
      return this.wrapRaw([], result)
    }
    const results = result.results.map(this._formatResult);
    // console.dir({ body: result, expResults: results }, { depth: null })
    return this.wrapRaw(results, result)
  }

  /**
   * @param {OpenCageReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    const { lat, lng, ...other } = query;
    const params = { ...this.params, ...other, q: `${lat}+${lng}` };

    const url = this.createUrl(this.endpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result?.results?.length) {
      return this.wrapRaw([], result)
    }
    const results = result.results.map(this._formatResult);
    // console.dir({ body: result, expResults: results }, { depth: null })
    return this.wrapRaw(results, result)
  }

  _formatResult(result) {
    const { geometry = {}, components = {}, confidence = 0 } = result;

    const formatted = {
      formattedAddress: result.formatted,
      latitude: geometry.lat,
      longitude: geometry.lng,
      country: components.country,
      countryCode: toUpperCase.toUpperCase(components.country_code),
      state: components.state,
      county: components.county,
      city: components.city || components.town,
      zipcode: components.postcode,
      streetName: components.road,
      streetNumber: components.house_number,
      extra: {
        confidence: confidence / 10,
        confidenceKm: CONFIDENCE_KM[confidence] || NaN
      }
    };

    return formatted
  }
}

exports.OpenCageGeocoder = OpenCageGeocoder;
