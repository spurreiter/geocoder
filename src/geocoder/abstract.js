import net from 'net'
import { URL, URLSearchParams } from 'url'

const wrapError400 = (err) => {
  err.status = 400
  return err
}

/**
 * @typedef {object} ForwardQuery
 * @property {string} address address being queried
 * @property {string} [language] search results language
 * @property {number} [limit] limit search results
 */

/**
 * @typedef {object} ReverseQuery {
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language] search results language
 * @property {number} [limit] limit search results
 */

/**
 * @typedef {object} GeocoderResult
 * @property {number} latitude latitude of search result
 * @property {number} longitude longitude of search result
 * @property {string} [formattedAddress]
 * @property {string} [country]
 * @property {string} [countryCode] country code as ISO 3166-1 alpha-2 or ISO 3166-1 alpha-3
 * @property {string} [state]
 * @property {string} [region]
 * @property {string} [city]
 * @property {string} [zipcode]
 * @property {string} [streetName]
 * @property {string} [streetNumber]
 * @property {object} [extra]
 * @property {string|number} [extra.id]
 * @property {number} [extra.confidence] confidence [0..1] higher values = higher confidence
 * @property {number[]} [extra.bbox] bounding box as `[minLng, minLat, maxLng, maxLat]`
 */

export class AbstractGeocoder {
  /**
   * @param {fetchAdapter} adapter
   * @param {object} [options]
   * @param {boolean} [options.raw] append raw response to results
   */
  constructor (adapter, options = {}) {
    if (!adapter) {
      throw new Error(`${this.constructor.name} needs an adapter`)
    }
    this.adapter = adapter
    this.raw = !!options.raw
    this._name = this.constructor.name.replace(/Geocoder$/i, '').toLowerCase()
  }

  /**
   * name of geocoder
   */
  get name () {
    return this._name
  }

  /**
   * forward geocoding
   * @param {string|ForwardQuery} query address string or ip address
   * @returns {Promise<GeocoderResult[]>}
   */
  forward (query) {
    const address = typeof query === 'object'
      ? query.address
      : query

    const isIPv4 = net.isIPv4(address)
    const isIPv6 = net.isIPv6(address)

    if (isIPv4 && !this.supportIPv4) {
      throw wrapError400(
        new Error(`${this.constructor.name} does not support geocoding IPv4`)
      )
    }
    if (isIPv6 && !this.supportIPv6) {
      throw wrapError400(
        new Error(`${this.constructor.name} does not support geocoding IPv6`)
      )
    }

    return this._forward(query, isIPv4 || isIPv6)
  }

  /**
   * reverse geocoding
   * @param {string|ReverseQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  reverse (query) {
    if (typeof query === 'string') {
      const [lat, lng] = query.split(/[ ,]/).map((n) => +n)
      if (!isNaN(lat) && !isNaN(lng)) {
        query = { lat, lng }
      }
    }
    return this._reverse(query)
  }

  /**
   * creates a Url with search params
   * @protected
   * @param {string} url
   * @param {object} params
   * @returns {string}
   */
  createUrl (url, params) {
    const u = new URL(url)
    if (params) {
      u.search = this.createSearch(params)
    }
    return u.toString()
  }

  /**
   * creates a search params string
   * @protected
   * @param {object} params
   * @returns {string}
   */
  createSearch (params) {
    return new URLSearchParams(
      Object.entries(JSON.parse(JSON.stringify(params)))
    ).toString()
  }

  /**
   * wraps raw response on results object
   * @protected
   * @param {Array} results
   * @param {object} body
   * @returns {Array}
   */
  wrapRaw (results = [], body) {
    if (body && this.raw) {
      results.raw = body
    }
    return results
  }

  /**
   * forward geocoding
   * @protected
   * @param {string|ForwardQuery} query address string or ip address
   * @returns {Promise<GeocoderResult[]>}
   */
  _forward () {
    throw wrapError400(
      new Error(`${this.constructor.name} does not support geocoding`)
    )
  }

  /**
   * reverse geocoding
   * @protected
   * @param {string|ReverseQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  _reverse () {
    throw wrapError400(
      new Error(`${this.constructor.name} does not support reverse geocoding`)
    )
  }
}
