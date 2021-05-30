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
     * @param {string} [options.language]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
        language?: string;
    });
    params: {
        apikey: string;
        format: string;
        language?: string;
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
     * house, street, metro, district, locality
     */
    kind?: string;
    /**
     * [0,1]
     */
    rspn?: number;
    /**
     * Longitude and latitude of the center of the search area
     */
    ll?: string;
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
};
import { AbstractGeocoder } from "./abstract.js";
