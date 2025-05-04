import { AbstractGeocoder } from './abstract.js'
import { HttpError } from '../utils/index.js'

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

const hasResult = (result) => {
  const { features } = result || {}
  return Array.isArray(features)
}

const CONFIDENCE_MAP = {
  High: 1,
  Medium: 0.6,
  Low: 0.3
}

const ACCEPT_LANGUAGE = 'accept-language'

/**
 * see https://learn.microsoft.com/en-us/rest/api/maps/search/get-geocoding?view=rest-maps-2025-01-01&tabs=HTTP
 * @typedef {object} AzureMapsForwardQuery
 * @property {string} address (equals query)
 * @property {string} [addressLine]
 * @property {string} [adminDistrict]
 * @property {string} [adminDistrict2]
 * @property {string} [adminDistrict3]
 * @property {number[]} [bbox]
 * @property {number[]} [coordinates]
 * @property {string} [countryRegion]
 * @property {string} [locality]
 * @property {string} [postalCode]
 * @property {string} [view]
 * @property {number} [limit] (equals top)
 * @property {string} [language]
 */

/**
 * see
 * @typedef {object} BingMapsReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {string} [language]
 */

export class AzureMapsGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @see https://learn.microsoft.com/en-us/rest/api/maps/search?view=rest-maps-2025-01-01
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} [options.apiKey] - subscription key
   * @param {string} [options.authorization] - authorization header if using OAuth2
   * @param {number} [options.limit]
   * @param {string} [options.language]
   */
  constructor(adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options)

    if (!options.apiKey && !options.authorization) {
      throw new Error(
        'You must specify some authorization or apiKey to use AzureMapsGeocoder'
      )
    }

    const { limit: top, language, apiKey } = options

    this.headers = {
      [ACCEPT_LANGUAGE]: 'en'
    }
    setLanguage(this.headers, language)

    this.params = {
      'api-version': '2025-01-01',
      'subscription-key': apiKey,
      top
    }
  }

  get endpoint() {
    return 'https://atlas.microsoft.com/geocode'
  }

  get revEndpoint() {
    return 'https://atlas.microsoft.com/reverseGeocode'
  }

  /**
   * @param {AzureMapsForwardQuery|string} query
   * @returns {Promise<object>}
   */
  async _forward(query = '') {
    let params = {}
    let headers = { ...this.headers }

    if (typeof query === 'string') {
      params = { ...this.params, query }
    } else {
      const { address, limit, language, ...other } = query
      setLanguage(headers, language)

      const top = limit || this.params.top
      if (address) {
        const { bbox, coordinates, view } = other
        params = { ...params, top, query: address, bbox, coordinates, view }
      } else {
        params = { ...params, top, ...other }
      }
    }

    const url = this.createUrl(this.endpoint, params)

    const res = await this.adapter(url, { headers })
    if (res.status !== 200) {
      throw HttpError(res)
    }
    const result = await res.json()
    // console.dir(result, { depth: null })
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @todo
   * @param {BingMapsReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse(query) {
    const { lat, lng, language, limit: top, ...other } = query
    const params = {
      ...this.params,
      ...other,
      coordinates: `${lng},${lat}`,
      top
    }
    let headers = { ...this.headers }
    setLanguage(headers, language)

    const url = this.createUrl(this.revEndpoint, params)

    const res = await this.adapter(url, { headers })
    if (res.status !== 200) {
      throw HttpError(res)
    }
    const result = await res.json()
    // console.dir(result, { depth: null })
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = result.features.map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @see https://learn.microsoft.com/en-us/rest/api/maps/search/get-geocoding?view=rest-maps-2025-01-01&tabs=HTTP#featuresitem
   */
  _formatResult(result) {
    const { bbox, geometry, properties = {} } = result || {}
    const { address, confidence } = properties

    const extra = {
      confidence: CONFIDENCE_MAP[confidence] || 0,
      bbox
    }

    const formatted = {
      formattedAddress: address.formattedAddress,
      latitude: geometry.coordinates[1],
      longitude: geometry.coordinates[0],
      country: address.countryRegion?.name,
      countryCode: address.countryRegion?.ISO,
      state: address.adminDistrict?.[0],
      region: address.adminDistrict?.[1],
      city: address.locality,
      zipcode: address.postalCode,
      streetName: address.addressLine,
      extra
    }

    return formatted
  }
}

const setLanguage = (headers, language) => {
  if (!language) return
  headers[ACCEPT_LANGUAGE] = language
}
