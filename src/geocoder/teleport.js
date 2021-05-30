/**
 * @credits https://github.com/nchaulet/node-geocoder/blob/master/lib/geocoder/teleportgeocoder.js
 * @license MIT
 */

import { AbstractGeocoder } from './abstract.js'
import { HttpError } from '../utils/index.js'

function getEmbeddedPath (parent, path, def) {
  const elements = path.split('/')
  for (const i in elements) {
    const element = elements[i]
    const embedded = parent._embedded
    if (!embedded) {
      return undefined
    }
    const child = embedded[element]
    if (!child) {
      return undefined
    }
    parent = child
  }
  return parent
}

/**
 * @typedef {object} TeleportForwardQuery
 * @property {string} address
 */

/**
 * @typedef {object} TeleportReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 */

/**
 * with Teleport geocoder only cities can by found but no addresses
 */
export class TeleportGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @see https://developers.teleport.org/api/resources/
   * @param {function} adapter
   * @param {object} options
   */
  constructor (adapter, options = {}) {
    super(adapter, options)
    this.params = options
  }

  get endpoint () {
    return 'https://api.teleport.org/api/cities'
  }

  get revEndpoint () {
    return 'https://api.teleport.org/api/locations'
  }

  /**
   * @param {string|TeleportForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query) {
    let params = {
      ...this.params,
      search: query,
      embed: 'city:search-results/city:item/{city:country,city:admin1_division,city:urban_area}'
    }

    if (query.address) {
      const { address, ...other } = query
      params = { ...params, ...other, search: address }
    }

    const url = this.createUrl(this.endpoint, params)

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    const searchResults = getEmbeddedPath(result, 'city:search-results')

    if (!searchResults) {
      return this.wrapRaw([], result)
    }
    const results = searchResults.map(this._formatResult.bind(this, 'city:item'))
    // console.dir({ body: result }, { depth: null })
    return this.wrapRaw(results, result)
  }

  /**
   * @param {string|TeleportReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse (query) {
    const { lat, lng, ...other } = query
    const params = {
      ...this.params,
      ...other,
      embed: 'location:nearest-cities/location:nearest-city/{city:country,city:admin1_division,city:urban_area}'
    }

    const url = this.createUrl(
      `${this.revEndpoint}/${lat},${lng}`,
      params
    )

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    const searchResults = getEmbeddedPath(result, 'location:nearest-cities')

    if (!searchResults) {
      return this.wrapRaw([], result)
    }
    const results = searchResults.map(this._formatResult.bind(this, 'location:nearest-city'))
    // console.dir({ body: result, expResults: results }, { depth: null })
    return this.wrapRaw(results, result)
  }

  _formatResult (cityRelationName, result) {
    const city = getEmbeddedPath(result, cityRelationName)
    const admin1 = getEmbeddedPath(city, 'city:admin1_division') || {}
    const country = getEmbeddedPath(city, 'city:country') || {}
    const urbanArea = getEmbeddedPath(city, 'city:urban_area') || {}
    const urbanAreaLinks = urbanArea._links || {}
    const extra = {
      urbanArea: urbanArea.name,
      urbanAreaApiUrl: (urbanAreaLinks.self || {}).href,
      urbanAreaWebUrl: urbanArea.teleport_city_url
    }
    if (result.distance_km) {
      extra.distanceKm = result.distance_km
      extra.confidence = Math.max(0, 25 - result.distance_km) / 25 * 10
    }
    if (result.matching_full_name) {
      extra.matchingFullName = result.matching_full_name
    }

    return {
      latitude: city.location.latlon.latitude,
      longitude: city.location.latlon.longitude,
      city: city.name,
      country: country.name,
      countryCode: country.iso_alpha2,
      state: admin1.name,
      stateCode: admin1.geonames_admin1_code,
      extra: extra
    }
  }
}
