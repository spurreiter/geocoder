/** @typedef {import('./geocoder/abstract').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('./types').CombineOptions} CombineOptions */
/** @typedef {import('./types').ForwardQuery} ForwardQuery */
/** @typedef {import('./types').ReverseQuery} ReverseQuery */
/** @typedef {import('./types').GeocoderResult} GeocoderResult */
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
export type AbstractGeocoder = import('./geocoder/abstract').AbstractGeocoder;
export type CombineOptions = import('./types').CombineOptions;
export type ForwardQuery = import('./types').ForwardQuery;
export type ReverseQuery = import('./types').ReverseQuery;
export type GeocoderResult = import('./types').GeocoderResult;
import { CircuitBreaker } from "./circuitbreaker.js";
