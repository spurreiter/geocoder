import { AbstractGeocoder } from './abstract.js'
import { HttpError } from '../utils/index.js'

/**
 * @typedef {object} PeliasForwardQuery
 * @property {string} address
 */

/**
 * @typedef {object} PeliasReverseQuery
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 */

export class PeliasGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @see https://github.com/pelias/documentation/blob/master/README.md
   * @param {function} adapter
   * @param {object} options
   * @param {string} [options.origin='https://api.geocode.earth'] - protocol + hostname for server
   */
  constructor (adapter, options = {}) {
    super(adapter, options)

    const { origin, apiKey, ...other } = options
    if (!origin && !apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    const _origin = origin || 'https://api.geocode.earth'

    this._endpoint = `${_origin}/v1/search`
    this._revEndpoint = `${_origin}/v1/reverse`

    this.params = other
    if (apiKey) {
      this.params.api_key = apiKey
    }
  }

  get endpoint () {
    return this._endpoint
  }

  get revEndpoint () {
    return this._revEndpoint
  }

  /**
   * @param {string|PeliasForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query) {
    let params = { ...this.params, text: query }

    if (query.address) {
      const { address, ...other } = query
      params = { ...params, ...other, text: address }
    }

    const url = this.createUrl(this.endpoint, params)

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()

    if (!Array.isArray(result?.features)) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @param {string|PeliasReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse (query) {
    const { lat, lng, ...other } = query
    const params = { ...this.params, ...other, 'point.lat': lat, 'point.lon': lng }

    const url = this.createUrl(this.revEndpoint, params)

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!Array.isArray(result?.features)) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    // console.dir({ body: result, expResults: results }, { depth: null })
    return this.wrapRaw(results, result)
  }

  _formatResult (result = {}) {
    const { geometry = {}, properties = {} } = result
    const confidence = properties.confidence < 1 ? properties.confidence - 0.1 : 1

    const formatted = {
      formattedAddress: properties.label,
      latitude: geometry.coordinates[1],
      longitude: result.geometry.coordinates[0],
      country: properties.country,
      countryCode: properties.country_a,
      state: properties.region,
      county: properties.country,
      city: properties.locality,
      zipcode: properties.postalcode,
      streetName: properties.street,
      streetNumber: properties.housenumber,
      extra: {
        confidence
      }
    }

    return formatted
  }
}
