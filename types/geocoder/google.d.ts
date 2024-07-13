/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
 * @typedef {object} GoogleForwardQuery
 * @property {string} address -
 * @property {string} [language]
 * @property {string} [bounds]
 * @property {string} [region]
 * @property {string} [components]
 */
/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
 * @typedef {object} GoogleReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language]
 * @property {string} [result_type]
 * @property {string} [location_type]
 */
export class GoogleGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developers.google.com/maps/documentation/geocoding/overview
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {string} [options.language]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        language?: string | undefined;
    });
    params: {
        language?: string | undefined;
    };
    get endpoint(): string;
    /**
     * @param {string|GoogleForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query?: string | GoogleForwardQuery): Promise<object>;
    /**
     * @param {GoogleReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: GoogleReverseQuery): Promise<object>;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: any;
        state: any;
        region: any;
        district: any;
        city: any;
        zipcode: any;
        streetName: any;
        streetNumber: any;
        extra: any;
    };
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
 */
export type GoogleForwardQuery = {
    /**
     * -
     */
    /**
     * -
     */
    address: string;
    language?: string | undefined;
    bounds?: string | undefined;
    region?: string | undefined;
    components?: string | undefined;
};
/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
 */
export type GoogleReverseQuery = {
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
    result_type?: string | undefined;
    location_type?: string | undefined;
};
import { AbstractGeocoder } from './abstract.js';
