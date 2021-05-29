import { AbstractGeocoder, ForwardQuery, ReverseQuery, GeocoderResult } from "./geocoder/abstract";
import { CircuitBreakerOptions } from './circuitbreaker';

export interface CombineOptions extends CircuitBreakerOptions {
  /**
   * add provider info to each result
   * @default: true
   */
  addProvider?: boolean;
}

export class Combine {
  constructor(geocoders: AbstractGeocoder[], options?: CombineOptions);

  forward(query: ForwardQuery): Promise<GeocoderResult[]>;

  reverse(query: ReverseQuery): Promise<GeocoderResult[]>;
}
