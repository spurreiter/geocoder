/** @typedef {import('#geocoder/abstract.js').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('#types.js').CombineOptions} CombineOptions */
/** @typedef {import('#types.js').ForwardQuery} ForwardQuery */
/** @typedef {import('#types.js').ReverseQuery} ReverseQuery */
/** @typedef {import('#types.js').GeocoderResult} GeocoderResult */
export class Combine {
    /**
     * @param {AbstractGeocoder[]} geocoders
     * @param {CombineOptions} options
     */
    constructor(geocoders: AbstractGeocoder[], options?: CombineOptions);
    coders: CircuitBreaker[];
    addProvider: boolean;
    /**
     * @private
     */
    private _method;
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
export type CombineOptions = import("#types.js").CombineOptions;
export type ForwardQuery = import("#types.js").ForwardQuery;
export type ReverseQuery = import("#types.js").ReverseQuery;
export type GeocoderResult = import("#types.js").GeocoderResult;
import { CircuitBreaker } from './circuitbreaker.js';
