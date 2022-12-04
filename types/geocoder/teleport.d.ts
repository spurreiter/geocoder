/**
 * @typedef {object} TeleportForwardQuery
 * @property {string} address
 */
/**
 * @typedef {object} TeleportReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 */
/**
 * with Teleport geocoder only cities can by found but no addresses
 */
export class TeleportGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developers.teleport.org/api/resources/
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     */
    constructor(adapter: fetchAdapterFn, options?: object);
    params: any;
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @param {string|TeleportForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query: string | TeleportForwardQuery): Promise<object>;
    /**
     * @param {TeleportReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: TeleportReverseQuery): Promise<object>;
    _formatResult(cityRelationName: any, result: any): {
        latitude: any;
        longitude: any;
        city: any;
        country: any;
        countryCode: any;
        state: any;
        stateCode: any;
        extra: {
            urbanArea: any;
            urbanAreaApiUrl: any;
            urbanAreaWebUrl: any;
        };
    };
}
export type fetchAdapterFn = import('../adapter.js').fetchAdapterFn;
export type TeleportForwardQuery = {
    address: string;
};
export type TeleportReverseQuery = {
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
