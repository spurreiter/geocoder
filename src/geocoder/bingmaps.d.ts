/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-address
 * @typedef {object} BingMapsForwardQuery
 * @property {string} address
 * @property {number} [limit]
 */
/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
 * @typedef {object} BingMapsReverseQuery
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 * @property {number} [limit]
 */
export class BingMapsGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://docs.microsoft.com/en-us/bingmaps/rest-services/
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [limit]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
    });
    params: {
        maxResults: any;
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
            bbox: any[];
        };
    };
}
/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-address
 */
export type BingMapsForwardQuery = {
    address: string;
    limit?: number;
};
/**
 * see https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
 */
export type BingMapsReverseQuery = {
    /**
     * - latitude
     */
    lat: number;
    /**
     * - longitude
     */
    lng: number;
    limit?: number;
};
import { AbstractGeocoder } from "./abstract";
