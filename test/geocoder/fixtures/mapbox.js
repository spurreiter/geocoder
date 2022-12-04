export const fixtures = {
  '135 pilkington avenue, birmingham': {
    query: '135 pilkington avenue, birmingham',
    body: {
      type: 'FeatureCollection',
      query: ['1', 'champs', 'élysée', 'paris'],
      features: [
        {
          id: 'address.8526372802334154',
          type: 'Feature',
          place_type: ['address'],
          relevance: 0.861481,
          properties: { accuracy: 'point' },
          text_en: 'Rue Des Champs Élysées',
          place_name_en: '1 Rue Des Champs Élysées, 94250 Gentilly, France',
          text: 'Rue Des Champs Élysées',
          place_name: '1 Rue Des Champs Élysées, 94250 Gentilly, France',
          center: [2.33955, 48.816295],
          geometry: { type: 'Point', coordinates: [2.33955, 48.816295] },
          address: '1',
          context: [
            {
              id: 'neighborhood.8281701112046280',
              text_en: 'Plateau',
              text: 'Plateau'
            },
            {
              id: 'postcode.8958023468872490',
              text_en: '94250',
              text: '94250'
            },
            {
              id: 'place.8958023468712040',
              wikidata: 'Q640102',
              text_en: 'Gentilly',
              language_en: 'en',
              text: 'Gentilly',
              language: 'en'
            },
            {
              id: 'region.14749210607497330',
              wikidata: 'Q90',
              short_code: 'FR-75',
              text_en: 'Paris',
              language_en: 'en',
              text: 'Paris',
              language: 'en'
            },
            {
              id: 'country.19008108158641660',
              wikidata: 'Q142',
              short_code: 'fr',
              text_en: 'France',
              language_en: 'en',
              text: 'France',
              language: 'en'
            }
          ]
        },
        {
          id: 'address.4972762713479182',
          type: 'Feature',
          place_type: ['address'],
          relevance: 0.861481,
          properties: { accuracy: 'point' },
          text_en: 'Port Des Champs-Élysées',
          place_name_en: '1 Port Des Champs-Élysées, 75008 Paris, France',
          text: 'Port Des Champs-Élysées',
          place_name: '1 Port Des Champs-Élysées, 75008 Paris, France',
          center: [2.314339, 48.864193],
          geometry: { type: 'Point', coordinates: [2.314339, 48.864193] },
          address: '1',
          context: [
            {
              id: 'neighborhood.7123338217329640',
              wikidata: 'Q3413229',
              text_en: 'Champs-Élysées',
              language_en: 'en',
              text: 'Champs-Élysées',
              language: 'en'
            },
            {
              id: 'postcode.12225346547695750',
              text_en: '75008',
              text: '75008'
            },
            {
              id: 'locality.12225346547301010',
              wikidata: 'Q270230',
              text_en: '8th arrondissement of Paris',
              language_en: 'en',
              text: '8th arrondissement of Paris',
              language: 'en'
            },
            {
              id: 'place.14749210607497330',
              wikidata: 'Q90',
              short_code: 'FR-75',
              text_en: 'Paris',
              language_en: 'en',
              text: 'Paris',
              language: 'en'
            },
            {
              id: 'country.19008108158641660',
              wikidata: 'Q142',
              short_code: 'fr',
              text_en: 'France',
              language_en: 'en',
              text: 'France',
              language: 'en'
            }
          ]
        },
        {
          id: 'address.8428062523983924',
          type: 'Feature',
          place_type: ['address'],
          relevance: 0.808593,
          properties: { accuracy: 'interpolated' },
          text_en: 'Rue Des Champs Elysées',
          place_name_en: '1 Rue Des Champs Elysées, 72000 Le Mans, France',
          text: 'Rue Des Champs Elysées',
          place_name: '1 Rue Des Champs Elysées, 72000 Le Mans, France',
          center: [0.18443, 48.001783],
          geometry: {
            type: 'Point',
            coordinates: [0.18443, 48.001783],
            interpolated: true
          },
          address: '1',
          context: [
            {
              id: 'neighborhood.7972247622533990',
              text_en: 'Patis-Saint-Lazare',
              text: 'Patis-Saint-Lazare'
            },
            {
              id: 'postcode.8896316255591600',
              text_en: '72000',
              text: '72000'
            },
            {
              id: 'place.9118363809295480',
              wikidata: 'Q1476',
              text_en: 'Le Mans',
              language_en: 'en',
              text: 'Le Mans',
              language: 'en'
            },
            {
              id: 'region.2070339338781030',
              wikidata: 'Q12740',
              short_code: 'FR-72',
              text_en: 'Sarthe',
              language_en: 'en',
              text: 'Sarthe',
              language: 'en'
            },
            {
              id: 'country.19008108158641660',
              wikidata: 'Q142',
              short_code: 'fr',
              text_en: 'France',
              language_en: 'en',
              text: 'France',
              language: 'en'
            }
          ]
        },
        {
          id: 'neighborhood.7123338217329640',
          type: 'Feature',
          place_type: ['neighborhood'],
          relevance: 0.765071,
          properties: { wikidata: 'Q3413229' },
          text_en: 'Champs-Élysées',
          language_en: 'en',
          place_name_en: 'Champs-Élysées, 75008, 8th arrondissement of Paris, Paris, France',
          text: 'Champs-Élysées',
          language: 'en',
          place_name: 'Champs-Élysées, 75008, 8th arrondissement of Paris, Paris, France',
          bbox: [
            2.29503959459934,
            48.8630573835619,
            2.32332656211299,
            48.8737786602598
          ],
          center: [2.30473, 48.8678],
          geometry: { type: 'Point', coordinates: [2.30473, 48.8678] },
          context: [
            {
              id: 'postcode.12225346547695750',
              text_en: '75008',
              text: '75008'
            },
            {
              id: 'locality.12225346547301010',
              wikidata: 'Q270230',
              text_en: '8th arrondissement of Paris',
              language_en: 'en',
              text: '8th arrondissement of Paris',
              language: 'en'
            },
            {
              id: 'place.14749210607497330',
              wikidata: 'Q90',
              short_code: 'FR-75',
              text_en: 'Paris',
              language_en: 'en',
              text: 'Paris',
              language: 'en'
            },
            {
              id: 'country.19008108158641660',
              wikidata: 'Q142',
              short_code: 'fr',
              text_en: 'France',
              language_en: 'en',
              text: 'France',
              language: 'en'
            }
          ]
        },
        {
          id: 'poi.824633777947',
          type: 'Feature',
          place_type: ['poi'],
          relevance: 0.482165,
          properties: {
            foursquare: '4adcda09f964a520ea3321e3',
            address: 'Place du Panthéon',
            wikidata: 'Q188856',
            landmark: true,
            category: 'park',
            maki: 'picnic-site'
          },
          text_en: 'Panthéon',
          language_en: 'en',
          place_name_en: 'Panthéon, Place du Panthéon, Paris, 75005, France',
          text: 'Panthéon',
          language: 'en',
          place_name: 'Panthéon, Place du Panthéon, Paris, 75005, France',
          matching_text: 'Paris',
          matching_place_name: 'Paris, Place du Panthéon, Paris, 75005, France',
          center: [2.346348859375, 48.84624503125],
          geometry: {
            coordinates: [2.346348859375, 48.84624503125],
            type: 'Point'
          },
          context: [
            {
              id: 'neighborhood.8977767122305500',
              wikidata: 'Q3413213',
              text_en: 'Sorbonne',
              language_en: 'en',
              text: 'Sorbonne',
              language: 'en'
            },
            {
              id: 'postcode.10263390772285640',
              text_en: '75005',
              text: '75005'
            },
            {
              id: 'locality.10263390773556950',
              wikidata: 'Q238723',
              text_en: '5th arrondissement of Paris',
              language_en: 'en',
              text: '5th arrondissement of Paris',
              language: 'en'
            },
            {
              id: 'place.14749210607497330',
              wikidata: 'Q90',
              short_code: 'FR-75',
              text_en: 'Paris',
              language_en: 'en',
              text: 'Paris',
              language: 'en'
            },
            {
              id: 'country.19008108158641660',
              wikidata: 'Q142',
              short_code: 'fr',
              text_en: 'France',
              language_en: 'en',
              text: 'France',
              language: 'en'
            }
          ]
        }
      ],
      attribution: 'NOTICE: © 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.'
    },
    expResults: [
      {
        formattedAddress: '1 Rue Des Champs Élysées, 94250 Gentilly, France',
        latitude: 48.816295,
        longitude: 2.33955,
        country: 'France',
        countryCode: 'FR',
        state: 'Paris',
        city: 'Gentilly',
        zipcode: '94250',
        district: undefined,
        streetName: 'Rue Des Champs Élysées',
        streetNumber: '1',
        neighbourhood: 'Plateau',
        extra: {
          id: 'address.8526372802334154',
          category: undefined,
          bbox: undefined
        }
      },
      {
        formattedAddress: '1 Port Des Champs-Élysées, 75008 Paris, France',
        latitude: 48.864193,
        longitude: 2.314339,
        country: 'France',
        countryCode: 'FR',
        state: undefined,
        city: 'Paris',
        zipcode: '75008',
        district: undefined,
        streetName: 'Port Des Champs-Élysées',
        streetNumber: '1',
        neighbourhood: 'Champs-Élysées',
        extra: {
          id: 'address.4972762713479182',
          category: undefined,
          bbox: undefined
        }
      },
      {
        formattedAddress: '1 Rue Des Champs Elysées, 72000 Le Mans, France',
        latitude: 48.001783,
        longitude: 0.18443,
        country: 'France',
        countryCode: 'FR',
        state: 'Sarthe',
        city: 'Le Mans',
        zipcode: '72000',
        district: undefined,
        streetName: 'Rue Des Champs Elysées',
        streetNumber: '1',
        neighbourhood: 'Patis-Saint-Lazare',
        extra: {
          id: 'address.8428062523983924',
          category: undefined,
          bbox: undefined
        }
      },
      {
        formattedAddress: 'Champs-Élysées, 75008, 8th arrondissement of Paris, Paris, France',
        latitude: 48.8678,
        longitude: 2.30473,
        country: 'France',
        countryCode: 'FR',
        state: undefined,
        city: 'Paris',
        zipcode: '75008',
        district: undefined,
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: 'Champs-Élysées',
        extra: {
          id: 'neighborhood.7123338217329640',
          category: undefined,
          bbox: [
            2.29503959459934,
            48.8630573835619,
            2.32332656211299,
            48.8737786602598
          ]
        }
      },
      {
        formattedAddress: 'Panthéon, Place du Panthéon, Paris, 75005, France',
        latitude: 48.84624503125,
        longitude: 2.346348859375,
        country: 'France',
        countryCode: 'FR',
        state: undefined,
        city: 'Paris',
        zipcode: '75005',
        district: undefined,
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: 'Sorbonne',
        extra: { id: 'poi.824633777947', category: 'park', bbox: undefined }
      }
    ]
  },
  '40.714232,-73.9612889': {
    query: { lat: 40.714232, lng: -73.9612889 },
    body: {
      type: 'FeatureCollection',
      query: [-73.9612889, 40.714232],
      features: [
        {
          id: 'address.3679793406555678',
          type: 'Feature',
          place_type: ['address'],
          relevance: 1,
          properties: { accuracy: 'parcel' },
          text_en: 'Bedford Avenue',
          place_name_en: '277 Bedford Avenue, Brooklyn, New York 11211, United States',
          text: 'Bedford Avenue',
          place_name: '277 Bedford Avenue, Brooklyn, New York 11211, United States',
          center: [-73.961297, 40.714259],
          geometry: { type: 'Point', coordinates: [-73.961297, 40.714259] },
          address: '277',
          context: [
            {
              id: 'neighborhood.2102030',
              text_en: 'Williamsburg',
              text: 'Williamsburg'
            },
            {
              id: 'postcode.10441086852103120',
              text_en: '11211',
              text: '11211'
            },
            {
              id: 'locality.6335122455180360',
              wikidata: 'Q18419',
              text_en: 'Brooklyn',
              language_en: 'en',
              text: 'Brooklyn',
              language: 'en'
            },
            {
              id: 'place.2618194975964500',
              wikidata: 'Q60',
              text_en: 'New York City',
              language_en: 'en',
              text: 'New York City',
              language: 'en'
            },
            {
              id: 'district.3780609411998600',
              wikidata: 'Q11980692',
              text_en: 'Kings County',
              language_en: 'en',
              text: 'Kings County',
              language: 'en'
            },
            {
              id: 'region.17349986251855570',
              wikidata: 'Q1384',
              short_code: 'US-NY',
              text_en: 'New York',
              language_en: 'en',
              text: 'New York',
              language: 'en'
            },
            {
              id: 'country.19678805456372290',
              wikidata: 'Q30',
              short_code: 'us',
              text_en: 'United States',
              language_en: 'en',
              text: 'United States',
              language: 'en'
            }
          ]
        },
        {
          id: 'neighborhood.2102030',
          type: 'Feature',
          place_type: ['neighborhood'],
          relevance: 1,
          properties: {},
          text_en: 'Williamsburg',
          place_name_en: 'Williamsburg, New York City, New York 11211, United States',
          text: 'Williamsburg',
          place_name: 'Williamsburg, New York City, New York 11211, United States',
          bbox: [-73.97561, 40.69766, -73.920726, 40.727779],
          center: [-73.9535, 40.7146],
          geometry: { type: 'Point', coordinates: [-73.9535, 40.7146] },
          context: [
            {
              id: 'postcode.10441086852103120',
              text_en: '11211',
              text: '11211'
            },
            {
              id: 'locality.6335122455180360',
              wikidata: 'Q18419',
              text_en: 'Brooklyn',
              language_en: 'en',
              text: 'Brooklyn',
              language: 'en'
            },
            {
              id: 'place.2618194975964500',
              wikidata: 'Q60',
              text_en: 'New York City',
              language_en: 'en',
              text: 'New York City',
              language: 'en'
            },
            {
              id: 'district.3780609411998600',
              wikidata: 'Q11980692',
              text_en: 'Kings County',
              language_en: 'en',
              text: 'Kings County',
              language: 'en'
            },
            {
              id: 'region.17349986251855570',
              wikidata: 'Q1384',
              short_code: 'US-NY',
              text_en: 'New York',
              language_en: 'en',
              text: 'New York',
              language: 'en'
            },
            {
              id: 'country.19678805456372290',
              wikidata: 'Q30',
              short_code: 'us',
              text_en: 'United States',
              language_en: 'en',
              text: 'United States',
              language: 'en'
            }
          ]
        },
        {
          id: 'postcode.10441086852103120',
          type: 'Feature',
          place_type: ['postcode'],
          relevance: 1,
          properties: {},
          text_en: '11211',
          place_name_en: 'Brooklyn, New York 11211, United States',
          text: '11211',
          place_name: 'Brooklyn, New York 11211, United States',
          bbox: [
            -73.9758746673972,
            40.6976445053516,
            -73.9227090230438,
            40.7276899833336
          ],
          center: [-73.96, 40.71],
          geometry: { type: 'Point', coordinates: [-73.96, 40.71] },
          context: [
            {
              id: 'locality.6335122455180360',
              wikidata: 'Q18419',
              text_en: 'Brooklyn',
              language_en: 'en',
              text: 'Brooklyn',
              language: 'en'
            },
            {
              id: 'place.2618194975964500',
              wikidata: 'Q60',
              text_en: 'New York City',
              language_en: 'en',
              text: 'New York City',
              language: 'en'
            },
            {
              id: 'district.3780609411998600',
              wikidata: 'Q11980692',
              text_en: 'Kings County',
              language_en: 'en',
              text: 'Kings County',
              language: 'en'
            },
            {
              id: 'region.17349986251855570',
              wikidata: 'Q1384',
              short_code: 'US-NY',
              text_en: 'New York',
              language_en: 'en',
              text: 'New York',
              language: 'en'
            },
            {
              id: 'country.19678805456372290',
              wikidata: 'Q30',
              short_code: 'us',
              text_en: 'United States',
              language_en: 'en',
              text: 'United States',
              language: 'en'
            }
          ]
        },
        {
          id: 'locality.6335122455180360',
          type: 'Feature',
          place_type: ['locality'],
          relevance: 1,
          properties: { wikidata: 'Q18419' },
          text_en: 'Brooklyn',
          language_en: 'en',
          place_name_en: 'Brooklyn, New York, United States',
          text: 'Brooklyn',
          language: 'en',
          place_name: 'Brooklyn, New York, United States',
          bbox: [-74.0424119629985, 40.566161483009, -73.833365, 40.739446],
          center: [-73.9496, 40.6501],
          geometry: { type: 'Point', coordinates: [-73.9496, 40.6501] },
          context: [
            {
              id: 'place.2618194975964500',
              wikidata: 'Q60',
              text_en: 'New York City',
              language_en: 'en',
              text: 'New York City',
              language: 'en'
            },
            {
              id: 'district.3780609411998600',
              wikidata: 'Q11980692',
              text_en: 'Kings County',
              language_en: 'en',
              text: 'Kings County',
              language: 'en'
            },
            {
              id: 'region.17349986251855570',
              wikidata: 'Q1384',
              short_code: 'US-NY',
              text_en: 'New York',
              language_en: 'en',
              text: 'New York',
              language: 'en'
            },
            {
              id: 'country.19678805456372290',
              wikidata: 'Q30',
              short_code: 'us',
              text_en: 'United States',
              language_en: 'en',
              text: 'United States',
              language: 'en'
            }
          ]
        },
        {
          id: 'place.2618194975964500',
          type: 'Feature',
          place_type: ['place'],
          relevance: 1,
          properties: { wikidata: 'Q60' },
          text_en: 'New York City',
          language_en: 'en',
          place_name_en: 'New York City, New York, United States',
          text: 'New York City',
          language: 'en',
          place_name: 'New York City, New York, United States',
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
          center: [-73.9866, 40.7306],
          geometry: { type: 'Point', coordinates: [-73.9866, 40.7306] },
          context: [
            {
              id: 'district.3780609411998600',
              wikidata: 'Q11980692',
              text_en: 'Kings County',
              language_en: 'en',
              text: 'Kings County',
              language: 'en'
            },
            {
              id: 'region.17349986251855570',
              wikidata: 'Q1384',
              short_code: 'US-NY',
              text_en: 'New York',
              language_en: 'en',
              text: 'New York',
              language: 'en'
            },
            {
              id: 'country.19678805456372290',
              wikidata: 'Q30',
              short_code: 'us',
              text_en: 'United States',
              language_en: 'en',
              text: 'United States',
              language: 'en'
            }
          ]
        },
        {
          id: 'district.3780609411998600',
          type: 'Feature',
          place_type: ['district'],
          relevance: 1,
          properties: { wikidata: 'Q11980692' },
          text_en: 'Kings County',
          language_en: 'en',
          place_name_en: 'Kings County, New York, United States',
          text: 'Kings County',
          language: 'en',
          place_name: 'Kings County, New York, United States',
          bbox: [-74.04191, 40.570153, -73.833614, 40.739258],
          center: [-73.99, 40.69],
          geometry: { type: 'Point', coordinates: [-73.99, 40.69] },
          context: [
            {
              id: 'region.17349986251855570',
              wikidata: 'Q1384',
              short_code: 'US-NY',
              text_en: 'New York',
              language_en: 'en',
              text: 'New York',
              language: 'en'
            },
            {
              id: 'country.19678805456372290',
              wikidata: 'Q30',
              short_code: 'us',
              text_en: 'United States',
              language_en: 'en',
              text: 'United States',
              language: 'en'
            }
          ]
        },
        {
          id: 'region.17349986251855570',
          type: 'Feature',
          place_type: ['region'],
          relevance: 1,
          properties: { wikidata: 'Q1384', short_code: 'US-NY' },
          text_en: 'New York',
          language_en: 'en',
          place_name_en: 'New York, United States',
          text: 'New York',
          language: 'en',
          place_name: 'New York, United States',
          bbox: [
            -79.8578350999901,
            40.4771391062446,
            -71.7564918092633,
            45.0239286969073
          ],
          center: [-75.4652471468304, 42.751210955],
          geometry: {
            type: 'Point',
            coordinates: [-75.4652471468304, 42.751210955]
          },
          context: [
            {
              id: 'country.19678805456372290',
              wikidata: 'Q30',
              short_code: 'us',
              text_en: 'United States',
              language_en: 'en',
              text: 'United States',
              language: 'en'
            }
          ]
        },
        {
          id: 'country.19678805456372290',
          type: 'Feature',
          place_type: ['country'],
          relevance: 1,
          properties: { wikidata: 'Q30', short_code: 'us' },
          text_en: 'United States',
          language_en: 'en',
          place_name_en: 'United States',
          text: 'United States',
          language: 'en',
          place_name: 'United States',
          bbox: [-179.9, 18.8163608007951, -66.8847646185949, 71.4202919997506],
          center: [-97.9222112121185, 39.3812661305678],
          geometry: {
            type: 'Point',
            coordinates: [-97.9222112121185, 39.3812661305678]
          }
        }
      ],
      attribution: 'NOTICE: © 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.'
    },
    expResults: [
      {
        formattedAddress: '277 Bedford Avenue, Brooklyn, New York 11211, United States',
        latitude: 40.714259,
        longitude: -73.961297,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        city: 'New York City',
        zipcode: '11211',
        district: 'Kings County',
        streetName: 'Bedford Avenue',
        streetNumber: '277',
        neighbourhood: 'Williamsburg',
        extra: {
          id: 'address.3679793406555678',
          category: undefined,
          bbox: undefined
        }
      },
      {
        formattedAddress: 'Williamsburg, New York City, New York 11211, United States',
        latitude: 40.7146,
        longitude: -73.9535,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        city: 'New York City',
        zipcode: '11211',
        district: 'Kings County',
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: 'Williamsburg',
        extra: {
          id: 'neighborhood.2102030',
          category: undefined,
          bbox: [-73.97561, 40.69766, -73.920726, 40.727779]
        }
      },
      {
        formattedAddress: 'Brooklyn, New York 11211, United States',
        latitude: 40.71,
        longitude: -73.96,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        city: 'New York City',
        zipcode: '11211',
        district: 'Kings County',
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: 'Brooklyn',
        extra: {
          id: 'postcode.10441086852103120',
          category: undefined,
          bbox: [
            -73.9758746673972,
            40.6976445053516,
            -73.9227090230438,
            40.7276899833336
          ]
        }
      },
      {
        formattedAddress: 'Brooklyn, New York, United States',
        latitude: 40.6501,
        longitude: -73.9496,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        city: 'New York City',
        zipcode: undefined,
        district: 'Kings County',
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: 'Brooklyn',
        extra: {
          id: 'locality.6335122455180360',
          category: undefined,
          bbox: [-74.0424119629985, 40.566161483009, -73.833365, 40.739446]
        }
      },
      {
        formattedAddress: 'New York City, New York, United States',
        latitude: 40.7306,
        longitude: -73.9866,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        city: 'New York City',
        zipcode: undefined,
        district: 'Kings County',
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: undefined,
        extra: {
          id: 'place.2618194975964500',
          category: undefined,
          bbox: [-74.25909, 40.477399, -73.700272, 40.917577]
        }
      },
      {
        formattedAddress: 'Kings County, New York, United States',
        latitude: 40.69,
        longitude: -73.99,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        city: undefined,
        zipcode: undefined,
        district: 'Kings County',
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: undefined,
        extra: {
          id: 'district.3780609411998600',
          category: undefined,
          bbox: [-74.04191, 40.570153, -73.833614, 40.739258]
        }
      },
      {
        formattedAddress: 'New York, United States',
        latitude: 42.751210955,
        longitude: -75.4652471468304,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        city: undefined,
        zipcode: undefined,
        district: undefined,
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: undefined,
        extra: {
          id: 'region.17349986251855570',
          category: undefined,
          bbox: [
            -79.8578350999901,
            40.4771391062446,
            -71.7564918092633,
            45.0239286969073
          ]
        }
      },
      {
        formattedAddress: 'United States',
        latitude: 39.3812661305678,
        longitude: -97.9222112121185,
        country: 'United States',
        countryCode: undefined,
        state: undefined,
        city: undefined,
        zipcode: undefined,
        district: undefined,
        streetName: undefined,
        streetNumber: undefined,
        neighbourhood: undefined,
        extra: {
          id: 'country.19678805456372290',
          category: undefined,
          bbox: [-179.9, 18.8163608007951, -66.8847646185949, 71.4202919997506]
        }
      }
    ]
  },
  forward: {
    formattedAddress: '1 Rue Des Champs-Élysées, 94250 Gentilly, France',
    latitude: 48.816295,
    longitude: 2.33955,
    country: 'France',
    countryCode: 'FR',
    state: 'Paris',
    city: 'Gentilly',
    zipcode: '94250',
    district: undefined,
    streetName: 'Rue Des Champs-Élysées',
    streetNumber: '1',
    neighbourhood: 'Plateau',
    extra: {
      id: 'address.7806810436580594',
      category: undefined,
      bbox: undefined
    }
  },
  reverse: {
    formattedAddress: '277 Bedford Avenue, Brooklyn, New York 11211, United States',
    latitude: 40.71426,
    longitude: -73.9613,
    country: 'United States',
    countryCode: 'US',
    state: 'New York',
    city: 'New York',
    zipcode: '11211',
    district: 'Kings County',
    streetName: 'Bedford Avenue',
    streetNumber: '277',
    neighbourhood: 'Williamsburg',
    extra: {
      id: 'address.1746218927668200',
      category: undefined,
      bbox: undefined
    }
  }
}
