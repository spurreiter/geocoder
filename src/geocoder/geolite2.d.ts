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
     * @param {function} adapter
     * @param {object} options
     * @param {string} [options.endpoint=https://geolite.info/geoip/v2.1/city]
     * @param {string} [options.accountId] MaxMind account ID
     * @param {string} [options.apiKey] MaxMind license key
     */
    constructor(adapter: Function, options?: {
        endpoint?: string;
        accountId?: string;
        apiKey?: string;
    });
    endpoint: string;
    params: {};
    supportIPv4: boolean;
    supportIPv6: boolean;
    opts: {
        headers: {
            authorization: string;
        };
    };
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
export type GeoLite2ForwardQuery = {
    address: string;
    language?: string;
};
import { AbstractGeocoder } from "./abstract";
