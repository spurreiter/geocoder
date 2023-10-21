const m = {
  '135 pilkington avenue, birmingham': {
    body: [{
      place_id: '106425417',
      licence: 'https:\u002F\u002Flocationiq.com\u002Fattribution',
      osm_type: 'way',
      osm_id: '90394480',
      boundingbox: ['52.5487473', '52.5488481', '-1.816513', '-1.8163464'],
      lat: '52.5487921',
      lon: '-1.8164308339635',
      display_name: '135, Pilkington Avenue, Sutton Coldfield, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom',
      class: 'building',
      type: 'residential',
      importance: 0.411,
      address: {
        house_number: '135',
        road: 'Pilkington Avenue',
        town: 'Sutton Coldfield',
        city: 'Birmingham',
        county: 'West Midlands Combined Authority',
        state_district: 'West Midlands',
        state: 'England',
        postcode: 'B72 1LH',
        country: 'United Kingdom',
        country_code: 'gb'
      }
    }],
    expResults: [{
      formattedAddress: '135, Pilkington Avenue, Sutton Coldfield, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom',
      latitude: '52.5487921',
      longitude: '-1.8164308339635',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      region: undefined,
      county: 'West Midlands Combined Authority',
      city: 'Birmingham',
      zipcode: 'B72 1LH',
      streetName: 'Pilkington Avenue',
      streetNumber: '135',
      extra: {
        id: '106425417',
        confidence: 0.411,
        type: 'residential',
        addrType: 'building',
        bbox: ['-1.816513', '52.5487473', '-1.8163464', '52.5488481']
      }
    }]
  },
  '40.714232,-73.9612889': {
    body: {
      place_id: '331684792753',
      osm_type: 'way',
      osm_id: '279767984',
      licence: 'https:\u002F\u002Flocationiq.com\u002Fattribution',
      lat: '40.714205',
      lon: '-73.961315',
      display_name: '279, Bedford Avenue, Williamsburg, New York, Kings County, New York, 11211, USA',
      boundingbox: ['40.714205', '40.714205', '-73.961315', '-73.961315'],
      importance: 0.225,
      address: {
        house_number: '279',
        road: 'Bedford Avenue',
        neighbourhood: 'Williamsburg',
        city: 'New York',
        county: 'Kings County',
        state: 'New York',
        postcode: '11211',
        country: 'United States of America',
        country_code: 'us'
      }
    },
    expResults: [{
      formattedAddress: '279, Bedford Avenue, Williamsburg, New York, Kings County, New York, 11211, USA',
      latitude: '40.714205',
      longitude: '-73.961315',
      country: 'United States of America',
      countryCode: 'US',
      state: 'New York',
      region: undefined,
      county: 'Kings County',
      city: 'New York',
      zipcode: '11211',
      streetName: 'Bedford Avenue',
      streetNumber: '279',
      extra: {
        id: '331684792753',
        confidence: 0.225,
        type: undefined,
        addrType: undefined,
        bbox: ['-73.961315', '40.714205', '-73.961315', '40.714205']
      }
    }]
  },
  forward: {
    formattedAddress: "1, Rue Des Champs, Ézanville, Écouen, Val-d'Oise, 95460, France",
    latitude: '49.032287',
    longitude: '2.367155',
    country: 'France',
    countryCode: 'FR',
    state: "Val-d'Oise",
    region: undefined,
    county: 'Écouen',
    city: 'Ézanville',
    zipcode: '95460',
    streetName: 'Rue Des Champs',
    streetNumber: '1',
    extra: {
      id: '333255683840',
      confidence: 0.25,
      type: undefined,
      addrType: undefined,
      bbox: ['2.367155', '49.032287', '2.367155', '49.032287']
    }
  },
  reverse: {
    formattedAddress: '277, Bedford Avenue, Williamsburg, New York, Kings County, New York, 11211, USA',
    latitude: '40.714255',
    longitude: '-73.961302',
    country: 'United States of America',
    countryCode: 'US',
    state: 'New York',
    region: undefined,
    county: 'Kings County',
    city: 'New York',
    zipcode: '11211',
    streetName: 'Bedford Avenue',
    streetNumber: '277',
    extra: {
      id: '331566812314',
      confidence: 0.225,
      type: undefined,
      addrType: undefined,
      bbox: ['-73.961302', '40.714255', '-73.961302', '40.714255']
    }
  }
}
export default m

export const fixtures = m
