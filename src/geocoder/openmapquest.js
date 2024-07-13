import { OsmGeocoder } from './osm.js'

/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */

/**
 * see https://developer.mapquest.com/documentation/open/nominatim-search/search/
 * @typedef {object} OpenMapQuestForwardQuery
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
 * see https://developer.mapquest.com/documentation/open/nominatim-search/reverse/
 * @typedef {object} OpenMapQuestReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=10] Maximum number of results to be returned
 * @property {string} [language]
 * @property {string} [zoom] 0..18
 */

export class OpenMapQuestGeocoder extends OsmGeocoder {
  /**
   * available options
   * @see https://developer.mapquest.com/documentation/open/nominatim-search/
   * @param {fetchAdapterFn} adapter
   * @param {object} options
   * @param {string} options.apiKey MapQuest API Key
   * @param {number} [options.limit=10]
   * @param {string} [options.language]
   */
  constructor (adapter, options = { apiKey: '' }) {
    super(adapter, { ...options, needsReferer: false })

    const { apiKey, ...params } = options

    if (!apiKey) {
      throw new Error(`You must specify apiKey to use ${this.constructor.name}`)
    }

    this.endpoint = 'http://open.mapquestapi.com/nominatim/v1/search.php'
    this.revEndpoint = 'http://open.mapquestapi.com/nominatim/v1/reverse.php'

    this.params = {
      ...params,
      key: apiKey,
      format: 'json', // force these params
      addressdetails: 1
    }
  }
}
