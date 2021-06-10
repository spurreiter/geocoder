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
     * @param {function} adapter
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
    constructor(adapter: Function, options?: {
        limit?: number;
        language?: string;
        addressdetails?: number;
        extratags?: number;
        countrycodes?: number;
        email?: string;
        dedupe?: number;
        endpoint?: string;
        revEndpoint?: string;
    });
    endpoint: string;
    revEndpoint: string;
    params: {
        format: string;
        addressdetails: number;
        limit?: number;
        language?: string;
        extratags?: number;
        countrycodes?: number;
        email?: string;
        dedupe?: number;
    };
    get endpoint(): string;
    get revEndpoint(): string;
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
            confidence: any;
            bbox: number[];
        };
    };
}
export type OsmForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
    language?: string;
    addressdetails?: number;
    extratags?: number;
    countrycodes?: number;
    viewbox?: string[];
    bounded?: number;
    email?: string;
    dedupe?: number;
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
    limit?: number;
    language?: string;
    addressdetails?: number;
    extratags?: number;
    namedetails?: number;
    zoom?: number;
    email?: string;
};
import { AbstractGeocoder } from "./abstract";
