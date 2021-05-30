/**
 * @typedef {object} MapBoxForwardQuery
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
 * @typedef {object} MapBoxReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=5] Maximum number of results to be returned
 * @property {string} [language]
 * @property {boolean} [routing]
 * @property {string[]} [country]
 */
export class MapBoxGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://docs.mapbox.com/api/search/geocoding/
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit=5]
     * @param {string} [options.language]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
        limit?: number;
        language?: string;
    });
    params: {
        limit?: number;
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
        city: any;
        zipcode: any;
        district: any;
        streetName: any;
        streetNumber: any;
        neighbourhood: any;
        extra: {
            id: any;
            category: any;
            bbox: any;
        };
    };
}
export type MapBoxForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
    language?: string;
    autocomplete?: boolean;
    fuzzyMatch?: boolean;
    routing?: boolean;
    bbox?: number[];
    proximity?: number[];
    country?: string[];
};
export type MapBoxReverseQuery = {
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
    limit?: number;
    language?: string;
    routing?: boolean;
    country?: string[];
};
import { AbstractGeocoder } from "./abstract";
