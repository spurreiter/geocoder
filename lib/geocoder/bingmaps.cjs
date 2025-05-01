'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
require('i18n-iso-countries');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

const hasResult = (result) => {
  const { statusCode, resourceSets } = result || {};
  return statusCode === 200 && Array.isArray(resourceSets)
};

const CONFIDENCE_MAP = {
  High: 1,
  Medium: 0.6,
  Low: 0.3
};

function toBbox(boundingbox) {
  if (!Array.isArray(boundingbox)) return
  const [ymin, xmin, ymax, xmax] = boundingbox;
  return [xmin, ymin, xmax, ymax]
}

/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-address
 * @typedef {object} BingMapsForwardQuery
 * @property {string} address
 * @property {number} [limit]
 * @property {string} [language]
 */

/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
 * @typedef {object} BingMapsReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {string} [language]
 */

/**
 * @deprecated
 * Bing Maps for Enterprise is deprecated and will be retired. Free (Basic)
 * account customers can continue to use Bing Maps for Enterprise services until
 * June 30th, 2025. Enterprise account customers can continue to use Bing Maps
 * for Enterprise services until June 30th, 2028. To avoid service disruptions,
 * all implementations using Bing Maps for Enterprise REST APIs and SDKs will
 * need to be updated to use Azure Maps by the retirement date that applies to
 * your Bing Maps for Enterprise account type.
 */
class BingMapsGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://docs.microsoft.com/en-us/bingmaps/rest-services/
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit]
   * @param {string} [options.language]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options);

    // eslint-disable-next-line no-unused-vars
    const { apiKey, limit: maxResults, language, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      maxResults,
      o: 'json',
      include: 'ciso2',
      key: apiKey
    };
  }

  get endpoint() {
    return 'http://dev.virtualearth.net/REST/v1/Locations'
  }

  /**
   * @param {BingMapsForwardQuery|string} query
   * @returns {Promise<object>}
   */
  async _forward(query = '') {
    let params = { ...this.params, q: query };

    if (typeof query !== 'string' && query.address) {
      // eslint-disable-next-line no-unused-vars
      const { address: q, limit: maxResults, language, ...other } = query;
      params = { ...params, ...other, q, maxResults };
    }

    const url = this.createUrl(this.endpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    // console.dir(result, { depth: null })
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = result.resourceSets[0].resources.map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  /**
   * @param {BingMapsReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    // eslint-disable-next-line no-unused-vars
    const { lat, lng, language, limit: maxResults, ...other } = query;
    const params = {
      ...this.params,
      ...other,
      maxResults
    };

    const url = this.createUrl(`${this.endpoint}/${lat},${lng}`, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    // console.dir(result, { depth: null })
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = result.resourceSets[0].resources.map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  /**
   * @see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/location-data
   */
  _formatResult(result) {
    const { bbox, point = {}, address = {}, confidence } = result || {};

    const extra = {
      confidence: CONFIDENCE_MAP[confidence] || 0,
      bbox: toBbox(bbox)
    };

    const formatted = {
      formattedAddress: address.formattedAddress,
      latitude: point.coordinates[0],
      longitude: point.coordinates[1],
      country: address.countryRegion,
      countryCode: address.countryRegionIso2,
      state: address.adminDistrict,
      region: address.adminDistrict2,
      city: address.locality,
      zipcode: address.postalCode,
      streetName: address.addressLine,
      extra
    };

    return formatted
  }
}

exports.BingMapsGeocoder = BingMapsGeocoder;
