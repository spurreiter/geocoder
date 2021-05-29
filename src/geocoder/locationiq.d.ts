export class LocationIqGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://locationiq.com/docs
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {string} [options.language]
     * @param {string} [options.dcRegion=eu] datacenter region [us1, eu1]
     * @param {number} [options.limit]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
        language?: string;
        dcRegion?: string;
        limit?: number;
    });
    params: {
        key: string;
        format: string;
        addressdetails: number;
        language?: string;
        limit?: number;
    };
    endpoint: string;
    revEndpoint: string;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: any;
        state: any;
        region: any;
        county: any;
        city: any;
        zipcode: any;
        streetName: any;
        streetNumber: any;
        extra: {
            id: any;
            confidence: any;
            type: any;
            addrType: any;
            bbox: any[];
        };
    };
}
export type LocationIqForwardQuery = {
    address: string;
    language?: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
};
export type LocationIqReverseQuery = {
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
import { AbstractGeocoder } from "./abstract.js";
