'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
require('i18n-iso-countries');
var toFixed = require('../utils/toFixed.cjs');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * see https://geo.api.gouv.fr/adresse
 * @typedef {object} OpendataFranceForwardQuery
 * @property {string} address
 * @property {number} [limit=5] Maximum number of results to be returned
 */

/**
 * see https://geo.api.gouv.fr/adresse
 * @typedef {object} OpendataFranceReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=5] Maximum number of results to be returned
 */

class OpendataFranceGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://api.gouv.fr/les-api/base-adresse-nationale
   * @see https://geo.api.gouv.fr/adresse
   * @param {fetchAdapterFn} adapter
   * @param {object} [options]
   * @param {number} [options.limit]
   * @param {string} [options.language]
   */
  constructor(adapter, options = {}) {
    // @ts-ignore
    super(adapter, options);

    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    const { apiKey, language, ...params } = options;

    this.params = params;
  }

  get endpoint() {
    return 'https://api-adresse.data.gouv.fr/search'
  }

  get revEndpoint() {
    return 'https://api-adresse.data.gouv.fr/reverse'
  }

  /**
   * @param {string|OpendataFranceForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query) {
    let params = { ...this.params, q: query };

    if (typeof query !== 'string' && query.address) {
      // @ts-ignore
      // eslint-disable-next-line no-unused-vars
      const { address, language, ...other } = query;
      params = { ...params, ...other, q: address };
    }

    const url = this.createUrl(this.endpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result?.features) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  /**
   * @param {OpendataFranceReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    const { lat, lng: lon, language, ...other } = query;
    const params = { ...this.params, ...other, lon, lat };

    const url = this.createUrl(this.revEndpoint, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result?.features) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  _formatResult(result) {
    const { properties = {}, geometry = {} } = result;
    const { coordinates = [] } = geometry;
    const [lng, lat] = coordinates;

    const formatted = {
      formattedAddress: properties.label,
      latitude: lat,
      longitude: lng,
      country: 'France',
      countryCode: 'FR',
      state: properties.context,
      city: properties.city,
      zipcode: properties.postcode,
      citycode: properties.citycode,
      extra: {
        id: properties.id,
        confidence: toFixed.toFixed(properties.score || 0)
      }
    };

    if (properties.type === 'housenumber') {
      formatted.streetName = properties.street;
      formatted.streetNumber = properties.housenumber;
    } else if (properties.type === 'street') {
      formatted.streetName = properties.name;
    } else if (properties.type === 'city') {
      formatted.extra.population = properties.population;
      formatted.extra.admWeight = properties.adm_weight;
    } else if (properties.type === 'village') {
      formatted.population = properties.population;
    } else if (properties.type === 'locality') {
      formatted.streetName = properties.name;
    }

    return formatted
  }
}

exports.OpendataFranceGeocoder = OpendataFranceGeocoder;
