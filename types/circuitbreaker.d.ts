export class CircuitBreaker {
    /**
     * @param {AbstractGeocoder} geocoder
     * @param {CircuitBreakerOptions} param1
     */
    constructor(geocoder: AbstractGeocoder, { timeout, excludeStatusCode }?: CircuitBreakerOptions);
    geocoder: import("./geocoder/abstract").AbstractGeocoder;
    timeout: number;
    excludeStatusCode: number[];
    offlineUntil: number;
    name: string;
    /**
     * @private
     */
    private _checkOffline;
    /**
     * @private
     */
    private _turnOff;
    /**
     * @param {ForwardQuery} query
     * @returns {Promise<GeocoderResult[]>}
     */
    forward(query: ForwardQuery): Promise<GeocoderResult[]>;
    /**
     * @param {ReverseQuery} query
     * @returns {Promise<GeocoderResult[]>}
     */
    reverse(query: ReverseQuery): Promise<GeocoderResult[]>;
}
export type AbstractGeocoder = import("./geocoder/abstract").AbstractGeocoder;
export type CircuitBreakerError = import("./types").CircuitBreakerError;
export type CircuitBreakerOptions = import("./types").CircuitBreakerOptions;
export type ForwardQuery = import("./types").ForwardQuery;
export type ReverseQuery = import("./types").ReverseQuery;
export type GeocoderResult = import("./types").GeocoderResult;
