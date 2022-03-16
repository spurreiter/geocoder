/** @typedef {import('../adapter').fetchAdapterFn} fetchAdapterFn */
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
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit=5]
     * @param {string} [options.language]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        limit?: number | undefined;
        language?: string | undefined;
    });
    params: {
        limit?: number | undefined;
        language?: string | undefined;
    };
    get endpoint(): string;
    /**
     * @param {string|MapBoxForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | MapBoxForwardQuery): Promise<object>;
    /**
     * @param {MapBoxReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: MapBoxReverseQuery): Promise<object>;
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
export type fetchAdapterFn = import('../adapter').fetchAdapterFn;
export type MapBoxForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    autocomplete?: boolean | undefined;
    fuzzyMatch?: boolean | undefined;
    routing?: boolean | undefined;
    bbox?: number[] | undefined;
    proximity?: number[] | undefined;
    country?: string[] | undefined;
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
    limit?: number | undefined;
    language?: string | undefined;
    routing?: boolean | undefined;
    country?: string[] | undefined;
};
import { AbstractGeocoder } from "./abstract.js";
