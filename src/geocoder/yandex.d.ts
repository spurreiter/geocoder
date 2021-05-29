/**
 * @see https://yandex.com/dev/maps/geocoder/doc/desc/concepts/input_params.html
 * @typedef {object} YandexForwardQuery
 * @property {string} address
 * @property {string} [language]
 * @property {string} [kind] house, street, metro, district, locality
 * @property {number} [rspn] [0,1]
 * @property {string} [ll] Longitude and latitude of the center of the search area
 */
/**
 * @typedef {object} YandexReverseQuery
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 * @property {string} [language]
 */
export class YandexGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://yandex.com/dev/maps/geocoder/doc/desc/concepts/input_params.html
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
    });
    params: {
        apikey: string;
        format: string;
    };
    get endpoint(): string;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: any;
        state: any;
        county: any;
        city: any;
        streetName: any;
        streetNumber: any;
        extra: {
            bbox: number[];
        };
    };
}
export type YandexForwardQuery = {
    address: string;
    language?: string;
    /**
     * - Maximum number of results to be returned
     */
    limit?: number;
};
export type YandexReverseQuery = {
    /**
     * - latitude
     */
    lat: number;
    /**
     * - longitude
     */
    lng: number;
    language?: string;
    /**
     * - Maximum number of results to be returned
     */
    limit?: number;
};
import { AbstractGeocoder } from "./abstract.js";
