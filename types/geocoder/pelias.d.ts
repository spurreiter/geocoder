/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */
/**
 * @typedef {object} PeliasForwardQuery
 * @property {string} address
 */
/**
 * @typedef {object} PeliasReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 */
export class PeliasGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://github.com/pelias/documentation/blob/master/README.md
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} [options.origin='https://api.geocode.earth'] protocol + hostname for server
     */
    constructor(adapter: fetchAdapterFn, options?: {
        origin?: string | undefined;
    });
    _endpoint: string;
    _revEndpoint: string;
    params: {};
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @param {string|PeliasForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | PeliasForwardQuery): Promise<object>;
    /**
     * @param {PeliasReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: PeliasReverseQuery): Promise<object>;
    _formatResult(result?: {}): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: string;
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
export type fetchAdapterFn = import('../adapter.js').fetchAdapterFn;
export type PeliasForwardQuery = {
    address: string;
};
export type PeliasReverseQuery = {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lng: number;
};
import { AbstractGeocoder } from "./abstract.js";
