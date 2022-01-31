import { CircuitBreaker } from './circuitbreaker.js'

/** @typedef {import('./geocoder/abstract').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('./types').CascadeOptions} CascadeOptions */
/** @typedef {import('./types').ForwardQuery} ForwardQuery */
/** @typedef {import('./types').ReverseQuery} ReverseQuery */
/** @typedef {import('./types').GeocoderResult} GeocoderResult */

export class Cascade {
  /**
   * @param {AbstractGeocoder[]} geocoders
   * @param {CascadeOptions} options
   */
  constructor (geocoders, options = {}) {
    const { addProvider = true, ...options1 } = options
    this.coders = geocoders.map(geocoder => new CircuitBreaker(geocoder, options1))
    this.addProvider = !!addProvider
  }

  async _method (query, method) {
    for (const geocoder of this.coders) {
      try {
        const results = await geocoder[method](query)
        if (results?.length) {
          const provider = geocoder.name
          return this.addProvider
            ? results.map(result => ({ ...result, provider }))
            : results
        }
        return [] // break even on first empty result
      } catch (err) {
        // console.error(err)
      }
    }
    throw new Error('all geocoders offline')
  }

  /**
   * @param {ForwardQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async forward (query) {
    return this._method(query, 'forward')
  }

  /**
   * @param {ReverseQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async reverse (query) {
    return this._method(query, 'reverse')
  }
}
