export class IpStackGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://ipstack.com/documentation
     * @param {fetchAdapterFn} adapter
     * @param {object} options
     */
    constructor(adapter: fetchAdapterFn, options?: object);
    params: any;
    get endpoint(): string;
    /**
     * @param {object|string} query
     */
    _forward(query?: object | string): Promise<any[]>;
    _formatResult(result?: {}): {
        ip: any;
        latitude: any;
        longitude: any;
        countryCode: any;
        country: any;
        regionCode: any;
        regionName: any;
        city: any;
        zipcode: any;
    };
}
export type fetchAdapterFn = import('../adapter.js').fetchAdapterFn;
import { AbstractGeocoder } from './abstract.js';
