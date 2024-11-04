/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */
/**
 * see https://geo.api.gouv.fr/adresse
 * @typedef {object} OpendataFranceForwardQuery
 * @property {string} address
 * @property {number} [limit=5] Maximum number of results to be returned
 */
/**
 * see https://geo.api.gouv.fr/adresse
 * @typedef {object} OpendataFranceReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit=5] Maximum number of results to be returned
 */
export class OpendataFranceGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://api.gouv.fr/les-api/base-adresse-nationale
     * @see https://geo.api.gouv.fr/adresse
     * @param {fetchAdapterFn} adapter
     * @param {object} [options]
     * @param {number} [options.limit]
     * @param {string} [options.language]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        limit?: number | undefined;
        language?: string | undefined;
    } | undefined);
    params: {
        limit?: number | undefined;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @param {string|OpendataFranceForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | OpendataFranceForwardQuery): Promise<object>;
    /**
     * @param {OpendataFranceReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: OpendataFranceReverseQuery): Promise<object>;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: string;
        countryCode: string;
        state: any;
        city: any;
        zipcode: any;
        citycode: any;
        extra: {
            id: any;
            confidence: number;
        };
    };
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
/**
 * see https://geo.api.gouv.fr/adresse
 */
export type OpendataFranceForwardQuery = {
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number | undefined;
};
/**
 * see https://geo.api.gouv.fr/adresse
 */
export type OpendataFranceReverseQuery = {
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
};
import { AbstractGeocoder } from './abstract.js';
