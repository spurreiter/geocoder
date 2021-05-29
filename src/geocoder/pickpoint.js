import { OsmGeocoder } from './osm.js'

/**
 * see https://pickpoint.io/api-reference#forward-geocoding
 * @typedef {object} PickpointForwardQuery
 * @property {string} address -
 * @property {number} [limit=10] - Maximum number of results to be returned
 * @property {string} [language]
 * @property {string} [country] search by country
 * @property {string} [state] search by states
 * @property {string} [county] search by districts / provinces
 * @property {string} [city] search by names of cities
 * @property {string} [street] search by names of streets. Should be specified in the following format `<house_number> <street_name>`
 * @property {string} [postalcode] limit the results to a specified postal code
 */

/**
 * see https://pickpoint.io/api-reference#reverse-geocoding
 * @typedef {object} PickpointReverseQuery
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 * @property {number} [limit=10] - Maximum number of results to be returned
 * @property {string} [language]
 * @property {string} [zoom] 0..18
 */

export class PickpointGeocoder extends OsmGeocoder {
  /**
   * available options
   * @see https://pickpoint.io/api-reference
   * @param {function} adapter
   * @param {object} options
   * @param {number} [options.limit=10]
   * @param {string} [options.language]
   */
  constructor (adapter, options = {}) {
    super(adapter, options)

    const { apiKey, ...params } = options

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.params = {
      ...params,
      key: apiKey,
      format: 'json', // force these params
      addressdetails: 1
    }
  }

  get endpoint () {
    return 'https://api.pickpoint.io/v1/forward'
  }

  get revEndpoint () {
    return 'https://api.pickpoint.io/v1/reverse '
  }
}
