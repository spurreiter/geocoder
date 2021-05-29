import { AbstractGeocoder } from './abstract.js'
import { HttpError, toUpperCase } from '../utils/index.js'

const ACCEPT_LANGUAGE = 'accept-language'

function mapParams (params) {
  const { language, ...other } = params
  if (language) {
    other[ACCEPT_LANGUAGE] = language
  }
  return other
}

function hasResult (result) {
  return (Array.isArray(result) && result.length && result[0].osm_type) || (result && result.osm_type)
}

function mapToNumber (arr) {
  return Array.isArray(arr) ? arr.map(n => +n) : undefined
}

function toBbox (boundingbox) {
  const [ymin, ymax, xmin, xmax] = mapToNumber(boundingbox) || []
  if (xmin !== undefined) {
    return [xmin, ymin, xmax, ymax]
  }
}

/**
 * @typedef {object} OsmForwardQuery
 * @property {string} address -
 * @property {number} [limit=10] - Maximum number of results to be returned
 * @property {string} [language]
 * @property {number} [addressdetails]
 * @property {number} [extratags]
 * @property {number} [countrycodes]
 * @property {string[]} [viewbox]
 * @property {number} [bounded]
 * @property {string} [email]
 * @property {number} [dedupe]
 */

/**
 * @typedef {object} OsmReverseQuery
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 * @property {number} [limit=10] - Maximum number of results to be returned
 * @property {string} [language]
 * @property {number} [addressdetails]
 * @property {number} [extratags]
 * @property {number} [namedetails]
 * @property {number} [zoom]
 * @property {string} [email]
 */

export class OsmGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @see https://nominatim.org/release-docs/develop/api/Search/
   * @param {function} adapter
   * @param {object} options
   * @param {number} [options.limit=10]
   * @param {string} [options.language]
   * @param {number} [options.addressdetails]
   * @param {number} [options.extratags]
   * @param {number} [options.countrycodes]
   * @param {string} [options.email]
   * @param {number} [options.dedupe]
   */
  constructor (adapter, options = {}) {
    super(adapter, options)

    this.params = {
      ...options,
      format: 'json', // force these params
      addressdetails: 1
    }
  }

  get endpoint () {
    return 'https://nominatim.openstreetmap.org/search'
  }

  get revEndpoint () {
    return 'https://nominatim.openstreetmap.org/reverse'
  }

  /**
   * @param {string|OsmForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query) {
    let params = { ...this.params, q: query }

    if (query.address) {
      const { address, ...other } = query
      params = { ...params, ...other, q: address }
    }

    params = mapParams(params)
    const url = this.createUrl(this.endpoint, params)

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = [].concat(result).map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  /**
   * @param {string|OsmReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse (query) {
    const { lat, lng, ...other } = query
    const params = mapParams({ ...this.params, ...other, lat, lon: lng })

    const url = this.createUrl(this.revEndpoint, params)

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }
    const results = [].concat(result).map(this._formatResult)
    return this.wrapRaw(results, result)
  }

  _formatResult (result = {}) {
    const { address = {} } = result

    const formatted = {
      formattedAddress: result.display_name,
      latitude: +result.lat,
      longitude: +result.lon,
      country: address.country,
      countryCode: toUpperCase(address.country_code),
      state: address.state,
      county: address.county || address.region,
      city: address.city,
      zipcode: address.postcode,
      district: address.state_district || address.municipality,
      streetName: address.road || address.cycleway,
      streetNumber: address.house_number,
      neighbourhood: address.neighbourhood,
      extra: {
        id: result.osm_id,
        confidence: result.importance || 0,
        bbox: toBbox(result.boundingbox)
      }
    }

    return formatted
  }
}
