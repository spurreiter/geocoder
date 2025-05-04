/**
 * see https://learn.microsoft.com/en-us/rest/api/maps/search/get-geocoding?view=rest-maps-2025-01-01&tabs=HTTP
 * @typedef {object} AzureMapsForwardQuery
 * @property {string} address (equals query)
 * @property {string} [addressLine]
 * @property {string} [adminDistrict]
 * @property {string} [adminDistrict2]
 * @property {string} [adminDistrict3]
 * @property {number[]} [bbox]
 * @property {number[]} [coordinates]
 * @property {string} [countryRegion]
 * @property {string} [locality]
 * @property {string} [postalCode]
 * @property {string} [view]
 * @property {number} [limit] (equals top)
 * @property {string} [language]
 */
/**
 * see
 * @typedef {object} BingMapsReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {string} [language]
 */
export class AzureMapsGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://learn.microsoft.com/en-us/rest/api/maps/search?view=rest-maps-2025-01-01
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} [options.apiKey] - subscription key
     * @param {string} [options.authorization] - authorization header if using OAuth2
     * @param {number} [options.limit]
     * @param {string} [options.language]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey?: string | undefined;
        authorization?: string | undefined;
        limit?: number | undefined;
        language?: string | undefined;
    });
    headers: {
        "accept-language": string;
    };
    params: {
        'api-version': string;
        'subscription-key': string | undefined;
        top: number | undefined;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @param {AzureMapsForwardQuery|string} query
     * @returns {Promise<object>}
     */
    _forward(query?: AzureMapsForwardQuery | string): Promise<object>;
    /**
     * @todo
     * @param {BingMapsReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: BingMapsReverseQuery): Promise<object>;
    /**
     * @see https://learn.microsoft.com/en-us/rest/api/maps/search/get-geocoding?view=rest-maps-2025-01-01&tabs=HTTP#featuresitem
     */
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: any;
        state: any;
        region: any;
        city: any;
        zipcode: any;
        streetName: any;
        extra: {
            confidence: any;
            bbox: any;
        };
    };
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
/**
 * see https://learn.microsoft.com/en-us/rest/api/maps/search/get-geocoding?view=rest-maps-2025-01-01&tabs=HTTP
 */
export type AzureMapsForwardQuery = {
    /**
     * (equals query)
     */
    address: string;
    addressLine?: string | undefined;
    adminDistrict?: string | undefined;
    adminDistrict2?: string | undefined;
    adminDistrict3?: string | undefined;
    bbox?: number[] | undefined;
    coordinates?: number[] | undefined;
    countryRegion?: string | undefined;
    locality?: string | undefined;
    postalCode?: string | undefined;
    view?: string | undefined;
    /**
     * (equals top)
     */
    limit?: number | undefined;
    language?: string | undefined;
};
/**
 * see
 */
export type BingMapsReverseQuery = {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lng: number;
    limit?: number | undefined;
    language?: string | undefined;
};
import { AbstractGeocoder } from './abstract.js';
