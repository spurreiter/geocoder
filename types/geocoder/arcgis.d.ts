/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
 * @typedef {object} ArcGisForwardQuery
 * @property {string} address
 * @property {number} [limit]
 * @property {string} [category] see https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer?f=pjson for list of values
 * @property {string} [preferredLabelValues]
 * @property {string} [language]
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
 * @property {string} [language]
 */
export class ArcGisGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit]
     * @param {string} [options.language]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        apiKey: string;
        limit?: number | undefined;
        language?: string | undefined;
    });
    params: {
        langCode: string | undefined;
        maxLocations: number | undefined;
        f: string;
        token: string;
    };
    get endpoint(): string;
    get revEndpoint(): string;
    /**
     * @param {string|ArcGisForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query?: string | ArcGisForwardQuery): Promise<object>;
    /**
     * @param {ArcGisReverseQuery} query
     * @returns {Promise<object>}
     */
    _reverse(query: ArcGisReverseQuery): Promise<object>;
    /**
     * format forward geocoding results
     * @param {object} result
     * @returns {object}
     */
    _formatResult(language: any, result: object): object;
    /**
     * format reverse search result
     * @param {object} result
     * @returns {object}
     */
    _formatResultRev(language: any, result: object): object;
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
/**
 * see https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
 */
export type ArcGisForwardQuery = {
    address: string;
    limit?: number | undefined;
    /**
     * see https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer?f=pjson for list of values
     */
    category?: string | undefined;
    preferredLabelValues?: string | undefined;
    language?: string | undefined;
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
    limit?: number | undefined;
    returnIntersection?: boolean | undefined;
    locationType?: string | undefined;
    preferredLabelValues?: string | undefined;
    language?: string | undefined;
};
import { AbstractGeocoder } from './abstract.js';
