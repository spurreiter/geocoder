'use strict';

var circuitbreaker = require('./circuitbreaker.cjs');

/** @typedef {import('#geocoder/abstract.js').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('#types.js').CombineOptions} CombineOptions */
/** @typedef {import('#types.js').ForwardQuery} ForwardQuery */
/** @typedef {import('#types.js').ReverseQuery} ReverseQuery */
/** @typedef {import('#types.js').GeocoderResult} GeocoderResult */

class Combine {
  /**
   * @param {AbstractGeocoder[]} geocoders
   * @param {CombineOptions} options
   */
  constructor(geocoders, options = {}) {
    const { addProvider = true, ...options1 } = options;
    this.coders = geocoders.map(
      (geocoder) => new circuitbreaker.CircuitBreaker(geocoder, options1)
    );
    this.addProvider = !!addProvider;
  }

  /**
   * @private
   */
  async _method(query, method) {
    const allResponses = await Promise.allSettled(
      this.coders.map((geocoder) => geocoder[method](query))
    );

    // @ts-ignore
    return allResponses.reduce((a, { status, value }, i) => {
      if (status === 'fulfilled' && value.length) {
        const provider = this.coders[i].name;
        value.forEach((result) => {
          if (this.addProvider) result.provider = provider;
          // @ts-ignore
          a.push(result);
        });
      }
      return a
    }, [])
  }

  /**
   * @param {ForwardQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async forward(query) {
    return this._method(query, 'forward')
  }

  /**
   * @param {ReverseQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async reverse(query) {
    return this._method(query, 'reverse')
  }
}

exports.Combine = Combine;
