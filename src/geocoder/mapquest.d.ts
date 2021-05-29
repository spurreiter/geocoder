/**
 * @typedef {object} MapQuestForwardQuery
 * @property {string} address -
 * @property {number} [limit=5] - Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [autocomplete]
 * @property {boolean} [fuzzyMatch]
 * @property {boolean} [routing]
 * @property {number[]} [bbox]
 * @property {number[]} [proximity]
 * @property {string[]} [country]
 */
/**
 * @typedef {object} MapQuestReverseQuery
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 * @property {number} [limit=5] - Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [routing]
 * @property {string[]} [country]
 */
export class MapQuestGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developer.mapquest.com/documentation/geocoding-api
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit=5]
     * @param {string} [options.language]
     * @param {boolean} [options.licensed] Use licensed data instead of open data see https://developer.mapquest.com/documentation/open/
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
        limit?: number;
        language?: string;
        licensed?: boolean;
    });
    params: {
        maxResults: number;
        key: string;
        language?: string;
    };
    endpoint: string;
    revEndpoint: string;
    _formatResult(result?: {}): {
        formattedAddress: string;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: any;
        state: any;
        county: any;
        city: any;
        zipcode: any;
        streetName: any;
        neighbourhood: any;
        extra: {
            id: any;
            sideOfStreet: any;
        };
    };
}
export type MapQuestForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * - Maximum number of results to be returned
     */
    limit?: number;
    language?: string;
    autocomplete?: boolean;
    fuzzyMatch?: boolean;
    routing?: boolean;
    bbox?: number[];
    proximity?: number[];
    country?: string[];
};
export type MapQuestReverseQuery = {
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
    routing?: boolean;
    country?: string[];
};
import { AbstractGeocoder } from "./abstract.js";
