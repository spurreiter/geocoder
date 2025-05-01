'use strict';

var circuitbreaker = require('./circuitbreaker.cjs');

/** @typedef {import('#geocoder/abstract.js').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('#types.js').CascadeOptions} CascadeOptions */
/** @typedef {import('#types.js').ForwardQuery} ForwardQuery */
/** @typedef {import('#types.js').ReverseQuery} ReverseQuery */
/** @typedef {import('#types.js').GeocoderResult} GeocoderResult */

class Cascade {
  /**
   * @param {AbstractGeocoder[]} geocoders
   * @param {CascadeOptions} [options]
   */
  constructor(geocoders, options) {
    const { addProvider = true, ...optionsCircuitBreaker } = options || {};
    this.coders = geocoders.map(
      (geocoder) => new circuitbreaker.CircuitBreaker(geocoder, optionsCircuitBreaker)
    );
    this.addProvider = !!addProvider;
  }

  async _method(query, method) {
    for (const geocoder of this.coders) {
      try {
        const results = await geocoder[method](query);
        if (results?.length) {
          const provider = geocoder.name;
          return this.addProvider
            ? results.map((result) => ({ ...result, provider }))
            : results
        }
        return [] // break even on first empty result
      } catch (_err) {
        // console.error(err)
      }
    }
    throw new Error('all geocoders offline')
  }

  /**
   * @param {string|ForwardQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async forward(query) {
    return this._method(query, 'forward')
  }

  /**
   * @param {string|ReverseQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async reverse(query) {
    return this._method(query, 'reverse')
  }
}

exports.Cascade = Cascade;
