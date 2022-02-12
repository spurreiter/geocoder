export class LocationIqGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://locationiq.com/docs
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {string} [options.language]
     * @param {string} [options.dcRegion=eu] datacenter region [us1, eu1]
     * @param {number} [options.limit]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        language?: string | undefined;
        dcRegion?: string | undefined;
        limit?: number | undefined;
    });
    params: {
        key: string;
        format: string;
        addressdetails: number;
        language?: string | undefined;
        limit?: number | undefined;
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
            confidence: number;
            type: any;
            addrType: any;
            bbox: any[] | undefined;
        };
    };
}
export type fetchAdapterFn = import('../adapter').fetchAdapterFn;
export type LocationIqForwardQuery = {
    address: string;
    language?: string | undefined;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
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
    language?: string | undefined;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
};
import { AbstractGeocoder } from "./abstract.js";
