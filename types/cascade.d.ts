/** @typedef {import('./geocoder/abstract').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('./types').CascadeOptions} CascadeOptions */
/** @typedef {import('./types').ForwardQuery} ForwardQuery */
/** @typedef {import('./types').ReverseQuery} ReverseQuery */
/** @typedef {import('./types').GeocoderResult} GeocoderResult */
export class Cascade {
    /**
     * @param {AbstractGeocoder[]} geocoders
     * @param {CascadeOptions} options
     */
    constructor(geocoders: AbstractGeocoder[], options?: CascadeOptions);
    coders: CircuitBreaker[];
    addProvider: boolean;
    _method(query: any, method: any): Promise<any>;
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
export type AbstractGeocoder = import('./geocoder/abstract').AbstractGeocoder;
export type CascadeOptions = import('./types').CascadeOptions;
export type ForwardQuery = import('./types').ForwardQuery;
export type ReverseQuery = import('./types').ReverseQuery;
export type GeocoderResult = import('./types').GeocoderResult;
import { CircuitBreaker } from "./circuitbreaker.js";
