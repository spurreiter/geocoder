import { AbstractGeocoder } from './abstract.js'
import { HttpError, countryName } from '../utils/index.js'

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * see https://www.geocod.io/docs/#single-address
 * @typedef {object} GeocodioForwardQuery
 * @property {string} address
 * @property {string} [language] not supported
 * @property {number} [limit] Maximum number of results to be returned
 * @property {string} [street]
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [postal_code]
 */

/**
 * see https://www.geocod.io/docs/#reverse-geocoding
 * @typedef {object} GeocodioReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language] not supported
 * @property {number} [limit] Maximum number of results to be returned
 */

export class GeocodioGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @see https://www.geocod.io/features/api/
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {string} [options.language]
   * @param {number} [options.limit]
   */
  constructor (adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options)

    const { apiKey, language, ...params } = options

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      api_key: apiKey
    }
  }

  get endpoint () {
    return 'https://api.geocod.io/v1.7/geocode'
  }

  get revEndpoint () {
    return 'https://api.geocod.io/v1.7/reverse'
  }

  /**
   * @see https://www.geocod.io/docs/#single-address
   * @param {string|GeocodioForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query) {
    let params = { ...this.params, q: query }

    if (typeof query !== 'string' && query.address) {
      const { address, language, ...other } = query
      params = { ...params, ...other, q: address }
    }

    const url = this.createUrl(
      this.endpoint,
      params
    )

    const res = await this.adapter(url)
    const result = await res.json()
    if (res.status !== 200 && res.status !== 422) {
      throw HttpError(res)
    }
    if (!result?.results) {
      return this.wrapRaw([], result)
    }
    const results = result.results.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @param {GeocodioReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse (query) {
    const { lat, lng, language, ...other } = query
    const params = { ...this.params, ...other, q: `${lat},${lng}` }

    const url = this.createUrl(
      this.revEndpoint,
      params
    )

    const res = await this.adapter(url)
    if (res.status !== 200 && res.status !== 422) {
      throw HttpError(res)
    }
    const result = await res.json()
    if (!result?.results) {
      return this.wrapRaw([], result)
    }
    const results = result.results.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  _formatResult (result) {
    const {
      accuracy,
      formatted_address,
      location = {},
      address_components: address = {}
    } = result

    const confidence = accuracy < 1
      ? accuracy - 0.1
      : 1

    const formatted = {
      formattedAddress: formatted_address,
      latitude: location.lat,
      longitude: location.lng,
      country: countryName(address.country),
      countryCode: address.country,
      state: address.state,
      county: address.county,
      city: address.city,
      zipcode: address.zip,
      // district: address.district,
      streetName: address.formatted_street,
      streetNumber: address.number,
      extra: {
        confidence
      }
    }

    return formatted
  }
}
