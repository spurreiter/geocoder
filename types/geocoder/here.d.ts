export class HereGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {string} [options.language]
     * @param {number} [options.limit]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        language?: string | undefined;
        limit?: number | undefined;
    });
    params: {
        apiKey: string;
        language?: string | undefined;
        limit?: number | undefined;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: string;
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
            confidence: number;
        };
    };
}
export type fetchAdapterFn = import('../adapter').fetchAdapterFn;
export type HereForwardQuery = {
    address: string;
    language?: string | undefined;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
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
    language?: string | undefined;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
};
import { AbstractGeocoder } from "./abstract.js";
