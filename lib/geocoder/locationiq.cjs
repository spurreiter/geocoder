'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
require('i18n-iso-countries');
var toFixed = require('../utils/toFixed.cjs');
var toUpperCase = require('../utils/toUpperCase.cjs');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * @typedef {object} LocationIqForwardQuery
 * @property {string} address
 * @property {string} [language]
 * @property {number} [limit=10] Maximum number of results to be returned
 */

/**
 * @typedef {object} LocationIqReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language]
 * @property {number} [limit=10] Maximum number of results to be returned
 */

function mapParams(params) {
  const { language, ...other } = params;
  if (language) {
    other['accept-language'] = language;
  }
  return other
}

function toBbox(boundingbox) {
  const [ymin, ymax, xmin, xmax] = boundingbox || [];
  if (xmin !== undefined) {
    return [xmin, ymin, xmax, ymax]
  }
}

class LocationIqGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://locationiq.com/docs
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} [options.language]
   * @param {string} [options.dcRegion=eu] datacenter region [us1, eu1]
   * @param {number} [options.limit]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options);

    const { dcRegion = 'eu1', apiKey, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      key: apiKey,
      format: 'json',
      addressdetails: 1
    };

    this.endpoint = `https://${dcRegion}.locationiq.com/v1/search.php`;
    this.revEndpoint = `https://${dcRegion}.locationiq.com/v1/reverse.php`;
  }

  /**
   * @param {string|LocationIqForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query) {
    let params = { ...this.params, q: query };

    if (typeof query !== 'string' && query.address) {
      const { address, ...other } = query;
      params = { ...params, ...other, q: address };
    }

    const url = this.createUrl(this.endpoint, mapParams(params));

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result?.length) {
      return this.wrapRaw([], result)
    }
    const results = result.map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  /**
   * @param {LocationIqReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    const { lat, lng, ...other } = query;
    const params = { ...this.params, ...other, lat, lon: lng };

    const url = this.createUrl(this.revEndpoint, mapParams(params));

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result || !result.licence) {
      return this.wrapRaw([], result)
    }
    const results = [result].map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  _formatResult(result) {
    const {
      lat,
      lon,
      display_name,
      address = {},
      boundingbox,
      importance,
      class: addrType,
      type,
      place_id: id
    } = result;

    const formatted = {
      formattedAddress: display_name,
      latitude: lat,
      longitude: lon,
      country: address.country,
      countryCode: toUpperCase.toUpperCase(address.country_code),
      state: address.state,
      region: address.region,
      county: address.county,
      city: address.city,
      zipcode: address.postcode,
      streetName: address.road,
      streetNumber: address.house_number,
      extra: {
        id,
        confidence: toFixed.toFixed(importance || 0),
        type,
        addrType,
        bbox: toBbox(boundingbox)
      }
    };

    return formatted
  }
}

exports.LocationIqGeocoder = LocationIqGeocoder;
