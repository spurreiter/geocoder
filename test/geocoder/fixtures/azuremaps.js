const m = {
  '135 pilkington avenue, birmingham': {
    body: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-1.816391, 52.5487968]
          },
          bbox: [
            -1.8248599349505783, 52.54493408242932, -1.8079220650494219,
            52.552659517570675
          ],
          properties: {
            type: 'Address',
            confidence: 'High',
            matchCodes: ['Good'],
            geocodePoints: [
              {
                calculationMethod: 'Rooftop',
                usageTypes: ['Display'],
                geometry: {
                  type: 'Point',
                  coordinates: [-1.816391, 52.5487968]
                }
              },
              {
                calculationMethod: 'Rooftop',
                usageTypes: ['Route'],
                geometry: {
                  type: 'Point',
                  coordinates: [-1.816447, 52.548623]
                }
              }
            ],
            address: {
              addressLine: '135 Pilkington Avenue',
              streetName: 'Pilkington Avenue',
              streetNumber: '135',
              postalCode: 'B72 1LH',
              locality: 'Birmingham',
              formattedAddress:
                '135 Pilkington Avenue, Birmingham, B72 1LH, England, United Kingdom',
              countryRegion: {
                name: 'United Kingdom',
                ISO: 'GB'
              },
              adminDistricts: [
                {
                  shortName: 'England'
                },
                {
                  shortName: 'West Midlands'
                }
              ]
            }
          }
        }
      ]
    },
    expResults: [
      {
        formattedAddress:
          '135 Pilkington Avenue, Birmingham, B72 1LH, England, United Kingdom',
        latitude: 52.5487968,
        longitude: -1.816391,
        country: 'United Kingdom',
        countryCode: 'GB',
        state: undefined,
        region: undefined,
        city: 'Birmingham',
        zipcode: 'B72 1LH',
        streetName: '135 Pilkington Avenue',
        extra: {
          confidence: 1,
          bbox: [
            -1.8248599349505783, 52.54493408242932, -1.8079220650494219,
            52.552659517570675
          ]
        }
      }
    ]
  },
  '40.714232,-73.9612889': {
    body: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-73.961263, 40.714187]
          },
          properties: {
            geocodePoints: [
              {
                geometry: {
                  type: 'Point',
                  coordinates: [-73.961263, 40.714187]
                },
                calculationMethod: 'Parcel',
                usageTypes: ['Display']
              }
            ],
            address: {
              addressLine: '279 Bedford Ave',
              adminDistricts: [
                {
                  name: 'New York',
                  shortName: 'NY'
                },
                {
                  name: 'Kings County',
                  shortName: 'Kings Co.'
                }
              ],
              countryRegion: {
                name: 'United States',
                ISO: 'US'
              },
              intersection: {
                baseStreet: 'Bedford Ave',
                displayName: 'Bedford Ave, between Grand St and S 1st St',
                intersectionType: 'Between',
                secondaryStreet1: 'Grand St',
                secondaryStreet2: 'S 1st St'
              },
              locality: 'Brooklyn',
              neighborhood: 'Williamsburg',
              postalCode: '11211',
              formattedAddress:
                '279 Bedford Ave, Brooklyn, New York 11211, United States',
              streetName: 'Bedford Ave',
              streetNumber: '279'
            },
            confidence: 'High',
            matchCodes: ['Good'],
            type: 'Address'
          },
          bbox: [
            -73.96805742719883, 40.710324282429326, -73.95446857280118,
            40.71804971757068
          ]
        }
      ]
    },
    expResults: [
      {
        formattedAddress:
          '279 Bedford Ave, Brooklyn, New York 11211, United States',
        latitude: 40.714187,
        longitude: -73.961263,
        country: 'United States',
        countryCode: 'US',
        state: undefined,
        region: undefined,
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: '279 Bedford Ave',
        extra: {
          confidence: 1,
          bbox: [
            -73.96805742719883, 40.710324282429326, -73.95446857280118,
            40.71804971757068
          ]
        }
      }
    ]
  },
  forward: {
    formattedAddress: '1 Avenue des Champs-Élysées, 75008 Paris, France',
    latitude: 48.8666195,
    longitude: 2.3170832,
    country: 'France',
    countryCode: 'FR',
    state: undefined,
    region: undefined,
    city: 'Paris',
    zipcode: '75008',
    streetName: '1 Avenue des Champs-Élysées',
    extra: {
      confidence: 1,
      bbox: [
        2.3092544044119108, 48.86275678242932, 2.324911995588089,
        48.870482217570675
      ]
    }
  },
  reverse: {
    formattedAddress:
      '279 Bedford Ave, Brooklyn, New York 11211, United States',
    latitude: 40.714187,
    longitude: -73.961263,
    country: 'United States',
    countryCode: 'US',
    state: undefined,
    region: undefined,
    city: 'Brooklyn',
    zipcode: '11211',
    streetName: '279 Bedford Ave',
    extra: {
      confidence: 1,
      bbox: [
        -73.96805742719883, 40.710324282429326, -73.95446857280118,
        40.71804971757068
      ]
    }
  }
}
export default m

export const fixtures = m
