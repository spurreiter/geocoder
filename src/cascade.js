import { CircuitBreaker } from './circuitbreaker.js'

export class Cascade {
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

  async forward (query) {
    return this._method(query, 'forward')
  }

  async reverse (query) {
    return this._method(query, 'reverse')
  }
}
