'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
require('i18n-iso-countries');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

// status can be "OK", "ZERO_RESULTS", "OVER_QUERY_LIMIT", "REQUEST_DENIED", "INVALID_REQUEST", or "UNKNOWN_ERROR"
const NO_ERROR = ['OK', 'ZERO_RESULTS'];

const CONFIDENCE_MAP = {
  ROOFTOP: 1,
  RANGE_INTERPOLATED: 0.9,
  GEOMETRIC_CENTER: 0.7,
  APPROXIMATE: 0.5
};

const checkOnError = (result) => {
  const { error_message = '', status } = result || {};
  if (!status || !NO_ERROR.includes(status)) {
    throw new Error(`${status} ${error_message}`)
  }
};

const hasResult = (result) => {
  const { status, results } = result || {};
  return status === 'OK' && Array.isArray(results)
};

const toCamelCase = (str = '') =>
  str.replace(/_(.)/g, (_, m) => m.toUpperCase());

/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
 * @typedef {object} GoogleForwardQuery
 * @property {string} address -
 * @property {string} [language]
 * @property {string} [bounds]
 * @property {string} [region]
 * @property {string} [components]
 */

/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
 * @typedef {object} GoogleReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language]
 * @property {string} [result_type]
 * @property {string} [location_type]
 */

class GoogleGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://developers.google.com/maps/documentation/geocoding/overview
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} [options.language]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options);

    const { apiKey, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    // @ts-ignore
    params.key = apiKey;
    this.params = params;
  }

  get endpoint() {
    return 'https://maps.googleapis.com/maps/api/geocode/json'
  }

  /**
   * @param {string|GoogleForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query = '') {
    let params = { ...this.params, address: query };

    if (typeof query !== 'string' && query.address) {
      const { address, ...other } = query;
      params = { ...params, ...other, address };
    }

    const url = this.createUrl(this.endpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    checkOnError(result);
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = result.results.map(this._formatResult);
    // console.dir(results, { depth: null })
    return this.wrapRaw(results, result)
  }

  /**
   * @param {GoogleReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    const { lat, lng, ...other } = query;
    const params = {
      ...this.params,
      ...other,
      latlng: lat + ',' + lng
    };

    const url = this.createUrl(this.endpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    checkOnError(result);
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = result.results.map(this._formatResult);
    // console.dir(results, {depth:null})
    return this.wrapRaw(results, result)
  }

  _formatResult(result) {
    const {
      address_components = [],
      formatted_address,
      geometry = {}
    } = result || {};

    const components = address_components.reduce((o, item) => {
      const { long_name: long, short_name: short, types } = item;

      types.forEach((_type) => {
        const type = toCamelCase(_type);
        if (o[type] || type === 'political') return
        if (type === 'country') {
          o[type] = long;
          o.countryCode = short;
        }
        o[type] = long;
      });

      return o
    }, {});

    const {
      country,
      countryCode,
      administrativeAreaLevel1,
      administrativeAreaLevel2,
      administrativeAreaLevel3,
      locality,
      postalTown,
      postalCode,
      route,
      streetNumber,
      ...extra
    } = components;

    extra.confidence = CONFIDENCE_MAP[geometry.location_type] || 0;

    const formatted = {
      formattedAddress: formatted_address,
      latitude: geometry?.location?.lat,
      longitude: geometry?.location?.lng,
      country,
      countryCode,
      state: administrativeAreaLevel1,
      region: administrativeAreaLevel2,
      district: administrativeAreaLevel3,
      city: locality || postalTown,
      zipcode: postalCode,
      streetName: route,
      streetNumber,
      extra
    };

    return formatted
  }
}

exports.GoogleGeocoder = GoogleGeocoder;
