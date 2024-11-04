/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */
/**
 * @typedef {object} MapQuestForwardQuery
 * @property {string} address -
 * @property {number} [limit=5] Maximum number of results to be returned
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
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=5] Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [routing]
 * @property {string[]} [country]
 */
export class MapQuestGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developer.mapquest.com/documentation/geocoding-api
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit=5]
     * @param {string} [options.language]
     * @param {boolean} [options.licensed] Use licensed data instead of open data see https://developer.mapquest.com/documentation/open/
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        limit?: number | undefined;
        language?: string | undefined;
        licensed?: boolean | undefined;
    });
    params: {
        maxResults: number | undefined;
        key: string;
        language?: string | undefined;
    };
    endpoint: string;
    revEndpoint: string;
    /**
     * @param {string|MapQuestForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | MapQuestForwardQuery): Promise<object>;
    /**
     * @param {MapQuestReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: MapQuestReverseQuery): Promise<object>;
    _formatResult(result?: {}): {
        formattedAddress: string;
        latitude: any;
        longitude: any;
        country: string | undefined;
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
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
export type MapQuestForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    autocomplete?: boolean | undefined;
    fuzzyMatch?: boolean | undefined;
    routing?: boolean | undefined;
    bbox?: number[] | undefined;
    proximity?: number[] | undefined;
    country?: string[] | undefined;
};
export type MapQuestReverseQuery = {
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
    routing?: boolean | undefined;
    country?: string[] | undefined;
};
import { AbstractGeocoder } from './abstract.js';
