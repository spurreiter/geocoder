/**
 * @typedef {object} TeleportForwardQuery
 * @property {string} address
 */
/**
 * @typedef {object} TeleportReverseQuery
 * @property {number} lat - latitude
 * @property {number} lng - longitude
 */
/**
 * with Teleport geocoder only cities can by found but no addresses
 */
export class TeleportGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://developers.teleport.org/api/resources/
     * @param {function} adapter
     * @param {object} options
     */
    constructor(adapter: Function, options?: object);
    params: any;
    get endpoint(): string;
    get revEndpoint(): string;
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
export type TeleportForwardQuery = {
    address: string;
};
export type TeleportReverseQuery = {
    /**
     * - latitude
     */
    lat: number;
    /**
     * - longitude
     */
    lng: number;
};
import { AbstractGeocoder } from "./abstract";
