import { OsmGeocoder } from './osm.js'

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * see https://pickpoint.io/api-reference#forward-geocoding
 * @typedef {object} PickpointForwardQuery
 * @property {string} address -
 * @property {number} [limit=10] Maximum number of results to be returned
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
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=10] Maximum number of results to be returned
 * @property {string} [language]
 * @property {string} [zoom] 0..18
 */

export class PickpointGeocoder extends OsmGeocoder {
  /**
   * available options
   * @see https://pickpoint.io/api-reference
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey
   * @param {number} [options.limit=10]
   * @param {string} [options.language]
   */
  constructor (adapter, options = { apiKey: '' }) {
    super(adapter, options)

    const { apiKey, ...params } = options

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.endpoint = 'https://api.pickpoint.io/v1/forward'
    this.revEndpoint = 'https://api.pickpoint.io/v1/reverse'

    this.params = {
      ...params,
      key: apiKey,
      format: 'json', // force these params
      addressdetails: 1
    }
  }
}
