'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
require('i18n-iso-countries');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * @see https://yandex.com/dev/maps/geocoder/doc/desc/concepts/input_params.html
 * @typedef {object} YandexForwardQuery
 * @property {string} address
 * @property {string} [language]
 * @property {string} [kind] house, street, metro, district, locality
 * @property {number} [rspn] [0,1]
 * @property {string} [ll] Longitude and latitude of the center of the search area
 */

/**
 * @typedef {object} YandexReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language]
 */

class YandexGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://yandex.com/dev/maps/geocoder/doc/desc/concepts/input_params.html
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} [options.language]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options);

    // @ts-expect-error
    // eslint-disable-next-line no-unused-vars
    const { apiKey, limit, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      apikey: apiKey,
      format: 'json'
    };
  }

  get endpoint() {
    return 'https://geocode-maps.yandex.ru/1.x'
  }

  /**
   * @param {string|YandexForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query) {
    let params = { ...this.params, geocode: query };

    if (typeof query !== 'string' && query.address) {
      // @ts-ignore
      // eslint-disable-next-line no-unused-vars
      const { address, limit, ...other } = query;
      params = { ...params, ...other, geocode: address };
    }

    const url = this.createUrl(this.endpoint, mapParams(params));

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result?.response?.GeoObjectCollection?.featureMember) {
      return this.wrapRaw([], result)
    }
    const results = result.response.GeoObjectCollection.featureMember.map(
      this._formatResult
    );
    return this.wrapRaw(results, result)
  }

  /**
   * @param {YandexReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    const { lat, lng, limit, ...other } = query;
    const params = { ...this.params, ...other, geocode: `${lng},${lat}` };

    const url = this.createUrl(this.endpoint, mapParams(params));

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!result?.response?.GeoObjectCollection?.featureMember) {
      return this.wrapRaw([], result)
    }
    const results = result.response.GeoObjectCollection.featureMember.map(
      this._formatResult
    );
    return this.wrapRaw(results, result)
  }

  _formatResult(result) {
    const { Point = {}, boundedBy = {}, metaDataProperty } = result?.GeoObject;
    const obj = metaDataProperty?.GeocoderMetaData;

    const [lng, lat] = (Point?.pos || '').split(/ /).map((n) => +n);

    const formatted = {
      formattedAddress: get(obj, 'AddressLine'),
      latitude: lat,
      longitude: lng,
      country: get(obj, 'CountryName'),
      countryCode: get(obj, 'CountryNameCode'),
      state: get(obj, 'AdministrativeAreaName'),
      county: get(obj, 'SubAdministrativeAreaName'),
      city: get(obj, 'LocalityName') || get(obj, 'DependentLocalityName'),
      streetName: get(obj, 'ThoroughfareName'),
      streetNumber: get(obj, 'PremiseNumber'),
      extra: {
        bbox: toBbox(boundedBy?.Envelope)
      }
    };

    return formatted
  }
}

function mapParams(params) {
  const { language, ...other } = params;
  if (language) {
    other.lang = language
      .split(/[\W]/)
      .map((l = '', i) => (i === 0 ? l.toLowerCase() : l.toUpperCase()))
      .join('_');
  }
  return other
}

function get(obj, key) {
  const val = obj[key];
  if (val !== undefined) {
    return val
  }
  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      const val = get(obj[k], key);
      if (val !== undefined) {
        return val
      }
    }
  }
}

function lnglat(pos = '') {
  return pos.split(/ /).map((n) => +n)
}

function toBbox(boundingbox) {
  if (!boundingbox || !boundingbox.lowerCorner || !boundingbox.upperCorner)
    return
  const [xmin, ymin] = lnglat(boundingbox.lowerCorner);
  const [xmax, ymax] = lnglat(boundingbox.upperCorner);
  return [xmin, ymin, xmax, ymax]
}

exports.YandexGeocoder = YandexGeocoder;
