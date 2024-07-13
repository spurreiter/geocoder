/**
 * see https://developer.tomtom.com/search-api/documentation/geocoding-service/geocode
 * @typedef {object} TomTomForwardQuery
 * @property {string} address
 * @property {number} [limit]
 * @property {string} [category] see for list of values
 * @property {string} [preferredLabelValues]
 * @property {string} [language]
 */
/**
 * see https://developer.tomtom.com/search-api/documentation/reverse-geocoding-service/reverse-geocode
 * @typedef {object} TomTomReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {boolean} [returnIntersection]
 * @property {string} [locationType]
 * @property {string} [preferredLabelValues]
 * @property {string} [language]
 */
export class TomTomGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit]
     * @param {string} [options.language]
     * @param {number} [options.radius]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        limit?: number | undefined;
        language?: string | undefined;
        radius?: number | undefined;
    });
    params: {
        key: string;
        limit?: number | undefined;
        language?: string | undefined;
        radius?: number | undefined;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @param {string|TomTomForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query?: string | TomTomForwardQuery): Promise<object>;
    /**
     * @param {TomTomReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: TomTomReverseQuery): Promise<object>;
    /**
     * format forward geocoding results
     * @param {object} result
     * @returns {object}
     */
    _formatResult(result: object): object;
    /**
     * format reverse search result
     * @param {object} result
     * @returns {object}
     */
    _formatResultRev(result: object): object;
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
/**
 * see https://developer.tomtom.com/search-api/documentation/geocoding-service/geocode
 */
export type TomTomForwardQuery = {
    address: string;
    limit?: number | undefined;
    /**
     * see for list of values
     */
    /**
     * see for list of values
     */
    category?: string | undefined;
    preferredLabelValues?: string | undefined;
    language?: string | undefined;
};
/**
 * see https://developer.tomtom.com/search-api/documentation/reverse-geocoding-service/reverse-geocode
 */
export type TomTomReverseQuery = {
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
    limit?: number | undefined;
    returnIntersection?: boolean | undefined;
    locationType?: string | undefined;
    preferredLabelValues?: string | undefined;
    language?: string | undefined;
};
import { AbstractGeocoder } from './abstract.js';
