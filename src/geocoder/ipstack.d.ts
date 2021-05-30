export class IpStackGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://ipstack.com/documentation
     */
    constructor(adapter: any, options?: {});
    params: {
        access_key: any;
    };
    supportIPv4: boolean;
    supportIPv6: boolean;
    get endpoint(): string;
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
import { AbstractGeocoder } from "./abstract";
