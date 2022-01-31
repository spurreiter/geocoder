import { AbstractGeocoder } from './abstract.js'
import { HttpError, objToCamelCase } from '../utils/index.js'

/** @typedef {import('../adapter').fetchAdapterFn} fetchAdapterFn */

function hasResult (result) {
  return result && !!result.location
}

/**
 * @typedef {object} GeoLite2ForwardQuery
 * @property {string} address
 * @property {string} [language=en]
 */

/**
 * run your local maxmind geoip2 server e.g. with @maxmind/geoip2-node npm module
 * https://dev.maxmind.com/geoip/docs/web-services/requests#geolite2-endpoints
 */
export class GeoLite2Geocoder extends AbstractGeocoder {
  /**
   * available options
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} [options.endpoint='https://geolite.info/geoip/v2.1/city']
   * @param {string} [options.accountId] MaxMind account ID
   * @param {string} [options.apiKey] MaxMind license key
   * @param {string} [options.language]
   */
  constructor (adapter, options = {}) {
    // @ts-ignore
    super(adapter, options)

    const {
      accountId,
      apiKey,
      endpoint,
      ...params
    } = options

    if (!endpoint && !(apiKey && accountId)) {
      throw new Error(`You must either specify accountId and apiKey or endpoint to use ${this.constructor.name}`)
    }

    this.endpoint = endpoint || 'https://geolite.info/geoip/v2.1/city'
    this.params = params
    this.supportIPv4 = this.supportIPv6 = true

    if (accountId && apiKey) {
      const authorization = 'Basic ' + Buffer.from(accountId + ':' + apiKey).toString('base64')
      this.opts = { headers: { authorization } }
    }
  }

  /**
   * @param {string|GeoLite2ForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query = '') {
    let params = this.params
    let searchtext = query

    if (typeof query !== 'string' && query.address) {
      const { address, ...other } = query
      searchtext = address
      params = { ...params, ...other }
    }

    const { language, ..._params } = params

    const url = this.createUrl(
      `${this.endpoint}/${searchtext}`,
      _params
    )

    const res = await this.adapter(url, this.opts)
    if (res.status !== 200) {
      throw HttpError(res)
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
    } = objToCamelCase(result)

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
