import { AbstractGeocoder } from './abstract.js'
import { HttpError } from '../utils/index.js'

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
   * @param {function} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit=5]
   * @param {string} [options.language]
   */
  constructor (adapter, options = {}) {
    super(adapter, options)

    const { apiKey, ...params } = options

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    params.access_token = apiKey
    this.params = params
  }

  get endpoint () {
    return 'https://api.mapbox.com/geocoding/v5/mapbox.places'
  }

  /**
   * @param {string|MapBoxForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query) {
    let params = this.params
    let searchtext = query

    if (query.address) {
      const { address, ...other } = query
      searchtext = address
      params = { ...params, ...other }
    }

    const url = this.createUrl(
      `${this.endpoint}/${encodeURIComponent(searchtext)}.json`,
      params
    )

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!result?.features) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @param {string|MapBoxReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse (query) {
    const { lat, lng, ...other } = query
    const params = { ...this.params, ...other }

    const url = this.createUrl(
      `${this.endpoint}/${encodeURIComponent(`${lng},${lat}`)}.json`,
      params
    )

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!result?.features) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  _formatResult (result) {
    const context = (result.context || []).reduce((o, item) => {
      // possible types: country, region, postcode, district, place, locality, neighborhood, address
      const [type] = item.id.split('.')
      if (type) {
        o[type] = item.text
        if (type === 'country' && item.short_code) {
          o.countryCode = item.short_code.toUpperCase()
        }
      }
      return o
    }, {})

    // get main type
    const [type] = result.id.split('.')
    if (type) {
      context[type] = result.text
    }

    const { properties = {}, address, bbox, id } = result

    const formatted = {
      formattedAddress: result.place_name,
      latitude: result.center[1],
      longitude: result.center[0],
      country: context.country,
      countryCode: context.countryCode,
      state: context.region,
      city: context.place,
      zipcode: context.postcode,
      district: context.district,
      streetName: type === 'address' ? context.address : undefined,
      streetNumber: type === 'address' ? address : undefined,
      neighbourhood: context.neighborhood || context.locality,
      extra: {
        id,
        category: properties.category,
        bbox
      }
    }

    return formatted
  }
}
