export class CircuitBreaker {
    /**
     * @param {AbstractGeocoder} geocoder
     * @param {CircuitBreakerOptions} param1
     */
    constructor(geocoder: AbstractGeocoder, { timeout, excludeStatusCode }?: CircuitBreakerOptions);
    geocoder: import("#geocoder/abstract.js").AbstractGeocoder;
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
export type AbstractGeocoder = import("#geocoder/abstract.js").AbstractGeocoder;
export type CircuitBreakerError = import("#types.js").CircuitBreakerError;
export type CircuitBreakerOptions = import("#types.js").CircuitBreakerOptions;
export type ForwardQuery = import("#types.js").ForwardQuery;
export type ReverseQuery = import("#types.js").ReverseQuery;
export type GeocoderResult = import("#types.js").GeocoderResult;
