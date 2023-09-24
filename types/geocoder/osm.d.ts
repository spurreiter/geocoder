/**
 * @typedef {object} OsmForwardQuery
 * @property {string} address -
 * @property {number} [limit=10] Maximum number of results to be returned
 * @property {string} [language]
 * @property {number} [addressdetails]
 * @property {number} [extratags]
 * @property {number} [countrycodes]
 * @property {string[]} [viewbox]
 * @property {number} [bounded]
 * @property {string} [email]
 * @property {number} [dedupe]
 */
/**
 * @typedef {object} OsmReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=10] Maximum number of results to be returned
 * @property {string} [language]
 * @property {number} [addressdetails]
 * @property {number} [extratags]
 * @property {number} [namedetails]
 * @property {number} [zoom]
 * @property {string} [email]
 */
export class OsmGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://nominatim.org/release-docs/develop/api/Search/
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {number} [options.limit=10]
     * @param {string} [options.language]
     * @param {number} [options.addressdetails]
     * @param {number} [options.extratags]
     * @param {number} [options.countrycodes]
     * @param {string} [options.email]
     * @param {number} [options.dedupe]
     * @param {string} [options.endpoint] custom endpoint
     * @param {string} [options.revEndpoint] custom reverse endpoint
     */
    constructor(adapter: fetchAdapterFn, options?: {
        limit?: number | undefined;
        language?: string | undefined;
        addressdetails?: number | undefined;
        extratags?: number | undefined;
        countrycodes?: number | undefined;
        email?: string | undefined;
        dedupe?: number | undefined;
        endpoint?: string | undefined;
        revEndpoint?: string | undefined;
    });
    endpoint: string;
    revEndpoint: string;
    params: {
        format: string;
        addressdetails: number;
        limit?: number | undefined;
        language?: string | undefined;
        extratags?: number | undefined;
        countrycodes?: number | undefined;
        email?: string | undefined;
        dedupe?: number | undefined;
    };
    /**
     * @param {string|OsmForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | OsmForwardQuery): Promise<object>;
    /**
     * @param {OsmReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: OsmReverseQuery): Promise<object>;
    _formatResult(result?: {}): {
        formattedAddress: any;
        latitude: number;
        longitude: number;
        country: any;
        countryCode: any;
        state: any;
        county: any;
        city: any;
        zipcode: any;
        district: any;
        streetName: any;
        streetNumber: any;
        neighbourhood: any;
        extra: {
            id: any;
            confidence: number;
            bbox: number[] | undefined;
        };
    };
}
export type fetchAdapterFn = import('../adapter.js').fetchAdapterFn;
export type OsmForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
    language?: string | undefined;
    addressdetails?: number | undefined;
    extratags?: number | undefined;
    countrycodes?: number | undefined;
    viewbox?: string[] | undefined;
    bounded?: number | undefined;
    email?: string | undefined;
    dedupe?: number | undefined;
};
export type OsmReverseQuery = {
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
    addressdetails?: number | undefined;
    extratags?: number | undefined;
    namedetails?: number | undefined;
    zoom?: number | undefined;
    email?: string | undefined;
};
import { AbstractGeocoder } from './abstract.js';
