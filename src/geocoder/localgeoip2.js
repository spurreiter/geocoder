import { AbstractGeocoder } from './abstract.js'
import { HttpError } from '../utils/index.js'

function hasResult (result) {
  return result && !!result.location
}

/**
 * @typedef {object} LocalGeoip2ForwardQuery
 * @property {string} address
 * @property {string} [language=en]
 */

/**
 * run your local maxmind geoip2 server e.g. with @maxmind/geoip2-node npm module
 */
export class LocalGeoip2Geocoder extends AbstractGeocoder {
  /**
   * available options
   * @param {function} adapter
   * @param {object} options
   * @param {string} [endpoint=http://localhost:3000/city]
   */
  constructor (adapter, options = {}) {
    super(adapter, options)

    const { endpoint = 'http://localhost:3000/city', ...params } = options

    this.endpoint = endpoint
    this.params = params

    this.supportIPv4 = this.supportIPv6 = true
  }

  /**
   * @param {string|LocalGeoip2ForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query = '') {
    let params = this.params
    let searchtext = query

    if (query.address) {
      const { address, ...other } = query
      searchtext = address
      params = { ...params, ...other }
    }

    const { language, ..._params } = params

    const url = this.createUrl(
      `${this.endpoint}/${searchtext}`,
      _params
    )

    const res = await this.adapter(url)
    if (res.status !== 200) {
      throw new HttpError(res)
    }
    const result = await res.json()
    if (!hasResult(result)) {
      return this.wrapRaw([], result)
    }

    const results = [result].map(this._formatResult.bind(this, language))
    // console.dir({ body: result, expResults: results }, { depth: null })
    return this.wrapRaw(results, result)
  }

  _formatResult (language, result = {}) {
    const {
      country = { names: {} },
      registeredCountry = {},
      traits = {},
      location = {}
    } = result

    const { latitude, longitude, accuracyRadius, timeZone } = location
    const { isInEuropeanUnion } = registeredCountry
    const { ipAddress: ip, network } = traits

    const _country = registeredCountry.names
      ? registeredCountry.names[language] || registeredCountry.names.en
      : country.names[language] || country.names.en

    const formatted = {
      ip,
      latitude,
      longitude,
      countryCode: registeredCountry.isoCode || country.isoCode,
      country: _country,
      extra: {
        id: registeredCountry.geonameId || country.geonameId,
        accuracyRadius,
        isInEuropeanUnion,
        timeZone,
        network
      }
    }
    return formatted
  }
}
