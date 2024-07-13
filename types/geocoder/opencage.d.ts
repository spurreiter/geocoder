export class OpenCageGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://opencagedata.com/api#quickstart
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit=10]
     * @param {string} [options.language]
     * @param {number} [options.abbrv]
     * @param {number} [options.roadinfo]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        limit?: number | undefined;
        language?: string | undefined;
        abbrv?: number | undefined;
        roadinfo?: number | undefined;
    });
    params: {
        limit?: number | undefined;
        language?: string | undefined;
        abbrv?: number | undefined;
        roadinfo?: number | undefined;
        key: string;
    };
    get endpoint(): string;
    /**
     * @param {string|OpenCageForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | OpenCageForwardQuery): Promise<object>;
    /**
     * @param {OpenCageReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: OpenCageReverseQuery): Promise<object>;
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
        streetName: any;
        streetNumber: any;
        extra: {
            confidence: number;
            confidenceKm: any;
        };
    };
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
export type OpenCageForwardQuery = {
    /**
     * -
     */
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    abbrv?: number | undefined;
    bounds?: number[] | undefined;
    proximity?: number[] | undefined;
    roadinfo?: number | undefined;
};
export type OpenCageReverseQuery = {
    /**
     * latitude
     */
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    /**
     * longitude
     */
    lng: number;
    /**
     * Maximum number of results to be returned
     */
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    abbrv?: number | undefined;
    roadinfo?: number | undefined;
};
import { AbstractGeocoder } from './abstract.js';
