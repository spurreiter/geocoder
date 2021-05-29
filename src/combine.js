import { CircuitBreaker } from './circuitbreaker.js'

export class Combine {
  constructor (geocoders, options = {}) {
    const { addProvider = true, ...options1 } = options
    this.coders = geocoders.map(geocoder => new CircuitBreaker(geocoder, options1))
    this.addProvider = !!addProvider
  }

  async _method (query, method) {
    const allResponses = await Promise.allSettled(
      this.coders.map(geocoder => geocoder[method](query))
    )

    return allResponses.reduce((a, { status, value }, i) => {
      if (status === 'fulfilled' && value.length) {
        const provider = this.coders[i].name
        value.forEach(result => {
          if (this.addProvider) result.provider = provider
          a.push(result)
        })
      }
      return a
    }, [])
  }

  async forward (query) {
    return this._method(query, 'forward')
  }

  async reverse (query) {
    return this._method(query, 'reverse')
  }
}
