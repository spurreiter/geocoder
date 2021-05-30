export class HereGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html
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
        apiKey: string;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: any;
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
            confidence: any;
        };
    };
}
export type HereForwardQuery = {
    address: string;
    language?: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
};
export type HereReverseQuery = {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lng: number;
    language?: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
};
import { AbstractGeocoder } from "./abstract";
