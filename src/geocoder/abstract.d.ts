/**
 * @typedef {object} ForwardQuery
 * @property {string} address address being queried
 * @property {string} [language] search results language
 * @property {number} [limit] limit search results
 */
/**
 * @typedef {object} ReverseQuery {
 * @property {number} lat latitude
 * @property {number} lng longitude
 * @property {string} [language] search results language
 * @property {number} [limit] limit search results
 */
/**
 * @typedef {object} GeocoderResult
 * @property {number} latitude latitude of search result
 * @property {number} longitude longitude of search result
 * @property {string} [formattedAddress]
 * @property {string} [country]
 * @property {string} [countryCode] country code as ISO 3166-1 alpha-2 or ISO 3166-1 alpha-3
 * @property {string} [state]
 * @property {string} [region]
 * @property {string} [city]
 * @property {string} [zipcode]
 * @property {string} [streetName]
 * @property {string} [streetNumber]
 * @property {object} [extra]
 * @property {string|number} [extra.id]
 * @property {number} [extra.confidence] confidence [0..1] higher values = higher confidence
 * @property {number[]} [extra.bbox] bounding box as `[minLng, minLat, maxLng, maxLat]`
 */
export class AbstractGeocoder {
    /**
     * @param {fetchAdapter} adapter
     * @param {object} [options]
     * @param {boolean} [options.raw] append raw response to results
     */
    constructor(adapter: any, options?: {
        raw?: boolean;
    });
    adapter: any;
    raw: boolean;
    _name: string;
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
     * wraps raw response on results object
     * @protected
     * @param {Array} results
     * @param {object} body
     * @returns {Array}
     */
    protected wrapRaw(results: any[], body: object): any[];
    /**
     * forward geocoding
     * @protected
     * @param {string|ForwardQuery} query address string or ip address
     * @returns {Promise<GeocoderResult[]>}
     */
    protected _forward(): Promise<GeocoderResult[]>;
    /**
     * reverse geocoding
     * @protected
     * @param {string|ReverseQuery} query
     * @returns {Promise<GeocoderResult[]>}
     */
    protected _reverse(): Promise<GeocoderResult[]>;
}
export type ForwardQuery = {
    /**
     * address being queried
     */
    address: string;
    /**
     * search results language
     */
    language?: string;
    /**
     * limit search results
     */
    limit?: number;
    [key: string]: any;
};
/**
 * {
 */
export type ReverseQuery = {
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lng: number;
    /**
     * search results language
     */
    language?: string;
    /**
     * limit search results
     */
    limit?: number;
    [key: string]: any;
};
export type GeocoderResult = {
    /**
     * latitude of search result
     */
    latitude: number;
    /**
     * longitude of search result
     */
    longitude: number;
    formattedAddress?: string;
    country?: string;
    /**
     * country code as ISO 3166-1 alpha-2 or ISO 3166-1 alpha-3
     */
    countryCode?: string;
    state?: string;
    region?: string;
    city?: string;
    zipcode?: string;
    streetName?: string;
    streetNumber?: string;
    [key: string]: any;
    extra?: {
        id?: string | number;
        confidence?: number;
        bbox?: number[];
        [key: string]: any;
    };
};
