'use strict';

var abstract = require('./abstract.cjs');
var httperror = require('../utils/httperror.cjs');
require('i18n-iso-countries');

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

function hasResult(result) {
  return result && !!result.type
}

class IpStackGeocoder extends abstract.AbstractGeocoder {
  /**
   * available options
   * @see https://ipstack.com/documentation
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   */
  constructor(adapter, options = {}) {
    super(adapter, options);

    const { apiKey, ...params } = options;

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = { ...params, access_key: apiKey };
    this.supportIPv4 = this.supportIPv6 = true;
  }

  get endpoint() {
    return 'http://api.ipstack.com'
  }

  /**
   * @param {object|string} query
   */
  async _forward(query = '') {
    let params = this.params;
    let searchtext = query;

    if (typeof query !== 'string' && query.address) {
      const { address, ...other } = query;
      searchtext = address;
      params = { ...params, ...other };
    }

    const url = this.createUrl(`${this.endpoint}/${searchtext}`, params);

    const res = await this.adapter(url);
    if (res.status !== 200) {
      throw httperror.HttpError(res)
    }
    const result = await res.json();
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }

    const results = [result].map(this._formatResult);
    return this.wrapRaw(results, result)
  }

  _formatResult(result = {}) {
    const formatted = {
      ip: result.ip,
      latitude: result.latitude,
      longitude: result.longitude,
      countryCode: result.country_code,
      country: result.country_name,
      regionCode: result.region_code,
      regionName: result.region_name,
      city: result.city,
      zipcode: result.zip
    };
    return formatted
  }
}

exports.IpStackGeocoder = IpStackGeocoder;
