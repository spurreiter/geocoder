/** @typedef {import('#geocoder/abstract.js').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('#types.js').CascadeOptions} CascadeOptions */
/** @typedef {import('#types.js').ForwardQuery} ForwardQuery */
/** @typedef {import('#types.js').ReverseQuery} ReverseQuery */
/** @typedef {import('#types.js').GeocoderResult} GeocoderResult */
export class Cascade {
    /**
     * @param {AbstractGeocoder[]} geocoders
     * @param {CascadeOptions} [options]
     */
    constructor(geocoders: AbstractGeocoder[], options?: CascadeOptions);
    coders: CircuitBreaker[];
    addProvider: boolean;
    _method(query: any, method: any): Promise<any>;
    /**
     * @param {string|ForwardQuery} query
     * @returns {Promise<GeocoderResult[]>}
     */
    forward(query: string | ForwardQuery): Promise<GeocoderResult[]>;
    /**
     * @param {string|ReverseQuery} query
     * @returns {Promise<GeocoderResult[]>}
     */
    reverse(query: string | ReverseQuery): Promise<GeocoderResult[]>;
}
export type AbstractGeocoder = import("#geocoder/abstract.js").AbstractGeocoder;
export type CascadeOptions = import("#types.js").CascadeOptions;
export type ForwardQuery = import("#types.js").ForwardQuery;
export type ReverseQuery = import("#types.js").ReverseQuery;
export type GeocoderResult = import("#types.js").GeocoderResult;
import { CircuitBreaker } from './circuitbreaker.js';
