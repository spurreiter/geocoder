import { Response } from "./adapter";

export interface AdapterOptions {
  /**
   * adapter timeout in milliseconds
   * @default 10000
   */
  timeout?: number;
  /**
   * default headers to be included in every request
   */
  headers?: object;
}

export function fetchAdapterFn(url: string | object, options?: object | any): Promise<Response>;

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
    /** provider id */
    id?: string | number;
    /** Indicates for each result how good the result matches to the original query `[0 .. 1]` */
    confidence?: number;
    /** bounding box of the result object */
    bbox?: number[];
    /** any other keys */
    [key: string]: any;
  };
};

export interface CircuitBreakerOptions {
  /**
   * timeout for broken circuit in ms
   * @default 60000
   */
  timeout?: number;
  /**
   * status codes which shall be excluded from breaking the connection
   * @default [400, 404, 422]
   */
  excludeStatusCode?: number[];
}

export interface CascadeOptions extends CircuitBreakerOptions {
  /**
   * add provider info to each result
   * @default: true
   */
  addProvider?: boolean;
}

export interface CombineOptions extends CircuitBreakerOptions {
  /**
   * add provider info to each result
   * @default: true
   */
  addProvider?: boolean;
}

/**
 * @see https://github.com/geocoders/geocodejson-spec
 */
export interface GeoJsonFeatureCollection {
  type: "FeatureCollection";
  geocoding: {
    version: "0.1.0";
    license?: string;
    attribution?: string;
    query?: string;
  },
  features: GeoJsonFeature[];
}

export interface GeoJsonFeature {
  type: string;
  bbox?: number[];
  geometry: {
    type: string;
    /** longitude, latitude */
    coordinates: number[]
  }
  properties: {
    geocoding: {
      label?: string;
      type?: string;
      country?: string;
      state?: string;
      district?: string;
      county?: string;
      city?: string;
      postcode?: string;
      locality?: string;
      street?: string;
      housenumber?: string;
      // extra
      confidence?: number;
      [key: string]: any;
    }
  },
}

interface GeoJsonGeocoding {
  license?: string;
  attribution?: string;
  query?: string;
}

export class HttpError extends Error {
  /** HTTP status code */
  status: number;
  /** HTTP Response */
  response: Response;
}

export class CircuitBreakerError extends Error {
  /** HTTP status code */
  status: number;
  /** provider name */
  provider: string;
}
