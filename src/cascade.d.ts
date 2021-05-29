import { AbstractGeocoder, ForwardQuery, ReverseQuery, GeocoderResult } from "./geocoder/abstract";
import { CircuitBreakerOptions } from './circuitbreaker';

export interface CascadeOptions extends CircuitBreakerOptions {
  /**
   * add provider info to each result
   * @default: true
   */
  addProvider?: boolean;
}

export class Cascade {
  constructor(geocoders: AbstractGeocoder[], options: CascadeOptions);

  forward(query: ForwardQuery): Promise<GeocoderResult[]>;

  reverse(query: ReverseQuery): Promise<GeocoderResult[]>;
}
