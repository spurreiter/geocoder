import { GeocoderResult } from '../geocoder/abstract';

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
    type: "Feature";
    bbox?: number[];
    geometry: {
        type: "Point";
        coordinates: [
            longitude: number,
            latitude: number
        ]
    }
    properties: {
        geocoding: {
            label: string;
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

export function geoJsonFormatter(results: GeocoderResult[], options: GeoJsonGeocoding): GeoJsonFeatureCollection;
