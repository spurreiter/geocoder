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
    constructor(adapter: Function, options?: {
        limit?: number;
        language?: string;
    });
}
/**
 * see https://pickpoint.io/api-reference#forward-geocoding
 */
export type PickpointForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * - Maximum number of results to be returned
     */
    limit?: number;
    language?: string;
    /**
     * search by country
     */
    country?: string;
    /**
     * search by states
     */
    state?: string;
    /**
     * search by districts / provinces
     */
    county?: string;
    /**
     * search by names of cities
     */
    city?: string;
    /**
     * search by names of streets. Should be specified in the following format `<house_number> <street_name>`
     */
    street?: string;
    /**
     * limit the results to a specified postal code
     */
    postalcode?: string;
};
/**
 * see https://pickpoint.io/api-reference#reverse-geocoding
 */
export type PickpointReverseQuery = {
    /**
     * - latitude
     */
    lat: number;
    /**
     * - longitude
     */
    lng: number;
    /**
     * - Maximum number of results to be returned
     */
    limit?: number;
    language?: string;
    /**
     * 0..18
     */
    zoom?: string;
};
import { OsmGeocoder } from "./osm.js";
