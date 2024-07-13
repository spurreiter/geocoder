export class HereGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html
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
        apiKey: string;
        language?: string | undefined;
        limit?: number | undefined;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @see https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html
     * @param {string|HereForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | HereForwardQuery): Promise<object>;
    /**
     * @see https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html
     * @param {HereReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: HereReverseQuery): Promise<object>;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: string | undefined;
        state: any;
        county: any;
        city: any;
        zipcode: any;
        district: any;
        streetName: any;
        streetNumber: any;
        building: any;
        extra: {
            id: any;
            confidence: number;
        };
    };
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
export type HereForwardQuery = {
    address: string;
    language?: string | undefined;
    /**
     * Maximum number of results to be returned
     */
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
};
export type HereReverseQuery = {
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
