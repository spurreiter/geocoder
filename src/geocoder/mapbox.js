import { AbstractGeocoder } from './abstract.js'
import { HttpError } from '../utils/index.js'

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * @typedef {object} MapBoxForwardQuery
 * @property {string} address -
 * @property {number} [limit=5] Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [autocomplete]
 * @property {boolean} [fuzzyMatch]
 * @property {boolean} [routing]
 * @property {number[]} [bbox]
 * @property {number[]} [proximity]
 * @property {string[]} [country]
 */

/**
 * @typedef {object} MapBoxReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=5] Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [routing]
 * @property {string[]} [country]
 */

export class MapBoxGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @see https://docs.mapbox.com/api/search/geocoding/
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit=5]
   * @param {string} [options.language]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options)

    const { apiKey, ...params } = options

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    // @ts-ignore
    params.access_token = apiKey
    this.params = params
  }

  get endpoint() {
    return 'https://api.mapbox.com/search/geocode/v6'
  }

  /**
   * @param {string|MapBoxForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward(query) {
    let searchtext = query
    let params

    if (typeof query !== 'string' && query.address) {
      const { address, ...other } = query
      searchtext = encodeURIComponent(String(address))
      params = { q: searchtext, ...this.params, ...other }
    }

    params = { q: encodeURIComponent(String(searchtext)), ...this.params }

    const url = this.createUrl(`${this.endpoint}/forward`, params)

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw HttpError(res)
    }
    const result = await res.json()
    if (!result?.features) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @param {MapBoxReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    const { lat, lng, ...other } = query
    const params = { longitude: lng, latitude: lat, ...other, ...this.params }

    const url = this.createUrl(`${this.endpoint}/reverse`, params)

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw HttpError(res)
    }
    const result = await res.json()
    if (!result?.features) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  _formatResult(result) {
    const { properties, id } = result
    const { context } = properties

    const formatted = {
      formattedAddress: properties.full_address,
      latitude: properties.coordinates.latitude,
      longitude: properties.coordinates.longitude,
      country: context.country?.name,
      countryCode: context.country?.country_code,
      state: context.region?.name,
      city: context.place?.name,
      zipcode: context.postcode?.name,
      district: context.district?.name,
      streetName:
        properties.feature_type === 'address'
          ? context.address?.street_name
          : undefined,
      streetNumber:
        properties.feature_type === 'address'
          ? context.address?.address_number
          : undefined,
      neighbourhood: context.neighborhood?.name || context.locality?.name,
      extra: {
        id,
        bbox: properties.bbox ?? undefined,
        confidence: properties.match_code?.confidence
      }
    }

    return formatted
  }
}
