export const fixtures = {
  '135 pilkington avenue, birmingham': {
    query: '135 pilkington avenue, birmingham',
    body: {
      summary: {
        query: '135 pilkington avenue birmingham',
        queryType: 'NON_NEAR',
        queryTime: 141,
        numResults: 2,
        offset: 0,
        totalResults: 2,
        fuzzyLevel: 1
      },
      results: [
        {
          type: 'Address Range',
          id: 'GB/ADDR/p0/2329262',
          score: 8.1408014297,
          address: {
            streetNumber: '135',
            streetName: 'Pilkington Avenue',
            municipalitySubdivision: 'The Royal Town of Sutton Coldfield',
            municipality: 'Birmingham',
            countrySecondarySubdivision: 'West Midlands',
            countrySubdivision: 'ENG',
            countrySubdivisionName: 'England',
            postalCode: 'B72',
            extendedPostalCode: 'B72 1LH',
            countryCode: 'GB',
            country: 'United Kingdom',
            countryCodeISO3: 'GBR',
            freeformAddress: '135 Pilkington Avenue, The Royal Town of Sutton Coldfield, Birmingham, B72 1LH',
            localName: 'Birmingham'
          },
          position: { lat: 52.54864, lon: -1.81606 },
          viewport: {
            topLeftPoint: { lat: 52.54873, lon: -1.81715 },
            btmRightPoint: { lat: 52.54851, lon: -1.81535 }
          },
          addressRanges: {
            rangeLeft: '129 - 139',
            from: { lat: 52.54873, lon: -1.81715 },
            to: { lat: 52.54851, lon: -1.81535 }
          }
        },
        {
          type: 'Cross Street',
          id: 'GB/XSTR/p0/46974',
          score: 5.6787977219,
          address: {
            streetName: 'Birmingham Road, A5127 & Pilkington Avenue',
            municipalitySubdivision: 'The Royal Town of Sutton Coldfield',
            municipality: 'Birmingham',
            countrySecondarySubdivision: 'West Midlands',
            countrySubdivision: 'ENG',
            countrySubdivisionName: 'England',
            postalCode: 'B72',
            countryCode: 'GB',
            country: 'United Kingdom',
            countryCodeISO3: 'GBR',
            freeformAddress: 'Birmingham Road & Pilkington Avenue, The Royal Town of Sutton Coldfield, Birmingham, B72',
            localName: 'Birmingham'
          },
          position: { lat: 52.55416, lon: -1.82787 },
          viewport: {
            topLeftPoint: { lat: 52.55506, lon: -1.82935 },
            btmRightPoint: { lat: 52.55326, lon: -1.82639 }
          }
        }
      ]
    },
    expResults: [
      {
        formattedAddress: '135 Pilkington Avenue, The Royal Town of Sutton Coldfield, Birmingham, B72 1LH',
        latitude: 52.54864,
        longitude: -1.81606,
        country: 'United Kingdom',
        countryCode: 'GB',
        state: 'England',
        county: 'West Midlands',
        district: 'The Royal Town of Sutton Coldfield',
        city: 'Birmingham',
        zipcode: 'B72',
        streetName: 'Pilkington Avenue',
        streetNumber: '135',
        extra: {
          id: 'GB/ADDR/p0/2329262',
          confidence: 0.8141,
          placeName: 'Birmingham',
          type: 'Address Range',
          bbox: [-1.81715, 52.54851, -1.81535, 52.54873]
        }
      },
      {
        formattedAddress: 'Birmingham Road & Pilkington Avenue, The Royal Town of Sutton Coldfield, Birmingham, B72',
        latitude: 52.55416,
        longitude: -1.82787,
        country: 'United Kingdom',
        countryCode: 'GB',
        state: 'England',
        county: 'West Midlands',
        district: 'The Royal Town of Sutton Coldfield',
        city: 'Birmingham',
        zipcode: 'B72',
        streetName: 'Birmingham Road, A5127 & Pilkington Avenue',
        streetNumber: undefined,
        extra: {
          id: 'GB/XSTR/p0/46974',
          confidence: 0.5679,
          placeName: 'Birmingham',
          type: 'Cross Street',
          bbox: [-1.82935, 52.55326, -1.82639, 52.55506]
        }
      }
    ]
  },
  '40.714232,-73.9612889': {
    query: { lat: 40.714232, lng: -73.9612889 },
    body: {
      summary: { queryTime: 9, numResults: 1 },
      addresses: [
        {
          address: {
            buildingNumber: '277',
            streetNumber: '277',
            routeNumbers: [],
            street: 'Bedford Avenue',
            streetName: 'Bedford Avenue',
            streetNameAndNumber: '277 Bedford Avenue',
            countryCode: 'US',
            countrySubdivision: 'NY',
            countrySecondarySubdivision: 'Kings',
            municipality: 'New York',
            postalCode: '11211',
            municipalitySubdivision: 'Brooklyn',
            country: 'United States',
            countryCodeISO3: 'USA',
            freeformAddress: '277 Bedford Avenue, Brooklyn, NY 11211',
            boundingBox: {
              northEast: '40.714498,-73.961285',
              southWest: '40.713892,-73.961696',
              entity: 'position'
            },
            extendedPostalCode: '11211-4003',
            countrySubdivisionName: 'New York',
            localName: 'Brooklyn'
          },
          position: '40.714287,-73.961426'
        }
      ]
    },
    expResults: [
      {
        formattedAddress: '277 Bedford Avenue, Brooklyn, NY 11211',
        latitude: 40.714287,
        longitude: -73.961426,
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        county: 'Kings',
        district: 'Brooklyn',
        city: 'New York',
        zipcode: '11211',
        streetName: 'Bedford Avenue',
        streetNumber: '277',
        extra: {
          placeName: 'Brooklyn',
          bbox: [-73.961696, 40.713892, -73.961285, 40.714498]
        }
      }
    ]
  },
  forward: {
    formattedAddress: 'Avenue des Champs-Élysées & Galerie Élysée 26, 75008 Paris',
    latitude: 48.86943,
    longitude: 2.30896,
    country: 'France',
    countryCode: 'FR',
    state: 'Île-de-France',
    county: 'Paris',
    district: '8ème Arrondissement',
    city: 'Paris',
    zipcode: '75008',
    streetName: 'Avenue des Champs-Élysées & Galerie Élysée 26',
    streetNumber: undefined,
    extra: {
      id: 'FR/XSTR/p1/764701',
      confidence: 0.495,
      placeName: 'Paris',
      type: 'Cross Street',
      bbox: [2.30759, 48.86853, 2.31033, 48.87033]
    }
  },
  reverse: {
    formattedAddress: '277 Bedford Avenue, Brooklyn, NY 11211',
    latitude: 40.714287,
    longitude: -73.961426,
    country: 'United States',
    countryCode: 'US',
    state: 'New York',
    county: 'Kings',
    district: 'Brooklyn',
    city: 'New York',
    zipcode: '11211',
    streetName: 'Bedford Avenue',
    streetNumber: '277',
    extra: {
      placeName: 'Brooklyn',
      bbox: [-73.961696, 40.713892, -73.961285, 40.714498]
    }
  }
}
