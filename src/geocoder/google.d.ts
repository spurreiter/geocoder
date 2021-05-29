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
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 * @property {string} [language]
 * @property {string} [result_type]
 * @property {string} [location_type]
 */
export class GoogleGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developers.google.com/maps/documentation/geocoding/overview
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {string} [language]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
    });
    params: {};
    get endpoint(): string;
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
/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
 */
export type GoogleForwardQuery = {
    /**
     * -
     */
    address: string;
    language?: string;
    bounds?: string;
    region?: string;
    components?: string;
};
/**
 * see https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
 */
export type GoogleReverseQuery = {
    /**
     * - latitude
     */
    lat: number;
    /**
     * - longitude
     */
    lng: number;
    language?: string;
    result_type?: string;
    location_type?: string;
};
import { AbstractGeocoder } from "./abstract.js";
