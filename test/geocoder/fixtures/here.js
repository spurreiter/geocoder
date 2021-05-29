export const fixtures = {
  '135 pilkington avenue, birmingham': {
    query: '135 pilkington avenue, birmingham',
    body: {
      items: [
        {
          title: '135 Avenue Y, Birmingham, AL 35214-5103, United States',
          id: 'here:af:streetsection:U4v.xDFYYaQxhg.gqwD8-B:CgcIBCDbsYUeEAEaAzEzNQ',
          resultType: 'houseNumber',
          houseNumberType: 'PA',
          address: {
            label: '135 Avenue Y, Birmingham, AL 35214-5103, United States',
            countryCode: 'USA',
            countryName: 'United States',
            stateCode: 'AL',
            state: 'Alabama',
            county: 'Jefferson',
            city: 'Birmingham',
            district: 'North Pratt',
            street: 'Avenue Y',
            postalCode: '35214-5103',
            houseNumber: '135'
          },
          position: { lat: 33.53583, lng: -86.87725 },
          access: [{ lat: 33.53584, lng: -86.87756 }],
          mapView: {
            west: -86.87833,
            south: 33.53493,
            east: -86.87617,
            north: 33.53673
          },
          scoring: {
            queryScore: 0.65,
            fieldScore: { city: 1, streets: [0.86], houseNumber: 1 }
          }
        },
        {
          title: '135 Avenue U, Birmingham, AL 35214-5021, United States',
          id: 'here:af:streetsection:uBOu1BLqmD.UI94wygPnjA:EAIaAzEzNQ',
          resultType: 'houseNumber',
          houseNumberType: 'interpolated',
          address: {
            label: '135 Avenue U, Birmingham, AL 35214-5021, United States',
            countryCode: 'USA',
            countryName: 'United States',
            stateCode: 'AL',
            state: 'Alabama',
            county: 'Jefferson',
            city: 'Birmingham',
            district: 'Central Pratt',
            street: 'Avenue U',
            postalCode: '35214-5021',
            houseNumber: '135'
          },
          position: { lat: 33.53568, lng: -86.88066 },
          access: [{ lat: 33.53568, lng: -86.88082 }],
          mapView: {
            west: -86.88174,
            south: 33.53478,
            east: -86.87958,
            north: 33.53658
          },
          scoring: {
            queryScore: 0.65,
            fieldScore: { city: 1, streets: [0.86], houseNumber: 1 }
          }
        },
        {
          title: '135 Pilkington Ave, Santa Cruz, CA 95062-3737, United States',
          id: 'here:af:streetsection:PYj9nb6PnHPRSENJMG.hrC:EAIaAzEzNQ',
          resultType: 'houseNumber',
          houseNumberType: 'interpolated',
          address: {
            label: '135 Pilkington Ave, Santa Cruz, CA 95062-3737, United States',
            countryCode: 'USA',
            countryName: 'United States',
            stateCode: 'CA',
            state: 'California',
            county: 'Santa Cruz',
            city: 'Santa Cruz',
            street: 'Pilkington Ave',
            postalCode: '95062-3737',
            houseNumber: '135'
          },
          position: { lat: 36.96466, lng: -122.01013 },
          access: [{ lat: 36.96468, lng: -122.00996 }],
          mapView: {
            west: -122.01126,
            south: 36.96376,
            east: -122.009,
            north: 36.96556
          },
          scoring: {
            queryScore: 0.66,
            fieldScore: { streets: [1], houseNumber: 1 }
          }
        },
        {
          title: '86 Avenue Road, Birmingham, B14 7TG, United Kingdom',
          id: 'here:af:streetsection:xuMOg6UkD657uaHPevKAYB:EAIaAjg2KDE',
          resultType: 'houseNumber',
          houseNumberType: 'interpolated',
          address: {
            label: '86 Avenue Road, Birmingham, B14 7TG, United Kingdom',
            countryCode: 'GBR',
            countryName: 'United Kingdom',
            state: 'England',
            countyCode: 'WMD',
            county: 'West Midlands',
            city: 'Birmingham',
            district: 'Kings Heath',
            street: 'Avenue Road',
            postalCode: 'B14 7TG',
            houseNumber: '86'
          },
          position: { lat: 52.43498, lng: -1.90226 },
          access: [{ lat: 52.43491, lng: -1.90245 }],
          mapView: {
            west: -1.90374,
            south: 52.43408,
            east: -1.90078,
            north: 52.43588
          },
          houseNumberFallback: true,
          scoring: {
            queryScore: 0.59,
            fieldScore: { city: 1, streets: [0.9], houseNumber: 0.51 }
          }
        },
        {
          title: '99 Birmingham Ave, Clarington, ON L1C, Canada',
          id: 'here:af:streetsection:kQXK6o9wOua58Z75TN8EeC:EAIaAjk5KCQ',
          resultType: 'houseNumber',
          houseNumberType: 'interpolated',
          address: {
            label: '99 Birmingham Ave, Clarington, ON L1C, Canada',
            countryCode: 'CAN',
            countryName: 'Canada',
            stateCode: 'ON',
            state: 'Ontario',
            county: 'Durham',
            city: 'Clarington',
            district: 'Bowmanville',
            street: 'Birmingham Ave',
            postalCode: 'L1C',
            houseNumber: '99'
          },
          position: { lat: 43.92898, lng: -78.69441 },
          access: [{ lat: 43.92911, lng: -78.69447 }],
          mapView: {
            west: -78.69566,
            south: 43.92808,
            east: -78.69316,
            north: 43.92988
          },
          houseNumberFallback: true,
          scoring: {
            queryScore: 0.61,
            fieldScore: { city: 0.6, streets: [0.9], houseNumber: 0.64 }
          }
        }
      ]
    },
    expResults: [
      {
        formattedAddress: '135 Avenue Y, Birmingham, AL 35214-5103, United States',
        latitude: 33.53583,
        longitude: -86.87725,
        country: 'United States',
        countryCode: 'USA',
        state: 'Alabama',
        county: 'Jefferson',
        city: 'Birmingham',
        zipcode: '35214-5103',
        district: 'North Pratt',
        streetName: 'Avenue Y',
        streetNumber: '135',
        building: undefined,
        extra: {
          id: 'here:af:streetsection:U4v.xDFYYaQxhg.gqwD8-B:CgcIBCDbsYUeEAEaAzEzNQ',
          confidence: 0.65
        }
      },
      {
        formattedAddress: '135 Avenue U, Birmingham, AL 35214-5021, United States',
        latitude: 33.53568,
        longitude: -86.88066,
        country: 'United States',
        countryCode: 'USA',
        state: 'Alabama',
        county: 'Jefferson',
        city: 'Birmingham',
        zipcode: '35214-5021',
        district: 'Central Pratt',
        streetName: 'Avenue U',
        streetNumber: '135',
        building: undefined,
        extra: {
          id: 'here:af:streetsection:uBOu1BLqmD.UI94wygPnjA:EAIaAzEzNQ',
          confidence: 0.65
        }
      },
      {
        formattedAddress: '135 Pilkington Ave, Santa Cruz, CA 95062-3737, United States',
        latitude: 36.96466,
        longitude: -122.01013,
        country: 'United States',
        countryCode: 'USA',
        state: 'California',
        county: 'Santa Cruz',
        city: 'Santa Cruz',
        zipcode: '95062-3737',
        district: undefined,
        streetName: 'Pilkington Ave',
        streetNumber: '135',
        building: undefined,
        extra: {
          id: 'here:af:streetsection:PYj9nb6PnHPRSENJMG.hrC:EAIaAzEzNQ',
          confidence: 0.66
        }
      },
      {
        formattedAddress: '86 Avenue Road, Birmingham, B14 7TG, United Kingdom',
        latitude: 52.43498,
        longitude: -1.90226,
        country: 'United Kingdom',
        countryCode: 'GBR',
        state: 'England',
        county: 'West Midlands',
        city: 'Birmingham',
        zipcode: 'B14 7TG',
        district: 'Kings Heath',
        streetName: 'Avenue Road',
        streetNumber: '86',
        building: undefined,
        extra: {
          id: 'here:af:streetsection:xuMOg6UkD657uaHPevKAYB:EAIaAjg2KDE',
          confidence: 0.59
        }
      },
      {
        formattedAddress: '99 Birmingham Ave, Clarington, ON L1C, Canada',
        latitude: 43.92898,
        longitude: -78.69441,
        country: 'Canada',
        countryCode: 'CAN',
        state: 'Ontario',
        county: 'Durham',
        city: 'Clarington',
        zipcode: 'L1C',
        district: 'Bowmanville',
        streetName: 'Birmingham Ave',
        streetNumber: '99',
        building: undefined,
        extra: {
          id: 'here:af:streetsection:kQXK6o9wOua58Z75TN8EeC:EAIaAjk5KCQ',
          confidence: 0.61
        }
      }
    ]
  },
  '40.714232,-73.9612889': {
    query: { lat: 40.714232, lng: -73.9612889 },
    body: {
      items: [
        {
          title: '277 Bedford Ave, Brooklyn, NY 11211-4203, United States',
          id: 'here:af:streetsection:9uRZ0Jg.ktnHxV32T4vbCB:CgcIBCCegeYjEAEaAzI3Nw',
          resultType: 'houseNumber',
          houseNumberType: 'PA',
          address: {
            label: '277 Bedford Ave, Brooklyn, NY 11211-4203, United States',
            countryCode: 'USA',
            countryName: 'United States',
            stateCode: 'NY',
            state: 'New York',
            county: 'Kings',
            city: 'Brooklyn',
            district: 'Williamsburg',
            street: 'Bedford Ave',
            postalCode: '11211-4203',
            houseNumber: '277'
          },
          position: { lat: 40.71423, lng: -73.96128 },
          access: [{ lat: 40.71431, lng: -73.96142 }],
          distance: 1,
          mapView: {
            west: -73.96447,
            south: 40.70082,
            east: -73.95743,
            north: 40.71531
          }
        }
      ]
    },
    expResults: [
      {
        formattedAddress: '277 Bedford Ave, Brooklyn, NY 11211-4203, United States',
        latitude: 40.71423,
        longitude: -73.96128,
        country: 'United States',
        countryCode: 'USA',
        state: 'New York',
        county: 'Kings',
        city: 'Brooklyn',
        zipcode: '11211-4203',
        district: 'Williamsburg',
        streetName: 'Bedford Ave',
        streetNumber: '277',
        building: undefined,
        extra: {
          id: 'here:af:streetsection:9uRZ0Jg.ktnHxV32T4vbCB:CgcIBCCegeYjEAEaAzI3Nw',
          confidence: 0
        }
      }
    ]
  }
}
