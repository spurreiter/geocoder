/** @typedef {import('../adapter.js').fetchAdapterFn} fetchAdapterFn */
/** @typedef {import('#types.js').ForwardQuery} ForwardQuery */
/** @typedef {import('#types.js').ReverseQuery} ReverseQuery */
/** @typedef {import('#types.js').GeocoderResult} GeocoderResult */
export class AbstractGeocoder {
    /**
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     * @param {boolean} [options.raw] append raw response to results
     */
    constructor(adapter: fetchAdapterFn, options?: {
        raw?: boolean | undefined;
    });
    adapter: typeof import("#types.js").fetchAdapterFn;
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
    protected wrapRaw(results: any | undefined, body: object): any[];
    /**
     * forward geocoding
     * @protected
     * @param {string|ForwardQuery} _query address string or ip address
     * @param {boolean} [_isIP]
     * @returns {Promise<GeocoderResult[]>}
     */
    protected _forward(_query: string | ForwardQuery, _isIP?: boolean): Promise<GeocoderResult[]>;
    /**
     * reverse geocoding
     * @protected
     * @param {string|ReverseQuery} _query
     * @returns {Promise<GeocoderResult[]>}
     */
    protected _reverse(_query: string | ReverseQuery): Promise<GeocoderResult[]>;
}
export type fetchAdapterFn = import("../adapter.js").fetchAdapterFn;
export type ForwardQuery = import("#types.js").ForwardQuery;
export type ReverseQuery = import("#types.js").ReverseQuery;
export type GeocoderResult = import("#types.js").GeocoderResult;
