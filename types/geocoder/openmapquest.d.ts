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
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        limit?: number | undefined;
        language?: string | undefined;
    });
    params: {
        key: string;
        format: string;
        addressdetails: number;
        limit?: number | undefined;
        language?: string | undefined;
    };
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
/**
 * see https://developer.mapquest.com/documentation/open/nominatim-search/search/
 */
export type OpenMapQuestForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    /**
     * search by country
     */
    country?: string | undefined;
    /**
     * search by states
     */
    state?: string | undefined;
    /**
     * search by districts / provinces
     */
    county?: string | undefined;
    /**
     * search by names of cities
     */
    city?: string | undefined;
    /**
     * search by names of streets. Should be specified in the following format `<house_number> <street_name>`
     */
    street?: string | undefined;
    /**
     * limit the results to a specified postal code
     */
    postalcode?: string | undefined;
};
/**
 * see https://developer.mapquest.com/documentation/open/nominatim-search/reverse/
 */
export type OpenMapQuestReverseQuery = {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lng: number;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    /**
     * 0..18
     */
    zoom?: string | undefined;
};
import { OsmGeocoder } from './osm.js';
