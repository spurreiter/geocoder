// @ts-ignore
import net from 'net'
import { URL, URLSearchParams } from 'url'

const wrapError400 = (err) => {
  err.status = 400
  return err
}

/** @typedef {import('../adapter').fetchAdapterFn} fetchAdapterFn */
/** @typedef {import('../types').ForwardQuery} ForwardQuery */
/** @typedef {import('../types').ReverseQuery} ReverseQuery */
/** @typedef {import('../types').GeocoderResult} GeocoderResult */

export class AbstractGeocoder {
  /**
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {boolean} [options.raw] append raw response to results
   */
  constructor (adapter, options = {}) {
    if (!adapter) {
      throw new Error(`${this.constructor.name} needs an adapter`)
    }
    this.adapter = adapter
    this.raw = !!options.raw
    this._name = this.constructor.name.replace(/Geocoder$/i, '').toLowerCase()
    this.supportIPv4 = false
    this.supportIPv6 = false
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
   * @typedef {Array} WrappedResults
   * @property {any} raw
   */
  /**
   * wraps raw response on results object
   * @protected
   * @param {any} results
   * @param {object} body
   * @returns {WrappedResults}
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
   * @param {boolean} [isIP]
   * @returns {Promise<GeocoderResult[]>}
   */
  _forward (query, isIP) {
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
  _reverse (query) {
    throw wrapError400(
      new Error(`${this.constructor.name} does not support reverse geocoding`)
    )
  }
}
