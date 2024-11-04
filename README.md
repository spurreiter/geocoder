[![CI](https://github.com/spurreiter/geocoder/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/spurreiter/geocoder/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@spurreiter%2Fgeocoder.svg)](https://www.npmjs.com/package/@spurreiter/geocoder)
[![Downloads per month](https://img.shields.io/npm/dm/@spurreiter/geocoder)](https://www.npmjs.com/package/@spurreiter/geocoder)

# geocoder  

This project is derived from
[node-geocoder](https://github.com/nchaulet/node-geocoder) with focus on modern
code with esm modules.

Features:
- multiple providers
- similar results for all providers
- modern code based on esm modules and native Promises with async/ await
- Typescript types
- http(s) agent by default for reusing tcp connections
- fetch based http adapter with timeout
- cascade providers and stop on first successful result
- combine search results from multiple providers
- configurable circuit breaker which stops calling geocoder e.g. if request
  limit is exhausted.
- extensive test-suite with examples for getting started
- GeoJSON, GPX formatters

## supported providers

| Provider                                                                                        | forward | reverse | ip | Notes                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------- | :-----: | :-----: | :-: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ArcGisGeocoder](https://developers.arcgis.com/documentation/mapping-apis-and-services/search/) |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |
| [BingMapsGeocoder](https://docs.microsoft.com/en-us/bingmaps/rest-services/locations)           |    ✅    |    ✅    | ❌  | results are in English only                                                                                                                                       |
| [GoogleGeocoder](https://developers.google.com/maps/documentation/geocoding/overview)           |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |
| [GeocodioGeocoder](https://www.geocod.io/docs/)                                                 |    ✅    |    ✅    | ❌  | results are in English only; Country must be part of query, otherwise fallback to US; [Only US and major cities in CA supported](https://www.geocod.io/coverage/) |
| [HereGeocoder](https://developer.here.com/)                                                     |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |
| [IpStackGeocoder](https://ipstack.com/)                                                         |    ❌    |    ❌    | ✅  |                                                                                                                                                                   |
| [LocationIqGeocoder](https://locationiq.com/docs)                                               |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |
| [GeoLite2Geocoder](https://dev.maxmind.com/geoip/geoip2/geolite2/)                              |    ❌    |    ❌    | ✅  | Local GeoLite2 provider or MaxMind API. Output as of [@maxmind/geoip2-node](https://www.npmjs.com/package/@maxmind/geoip2-node)                                   |
| [MapBoxGeocoder](https://docs.mapbox.com/)                                                      |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |
| [MapQuestGeocoder](https://developer.mapquest.com/documentation/geocoding-api)                  |    ✅    |    ✅    | ❌  | open-data and licensed versions are supported                                                                                                                     |
| [OpenCageGeocoder](https://opencagedata.com/)                                                   |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |
| [OpendataFranceGeocoder](https://geo.api.gouv.fr/adresse)                                       |    ✅    |    ✅    | ❌  | France only                                                                                                                                                       |
| [OpenMapQuest](https://developer.mapquest.com/documentation/open/nominatim-search/)             |    ✅    |    ✅    | ❌  | Search Results based on OSM                                                                                                                                       |
| [OsmGeocoder](https://nominatim.org/release-docs/develop/)                                      |    ✅    |    ✅    | ❌  | Searches nominatim.org                                                                                                                                            |
| [PeliasGeocoder](https://github.com/pelias/documentation/blob/master/README.md)                 |    ✅    |    ✅    | ❌  | Local or [Geocode.earth](https://geocode.earth/docs)                                                                                                              |
| [PickpointGeocoder](https://pickpoint.io/api-reference)                                         |    ✅    |    ✅    | ❌  | Search Results based on OSM                                                                                                                                       |
| [TomTomGeocoder](https://developer.tomtom.com/)                                                 |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |
| [YandexGeocoder](https://yandex.com/dev/maps/geocoder/)                                         |    ✅    |    ✅    | ❌  |                                                                                                                                                                   |

## usage

### forward geocoding

```js
import { fetchAdapter, OsmGeocoder } from '@spurreiter/geocoder'

const adapter = fetchAdapter()
const geocoder = new OsmGeocoder(adapter, 
  { language: 'en', limit: 5, referer: 'https://mysite' })

const results = await geocoder.forward('135 pilkington avenue, birmingham')
// [
//   {
//     formattedAddress: '135, Pilkington Avenue, Maney, Sutton Coldfield, Wylde Green, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom',
//     latitude: 52.5487921,
//     longitude: -1.8164308339635031,
//     country: 'United Kingdom',
//     countryCode: 'GB',
//     state: 'England',
//     county: 'West Midlands Combined Authority',
//     city: 'Birmingham',
//     zipcode: 'B72 1LH',
//     district: 'West Midlands',
//     streetName: 'Pilkington Avenue',
//     streetNumber: '135',
//     neighbourhood: undefined,
//     extra: {
//       id: 90394480,
//       confidence: 0.411,
//       bbox: [ -1.816513, 52.5487473, -1.8163464, 52.5488481 ]
//     }
//   }
// ]
```

### reverse geocoding

```js
const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })
// [
//   {
//     formattedAddress: '279, Bedford Avenue, Williamsburg, Brooklyn, Kings County, New York, 11211, United States',
//     latitude: 40.714205,
//     longitude: -73.96131519274765,
//     country: 'United States',
//     countryCode: 'US',
//     state: 'New York',
//     county: undefined,
//     city: 'New York',
//     zipcode: '11211',
//     district: undefined,
//     streetName: 'Bedford Avenue',
//     streetNumber: '279',
//     neighbourhood: undefined,
//     extra: {
//       id: 279767984,
//       confidence: 0,
//       bbox: [ -73.9613744, 40.7141617, -73.961256, 40.7142482 ]
//     }
//   }
// ]
```

### cascade

Allows to sequentially ask various geocoders for results. Successful results
from the first geocoder are returned.

Works with forward and reverse geocoding.

```js
import { Cascade, fetchAdapter, HereGeocoder, OsmGeocoder } from '@spurreiter/geocoder'

const language = "es"
const geocoders = [
  new HereGeocoder(adapter, { apiKey: 'your-api-key', language }),
  new OsmGeocoder(adapter, { language, referer: 'https://mysite' })
]
const cascade = new Cascade(geocoders)

const results = await cascade.forward('135 pilkington avenue, birmingham')

// results contains data from 1st geocoder which responds without error.
```

### combine

Combine results from various geocoders into one result set.

Works with forward and reverse geocoding.

```js
import { Combine, fetchAdapter, HereGeocoder, OsmGeocoder } from '@spurreiter/geocoder'

const geocoders = [
  new HereGeocoder(adapter, { apiKey: 'your-api-key' }),
  new OsmGeocoder(adapter, { referer: 'https://mysite' })
]
const combine = new Combine(geocoders)

const results = await combine.forward(
    { address: '135 pilkington avenue, birmingham', language: 'es' })

// results contains data from all reachable geocoders.
```

## formatters

Formatters allow to format the geocoder result object to various formats like
geoJson or gpx.

### geoJsonFormatter

The output of the GeoJSON formatter is according to
[RFC-7946](https://datatracker.ietf.org/doc/html/rfc7946) and
[geocodejson-spec](https://github.com/geocoders/geocodejson-spec).

```js
import { geoJsonFormatter } from '@spurreiter/geocoder'

const query = '135 pilkington avenue, birmingham'
const results = await geocoder.forward(query)

const geoJson = geoJsonFormatter(results, {query})
// {
//   type: 'FeatureCollection',
//   geocoding: {
//     version: '0.1.0',
//     license: null,
//     attribution: null,
//     query: '135 pilkington avenue, birmingham'
//   },
//   features: [{...}, ...]
// }
```

### gpxFormatter

```js
import { gpxFormatter } from '@spurreiter/geocoder'

const query = '135 pilkington avenue, birmingham'
const results = await geocoder.forward(query)

const gpx = gpxFormatter(results)
// <?xml version="1.0" encoding="UTF-8"?>
// <gpx version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
// <wpt lat="52.5487921" lon="-1.8164308339635031"><name>135, Pilkington Avenue, Maney, Sutton Coldfield, Wylde Green, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom</name></wpt>
// </gpx>
```

## contributing

If you are missing a provider, which should be part of this project, please
consider forking this project and filing a pull-request.

## license

[MIT licensed](./LICENSE)
