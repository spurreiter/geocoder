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
    constructor(adapter: fetchAdapterFn, options: {
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
 * see https://pickpoint.io/api-reference#forward-geocoding
 */
export type PickpointForwardQuery = {
    /**
     * -
     */
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    /**
     * search by country
     */
    /**
     * search by country
     */
    country?: string | undefined;
    /**
     * search by states
     */
    /**
     * search by states
     */
    state?: string | undefined;
    /**
     * search by districts / provinces
     */
    /**
     * search by districts / provinces
     */
    county?: string | undefined;
    /**
     * search by names of cities
     */
    /**
     * search by names of cities
     */
    city?: string | undefined;
    /**
     * search by names of streets. Should be specified in the following format `<house_number> <street_name>`
     */
    /**
     * search by names of streets. Should be specified in the following format `<house_number> <street_name>`
     */
    street?: string | undefined;
    /**
     * limit the results to a specified postal code
     */
    /**
     * limit the results to a specified postal code
     */
    postalcode?: string | undefined;
};
/**
 * see https://pickpoint.io/api-reference#reverse-geocoding
 */
export type PickpointReverseQuery = {
    /**
     * latitude
     */
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    /**
     * longitude
     */
    lng: number;
    /**
     * Maximum number of results to be returned
     */
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    /**
     * 0..18
     */
    /**
     * 0..18
     */
    zoom?: string | undefined;
};
import { OsmGeocoder } from './osm.js';
