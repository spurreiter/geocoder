/** @typedef {import('../adapter').fetchAdapterFn} fetchAdapterFn */
/** @typedef {import('../types').ForwardQuery} ForwardQuery */
/** @typedef {import('../types').ReverseQuery} ReverseQuery */
/** @typedef {import('../types').GeocoderResult} GeocoderResult */
export class AbstractGeocoder {
    /**
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {boolean} [options.raw] append raw response to results
     */
    constructor(adapter: fetchAdapterFn, options?: {
        raw?: boolean | undefined;
    });
    adapter: typeof import("../types").fetchAdapterFn;
    raw: boolean;
    _name: string;
    supportIPv4: boolean;
    supportIPv6: boolean;
    /**
     * name of geocoder
     */
    get name(): string;
    /**
     * forward geocoding
     * @param {string|ForwardQuery} query address string or ip address
     * @returns {Promise<GeocoderResult[]>}
     */
    forward(query: string | ForwardQuery): Promise<GeocoderResult[]>;
    /**
     * reverse geocoding
     * @param {string|ReverseQuery} query
     * @returns {Promise<GeocoderResult[]>}
     */
    reverse(query: string | ReverseQuery): Promise<GeocoderResult[]>;
    /**
     * creates a Url with search params
     * @protected
     * @param {string} url
     * @param {object} params
     * @returns {string}
     */
    protected createUrl(url: string, params: object): string;
    /**
     * creates a search params string
     * @protected
     * @param {object} params
     * @returns {string}
     */
    protected createSearch(params: object): string;
    /**
     * @typedef {Array} WrappedResults
     * @property {any} raw
     */
    /**
     * wraps raw response on results object
     * @protected
     * @param {any} results
     * @param {object} body
     * @returns {WrappedResults}
     */
    protected wrapRaw(results: any, body: object): any[];
    /**
     * forward geocoding
     * @protected
     * @param {string|ForwardQuery} query address string or ip address
     * @param {boolean} [isIP]
     * @returns {Promise<GeocoderResult[]>}
     */
    protected _forward(query: string | ForwardQuery, isIP?: boolean | undefined): Promise<GeocoderResult[]>;
    /**
     * reverse geocoding
     * @protected
     * @param {string|ReverseQuery} query
     * @returns {Promise<GeocoderResult[]>}
     */
    protected _reverse(query: string | ReverseQuery): Promise<GeocoderResult[]>;
}
export type fetchAdapterFn = import('../adapter').fetchAdapterFn;
export type ForwardQuery = import('../types').ForwardQuery;
export type ReverseQuery = import('../types').ReverseQuery;
export type GeocoderResult = import('../types').GeocoderResult;
