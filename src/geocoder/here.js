import { AbstractGeocoder } from './abstract.js'
import { HttpError } from '../utils/index.js'

/**
 * @typedef {object} HereForwardQuery
 * @property {string} address
 * @property {string} [language]
 * @property {number} [limit=20] Maximum number of results to be returned
 */

/**
 * @typedef {object} HereReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language]
 * @property {number} [limit=1] Maximum number of results to be returned
 */

function mapParams (params) {
  const { language, ...other } = params
  if (language) {
    other.lang = language
  }
  return other
}

export class HereGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @see https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html
   * @param {function} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} [language]
   * @param {number} [options.limit]
   */
  constructor (adapter, options = {}) {
    super(adapter, options)

    if (!options.apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = options
  }

  get endpoint () {
    return 'https://geocode.search.hereapi.com/v1/geocode'
  }

  get revEndpoint () {
    return 'https://revgeocode.search.hereapi.com/v1/revgeocode'
  }

  /**
   * @see https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html
   * @param {string|HereForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query) {
    let params = { ...this.params, q: query }

    if (query.address) {
      const { address, ...other } = query
      params = { ...params, ...other, q: address }
    }

    const url = this.createUrl(
      this.endpoint,
      mapParams(params)
    )

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!result?.items) {
      return this.wrapRaw([], result)
    }
    const results = result.items.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @see https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html
   * @param {string|HereReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse (query) {
    const { lat, lng, ...other } = query
    const params = { ...this.params, ...other, at: `${lat},${lng}` }

    const url = this.createUrl(
      this.revEndpoint,
      mapParams(params)
    )

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!result?.items) {
      return this.wrapRaw([], result)
    }
    const results = result.items.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  _formatResult (result) {
    const { address = {}, position = {}, scoring = {}, id } = result

    const formatted = {
      formattedAddress: address.label,
      latitude: position.lat,
      longitude: position.lng,
      country: address.countryName,
      countryCode: address.countryCode,
      state: address.state,
      county: address.county,
      city: address.city,
      zipcode: address.postalCode,
      district: address.district,
      streetName: address.street,
      streetNumber: address.houseNumber,
      building: address.building,
      extra: {
        id: id,
        confidence: scoring.queryScore || 0
      }
    }

    return formatted
  }
}
