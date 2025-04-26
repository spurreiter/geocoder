const m = {
  '135 pilkington avenue, birmingham': {
    query: '135 pilkington avenue, birmingham',
    body: {
      place_id: 109897188,
      licence:
        'Data © OpenStreetMap contributors, ODbL 1.0. https:\u002F\u002Fosm.org\u002Fcopyright',
      osm_type: 'way',
      osm_id: 90394480,
      boundingbox: ['52.5487473', '52.5488481', '-1.816513', '-1.8163464'],
      lat: '52.5487921',
      lon: '-1.8164308339635031',
      display_name:
        '135, Pilkington Avenue, Maney, Sutton Coldfield, Wylde Green, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom',
      class: 'building',
      type: 'residential',
      importance: 0.411,
      address: {
        house_number: '135',
        road: 'Pilkington Avenue',
        hamlet: 'Maney',
        town: 'Sutton Coldfield',
        village: 'Wylde Green',
        city: 'Birmingham',
        county: 'West Midlands Combined Authority',
        state_district: 'West Midlands',
        state: 'England',
        postcode: 'B72 1LH',
        country: 'United Kingdom',
        country_code: 'gb'
      }
    },
    expResults: [
      {
        formattedAddress:
          '135, Pilkington Avenue, Maney, Sutton Coldfield, Wylde Green, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom',
        latitude: 52.5487921,
        longitude: -1.8164308339635031,
        country: 'United Kingdom',
        countryCode: 'GB',
        state: 'England',
        county: 'West Midlands Combined Authority',
        city: 'Birmingham',
        zipcode: 'B72 1LH',
        district: 'West Midlands',
        streetName: 'Pilkington Avenue',
        streetNumber: '135',
        neighbourhood: undefined,
        extra: {
          id: 90394480,
          confidence: 0.411,
          bbox: [-1.816513, 52.5487473, -1.8163464, 52.5488481]
        }
      }
    ]
  },
  '40.714232,-73.9612889': {
    query: {
      lat: 40.714232,
      lng: -73.9612889
    },
    body: {
      place_id: 158331564,
      licence:
        'Data © OpenStreetMap contributors, ODbL 1.0. https:\u002F\u002Fosm.org\u002Fcopyright',
      osm_type: 'way',
      osm_id: 279767984,
      lat: '40.714205',
      lon: '-73.96131519274765',
      display_name:
        '279, Bedford Avenue, Williamsburg, Brooklyn, Kings County, New York, 11211, United States',
      address: {
        house_number: '279',
        road: 'Bedford Avenue',
        quarter: 'Williamsburg',
        borough: 'Brooklyn',
        city_district: 'Kings County',
        city: 'New York',
        state: 'New York',
        postcode: '11211',
        country: 'United States',
        country_code: 'us'
      },
      boundingbox: ['40.7141617', '40.7142482', '-73.9613744', '-73.961256']
    },
    expResults: [
      {
        formattedAddress:
          '279, Bedford Avenue, Williamsburg, Brooklyn, Kings County, New York, 11211, United States',
        latitude: 40.714205,
        longitude: -73.96131519274765,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        county: undefined,
        city: 'New York',
        zipcode: '11211',
        district: undefined,
        streetName: 'Bedford Avenue',
        streetNumber: '279',
        neighbourhood: undefined,
        extra: {
          id: 279767984,
          confidence: 0,
          bbox: [-73.9613744, 40.7141617, -73.961256, 40.7142482]
        }
      }
    ]
  },
  forward: {
    formattedAddress:
      'Métro 1, Avenue des Champs-Élysées, Quartier du Faubourg-du-Roule, Paris 8e Arrondissement, Paris, Île-de-France, France métropolitaine, 75008, France',
    latitude: 48.8676736,
    longitude: 2.3136172,
    country: 'France',
    countryCode: 'FR',
    state: 'Île-de-France',
    county: 'France métropolitaine',
    city: 'Paris',
    zipcode: '75008',
    district: undefined,
    streetName: 'Avenue des Champs-Élysées',
    streetNumber: undefined,
    neighbourhood: undefined,
    extra: {
      id: 531017871,
      confidence: 0.0001,
      bbox: [2.3097952, 48.8672731, 2.3148457, 48.869063]
    }
  },
  reverse: {
    formattedAddress:
      '277, Bedford Avenue, Williamsburg, Brooklyn, Kings County, City of New York, New York, 11211, United States',
    latitude: 40.714254499999996,
    longitude: -73.96130170969231,
    country: 'United States',
    countryCode: 'US',
    state: 'New York',
    county: undefined,
    city: 'City of New York',
    zipcode: '11211',
    district: undefined,
    streetName: 'Bedford Avenue',
    streetNumber: '277',
    neighbourhood: undefined,
    extra: {
      id: 1165287931,
      confidence: 0,
      bbox: [-73.9613388, 40.7142283, -73.9612646, 40.7142807]
    }
  }
}
export default m

export const fixtures = m
