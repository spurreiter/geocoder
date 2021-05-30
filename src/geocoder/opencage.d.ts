export class OpenCageGeocoder extends AbstractGeocoder {
    /**
     * available options
     * @see https://opencagedata.com/api#quickstart
     * @param {function} adapter
     * @param {object} options
     * @param {string} options.apiKey
     * @param {number} [options.limit=10]
     * @param {string} [options.language]
     * @param {number} [options.abbrv]
     * @param {number} [options.roadinfo]
     */
    constructor(adapter: Function, options?: {
        apiKey: string;
        limit?: number;
        language?: string;
        abbrv?: number;
        roadinfo?: number;
    });
    params: any;
    get endpoint(): string;
    _formatResult(result: any): {
        formattedAddress: any;
        latitude: any;
        longitude: any;
        country: any;
        countryCode: any;
        state: any;
        county: any;
        city: any;
        zipcode: any;
        streetName: any;
        streetNumber: any;
        extra: {
            confidence: number;
            confidenceKm: any;
        };
    };
}
export type OpenCageForwardQuery = {
    /**
     * -
     */
    address: string;
    /**
     * - Maximum number of results to be returned
     */
    limit?: number;
    language?: string;
    abbrv?: number;
    bounds?: number[];
    proximity?: number[];
    roadinfo?: number;
};
export type OpenCageReverseQuery = {
    /**
     * - latitude
     */
    lat: number;
    /**
     * - longitude
     */
    lng: number;
    /**
     * - Maximum number of results to be returned
     */
    limit?: number;
    language?: string;
    abbrv?: number;
    roadinfo?: number;
};
import { AbstractGeocoder } from "./abstract";
