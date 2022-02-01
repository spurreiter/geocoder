import { AbstractGeocoder } from './abstract.js'
import { HttpError, countryCode, countryName } from '../utils/index.js'

/** @typedef {import('../adapter').fetchAdapterFn} fetchAdapterFn */

const undef = (s) => s === '' ? undefined : s

/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
 * @typedef {object} ArcGisForwardQuery
 * @property {string} address
 * @property {number} [limit]
 * @property {string} [category] see https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer?f=pjson for list of values
 * @property {string} [preferredLabelValues]
 * @property {string} [language]
 */

/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm
 * @typedef {object} ArcGisReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {boolean} [returnIntersection]
 * @property {string} [locationType]
 * @property {string} [preferredLabelValues]
 * @property {string} [language]
 */

export class ArcGisGeocoder extends AbstractGeocoder {
  /**
   * available options
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit]
   * @param {string} [options.language]
   */
  constructor (adapter, options = { apiKey: '' }) {
    // @ts-ignore
    super(adapter, options)

    const {
      apiKey,
      limit: maxLocations,
      language: langCode,
      ...params
    } = options

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      langCode,
      maxLocations,
      f: 'json',
      token: apiKey
    }
  }

  get endpoint () {
    return 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates'
  }

  get revEndpoint () {
    return 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode'
  }

  /**
   * @param {string|ArcGisForwardQuery} query
   * @returns {Promise<object>}
   */
  async _forward (query = '') {
    let params = {
      ...this.params,
      address: query,
      outFields:
        'AddNum,Addr_type,City,Country,LongLabel,Place_addr,PlaceName,Postal,Rank,Region,StName,StPreDir,StType,Type'
    }

    if (typeof query !== 'string' && query.address) {
      const {
        address,
        language: langCode,
        limit: maxLocations,
        ...other
      } = query
      params = { ...params, ...other, address, langCode, maxLocations }
    }

    const url = this.endpoint
    const res = await this.adapter(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.createSearch(params)
    })
    if (res.status !== 200) {
      throw HttpError(res)
    }
    const result = await res.json()
    // console.dir(result, { depth: null })
    if (!result.candidates) {
      return this.wrapRaw([], result)
    }
    const results = result.candidates.map(this._formatResult.bind(this, params.langCode))
    return this.wrapRaw(results, result)
  }

  /**
   * @param {ArcGisReverseQuery} query
   * @returns {Promise<object>}
   */
  async _reverse (query) {
    const {
      lat,
      lng,
      language: langCode,
      limit: maxLocations,
      ...other
    } = query
    const params = {
      ...this.params,
      ...other,
      langCode,
      maxLocations,
      location: `${lng},${lat}`
    }

    const url = this.revEndpoint
    const res = await this.adapter(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.createSearch(params)
    })
    if (res.status !== 200) {
      throw HttpError(res)
    }
    const result = await res.json()
    // console.dir(result, { depth: null })
    if (!result?.address) {
      return this.wrapRaw([], result)
    }
    const results = [result].map(this._formatResultRev.bind(this, params.langCode))
    return this.wrapRaw(results, result)
  }

  /**
   * format forward geocoding results
   * @param {object} result
   * @returns {object}
   */
  _formatResult (language, result) {
    const {
      // address,
      location = {},
      attributes = {},
      score = 0,
      extent = {}
    } = result || {}

    const {
      AddNum,
      Addr_type,
      City,
      Country,
      LongLabel,
      PlaceName,
      Postal,
      Rank,
      Region,
      StName,
      StPreDir,
      StType,
      Type
    } = attributes

    const { xmin, ymin, xmax, ymax } = extent

    const extra = {
      confidence: score / 100,
      type: undef(Type),
      placeName: undef(PlaceName),
      addrType: undef(Addr_type),
      rank: undef(Rank),
      bbox: [xmin, ymin, xmax, ymax]
    }

    const formatted = {
      formattedAddress: undef(LongLabel),
      latitude: location.y,
      longitude: location.x,
      country: countryName(Country),
      countryCode: countryCode(undef(Country)),
      state: undef(Region),
      city: undef(City),
      zipcode: undef(Postal),
      streetName: [StPreDir, StName, StType].filter(Boolean).join(' '),
      streetNumber: undef(AddNum),
      extra
    }

    return formatted
  }

  /**
   * format reverse search result
   * @param {object} result
   * @returns {object}
   */
  _formatResultRev (language, result) {
    const { address = {}, location = {} } = result || {}

    const {
      LongLabel,
      Addr_type,
      Type,
      PlaceName,
      AddNum,
      Address,
      City,
      Region,
      Postal,
      CountryCode
    } = address

    const extra = {
      type: undef(Type),
      placeName: undef(PlaceName),
      addrType: undef(Addr_type)
    }

    const formatted = {
      formattedAddress: undef(LongLabel),
      latitude: location.y,
      longitude: location.x,
      country: countryName(CountryCode),
      countryCode: countryCode(undef(CountryCode)),
      state: undef(Region),
      city: undef(City),
      zipcode: undef(Postal),
      streetName:
        Address && AddNum ? Address.replace(AddNum, '').trim() : undef(Address),
      streetNumber: undef(AddNum),
      extra
    }

    return formatted
  }
}
