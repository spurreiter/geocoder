/**
 * @typedef {object} GeoLite2ForwardQuery
 * @property {string} address
 * @property {string} [language=en]
 */
/**
 * run your local maxmind geoip2 server e.g. with @maxmind/geoip2-node npm module
 * https://dev.maxmind.com/geoip/docs/web-services/requests#geolite2-endpoints
 */
export class GeoLite2Geocoder extends AbstractGeocoder {
    /**
     * available options
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {string} [options.endpoint='https://geolite.info/geoip/v2.1/city']
     * @param {string} [options.accountId] MaxMind account ID
     * @param {string} [options.apiKey] MaxMind license key
     * @param {string} [options.language]
     */
    constructor(adapter: fetchAdapterFn, options?: {
        endpoint?: string | undefined;
        accountId?: string | undefined;
        apiKey?: string | undefined;
        language?: string | undefined;
    });
    endpoint: string;
    params: {
        language?: string | undefined;
    };
    opts: {
        headers: {
            authorization: string;
        };
    } | undefined;
    /**
     * @param {string|GeoLite2ForwardQuery} query
     * @returns {Promise<object>}
     */
    _forward(query?: string | GeoLite2ForwardQuery): Promise<object>;
    _formatResult(language: any, result?: {}): {
        ip: any;
        latitude: any;
        longitude: any;
        countryCode: any;
        country: any;
        extra: {
            id: any;
            accuracyRadius: any;
            isInEuropeanUnion: any;
            timeZone: any;
            network: any;
        };
    };
}
export type fetchAdapterFn = import('../adapter.js').fetchAdapterFn;
export type GeoLite2ForwardQuery = {
    address: string;
    language?: string | undefined;
};
import { AbstractGeocoder } from './abstract.js';
