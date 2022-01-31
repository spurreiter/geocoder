/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-address
 * @typedef {object} BingMapsForwardQuery
 * @property {string} address
 * @property {number} [limit]
 * @property {string} [language]
 */
/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
 * @typedef {object} BingMapsReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {string} [language]
 */
export class BingMapsGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://docs.microsoft.com/en-us/bingmaps/rest-services/
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit]
     * @param {string} [options.language]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        limit?: number | undefined;
        language?: string | undefined;
    });
    params: {
        maxResults: number | undefined;
        o: string;
        include: string;
        key: string;
    };
    get endpoint(): string;
    /**
     * @see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/location-data
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
            bbox: any[] | undefined;
        };
    };
}
export type fetchAdapterFn = import('../adapter').fetchAdapterFn;
/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-address
 */
export type BingMapsForwardQuery = {
    address: string;
    limit?: number | undefined;
    language?: string | undefined;
};
/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
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
import { AbstractGeocoder } from "./abstract.js";