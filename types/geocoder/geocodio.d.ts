/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */
/**
 * see https://www.geocod.io/docs/#single-address
 * @typedef {object} GeocodioForwardQuery
 * @property {string} address
 * @property {string} [language] not supported
 * @property {number} [limit] Maximum number of results to be returned
 * @property {string} [street]
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [postal_code]
 */
/**
 * see https://www.geocod.io/docs/#reverse-geocoding
 * @typedef {object} GeocodioReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language] not supported
 * @property {number} [limit] Maximum number of results to be returned
 */
export class GeocodioGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://www.geocod.io/features/api/
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {string} [options.language]
     * @param {number} [options.limit]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        language?: string | undefined;
        limit?: number | undefined;
    });
    params: {
        api_key: string;
        limit?: number | undefined;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @see https://www.geocod.io/docs/#single-address
     * @param {string|GeocodioForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | GeocodioForwardQuery): Promise<object>;
    /**
     * @param {GeocodioReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: GeocodioReverseQuery): Promise<object>;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: string | undefined;
        countryCode: any;
        state: any;
        county: any;
        city: any;
        zipcode: any;
        streetName: any;
        streetNumber: any;
        extra: {
            confidence: number;
        };
    };
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
/**
 * see https://www.geocod.io/docs/#single-address
 */
export type GeocodioForwardQuery = {
    address: string;
    /**
     * not supported
     */
    /**
     * not supported
     */
    language?: string | undefined;
    /**
     * Maximum number of results to be returned
     */
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    street?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    postal_code?: string | undefined;
};
/**
 * see https://www.geocod.io/docs/#reverse-geocoding
 */
export type GeocodioReverseQuery = {
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
     * not supported
     */
    /**
     * not supported
     */
    language?: string | undefined;
    /**
     * Maximum number of results to be returned
     */
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
};
import { AbstractGeocoder } from './abstract.js';
