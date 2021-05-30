/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
 * @typedef {object} ArcGisForwardQuery
 * @property {string} address
 * @property {number} [limit]
 * @property {string} [category] see https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer?f=pjson for list of values
 * @property {string} [preferredLabelValues]
 */
/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm
 * @typedef {object} ArcGisReverseQuery
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {number} [limit]
 * @property {boolean} [returnIntersection]
 * @property {string} [locationType]
 * @property {string} [preferredLabelValues]
 */
export class ArcGisGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [limit]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
    });
    params: {
        langCode: any;
        maxLocations: any;
        f: string;
        token: string;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * format forward geocoding results
     * @param {object} result
     * @returns {object}
     */
    _formatResult(result: object): object;
    /**
     * format reverse search result
     * @param {object} result
     * @returns {object}
     */
    _formatResultRev(result: object): object;
}
/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
 */
export type ArcGisForwardQuery = {
    address: string;
    limit?: number;
    /**
     * see https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer?f=pjson for list of values
     */
    category?: string;
    preferredLabelValues?: string;
};
/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm
 */
export type ArcGisReverseQuery = {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lng: number;
    limit?: number;
    returnIntersection?: boolean;
    locationType?: string;
    preferredLabelValues?: string;
};
import { AbstractGeocoder } from "./abstract";
