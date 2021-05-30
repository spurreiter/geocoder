import { GeocoderResult } from '../geocoder/abstract';

export interface GeoJsonFeatureCollection {
    type: "FeatureCollection";
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

export function geoJsonFormatter(results: GeocoderResult[]): GeoJsonFeatureCollection;
