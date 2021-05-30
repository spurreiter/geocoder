/**
 * @typedef {object} LocalGeoip2ForwardQuery
 * @property {string} address
 * @property {string} [language=en]
 */
/**
 * run your local maxmind geoip2 server e.g. with @maxmind/geoip2-node npm module
 */
export class LocalGeoip2Geocoder extends AbstractGeocoder {
    /**
     * available options
     * @param {function} adapter
     * @param {object} options
     * @param {string} [endpoint=http://localhost:3000/city]
     */
    constructor(adapter: Function, options?: object);
    endpoint: any;
    params: any;
    supportIPv4: boolean;
    supportIPv6: boolean;
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
export type LocalGeoip2ForwardQuery = {
    address: string;
    language?: string;
};
import { AbstractGeocoder } from "./abstract";
