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
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {string} [language]
     * @param {number} [options.limit]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
    });
    params: {
        api_key: string;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
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
/**
 * see https://www.geocod.io/docs/#single-address
 */
export type GeocodioForwardQuery = {
    address: string;
    /**
     * not supported
     */
    language?: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
};
/**
 * see https://www.geocod.io/docs/#reverse-geocoding
 */
export type GeocodioReverseQuery = {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lng: number;
    /**
     * not supported
     */
    language?: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
};
import { AbstractGeocoder } from "./abstract";
