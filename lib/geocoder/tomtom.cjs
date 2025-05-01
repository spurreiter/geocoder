'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
var isocode = require('../utils/isocode.cjs');
var toFixed = require('../utils/toFixed.cjs');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

const undef = (s) => (s === '' ? undefined : s);

const toLatLon = (str) =>
  String(str)
    .split(',')
    .map((i) => (isNaN(Number(i)) ? undefined : Number(i)));

/**
 * see https://developer.tomtom.com/search-api/documentation/geocoding-service/geocode
 * @typedef {object} TomTomForwardQuery
 * @property {string} address
 * @property {number} [limit]
 * @property {string} [category] see for list of values
 * @property {string} [preferredLabelValues]
 * @property {string} [language]
 */

/**
 * see https://developer.tomtom.com/search-api/documentation/reverse-geocoding-service/reverse-geocode
 * @typedef {object} TomTomReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {boolean} [returnIntersection]
 * @property {string} [locationType]
 * @property {string} [preferredLabelValues]
 * @property {string} [language]
 */

class TomTomGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit]
   * @param {string} [options.language]
   * @param {number} [options.radius]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options);

    const { apiKey, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      key: apiKey
    };
  }

  get endpoint() {
    return 'https://api.tomtom.com/search/2/geocode'
  }

  get revEndpoint() {
    return 'https://api.tomtom.com/search/2/reverseGeocode'
  }

  /**
   * @param {string|TomTomForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query = '') {
    let params = this.params;
    let searchtext = query;

    if (typeof query !== 'string' && query.address) {
      const { address, ...other } = query;
      searchtext = address;
      params = { ...params, ...other };
    }

    if (params.language === 'en') {
      params.language = 'en-GB';
    }

    const url = this.createUrl(
      `${this.endpoint}/${encodeURIComponent(String(searchtext))}.json`,
      params
    );

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    // console.dir(result, { depth: null })
    if (!result?.results) {
      return this.wrapRaw([], result)
    }
    const results = result.results.map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  /**
   * @param {TomTomReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    const { lat, lng, ...other } = query;
    const params = {
      ...this.params,
      ...other
    };

    const url = this.createUrl(
      `${this.revEndpoint}/${encodeURIComponent(`${lat},${lng}`)}.json`,
      params
    );

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    // console.dir(result, { depth: null })

    if (!result?.addresses) {
      return this.wrapRaw([], result)
    }
    const results = result.addresses.map(this._formatResultRev);
    return this.wrapRaw(results, result)
  }

  /**
   * format forward geocoding results
   * @param {object} result
   * @returns {object}
   */
  _formatResult(result) {
    const {
      id,
      position = {},
      address = {},
      score = 0,
      type,
      viewport = {}
    } = result || {};

    const {
      streetNumber,
      streetName,
      municipalitySubdivision,
      municipality,
      countrySecondarySubdivision,
      countrySubdivision,
      countrySubdivisionName,
      postalCode,
      // extendedPostalCode,
      countryCode,
      country,
      // countryCodeISO3,
      freeformAddress,
      localName
    } = address;

    const xmin = viewport?.topLeftPoint?.lon;
    const xmax = viewport?.btmRightPoint?.lon;
    const ymin = viewport?.btmRightPoint?.lat;
    const ymax = viewport?.topLeftPoint?.lat;

    const extra = {
      id,
      confidence: toFixed.toFixed(score / 10),
      placeName: localName,
      type,
      bbox: [xmin, ymin, xmax, ymax]
    };

    const formatted = {
      formattedAddress: undef(freeformAddress),
      latitude: position.lat,
      longitude: position.lon,
      country: undef(country),
      countryCode: isocode.countryCode(undef(countryCode)),
      state: undef(countrySubdivisionName) || undef(countrySubdivision),
      county: undef(countrySecondarySubdivision),
      district: undef(municipalitySubdivision),
      city: undef(municipality),
      zipcode: undef(postalCode),
      streetName: undef(streetName),
      streetNumber: undef(streetNumber),
      extra
    };

    return formatted
  }

  /**
   * format reverse search result
   * @param {object} result
   * @returns {object}
   */
  _formatResultRev(result) {
    const { address = {}, position = '' } = result || {};

    const {
      // buildingNumber,
      streetNumber,
      // routeNumbers,
      street,
      streetName,
      // streetNameAndNumber,
      countryCode,
      countrySubdivision,
      countrySecondarySubdivision,
      municipality,
      postalCode,
      municipalitySubdivision,
      country,
      // countryCodeISO3,
      freeformAddress,
      boundingBox = {},
      // extendedPostalCode,
      countrySubdivisionName,
      localName
    } = address;

    const [latitude, longitude] = toLatLon(position);
    const [ymax, xmax] = toLatLon(boundingBox.northEast);
    const [ymin, xmin] = toLatLon(boundingBox.southWest);

    const extra = {
      placeName: undef(localName),
      bbox: [xmin, ymin, xmax, ymax]
    };

    const formatted = {
      formattedAddress: undef(freeformAddress),
      latitude,
      longitude,
      country,
      countryCode: isocode.countryCode(undef(countryCode)),
      state: undef(countrySubdivisionName) || undef(countrySubdivision),
      county: undef(countrySecondarySubdivision),
      district: undef(municipalitySubdivision),
      city: undef(municipality),
      zipcode: undef(postalCode),
      streetName: undef(streetName) || undef(street),
      streetNumber: undef(streetNumber),
      extra
    };

    return formatted
  }
}

exports.TomTomGeocoder = TomTomGeocoder;
