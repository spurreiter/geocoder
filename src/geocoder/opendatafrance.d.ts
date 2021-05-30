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
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
        limit?: number;
    });
    params: {
        limit?: number;
    };
    get endpoint(): string;
    get revEndpoint(): string;
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
            confidence: any;
        };
    };
}
/**
 * see https://geo.api.gouv.fr/adresse
 */
export type OpendataFranceForwardQuery = {
    address: string;
    /**
     * Maximum number of results to be returned
     */
    limit?: number;
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
    limit?: number;
};
import { AbstractGeocoder } from "./abstract";
