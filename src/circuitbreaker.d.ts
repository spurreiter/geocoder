import { AbstractGeocoder, GeocoderResult, ForwardQuery, ReverseQuery } from './geocoder/index';

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

export class CircuitBreaker {
  constructor(geocoder: AbstractGeocoder, options: CircuitBreakerOptions);

  /**
   * forward geocoding
   * @param query address string or ip address
   */
  forward(query: string | ForwardQuery): Promise<GeocoderResult[]>;

  /**
   * reverse geocoding
   */
  reverse(query: string | ReverseQuery): Promise<GeocoderResult[]>;
}
