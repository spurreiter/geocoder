const m = {
  '135 pilkington avenue, birmingham': {
    body: {
      authenticationResultCode: 'ValidCredentials',
      brandLogoUri: 'http:\u002F\u002Fdev.virtualearth.net\u002FBranding\u002Flogo_powered_by.png',
      copyright: 'Copyright © 2021 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.',
      resourceSets: [{
        estimatedTotal: 1,
        resources: [{
          __type: 'Location:http:\u002F\u002Fschemas.microsoft.com\u002Fsearch\u002Flocal\u002Fws\u002Frest\u002Fv1',
          bbox: [52.54493408242932, -1.8248599349505783, 52.552659517570675, -1.8079220650494219],
          name: '135 Pilkington Avenue, Sutton Vesey, Sutton Coldfield, Birmingham B72 1LH, England, United Kingdom',
          point: {
            type: 'Point',
            coordinates: [52.5487968, -1.816391]
          },
          address: {
            addressLine: '135 Pilkington Avenue',
            adminDistrict: 'England',
            adminDistrict2: 'West Midlands',
            countryRegion: 'United Kingdom',
            formattedAddress: '135 Pilkington Avenue, Sutton Vesey, Sutton Coldfield, Birmingham B72 1LH, England, United Kingdom',
            locality: 'Birmingham',
            postalCode: 'B72 1LH',
            countryRegionIso2: 'GB'
          },
          confidence: 'High',
          entityType: 'Address',
          geocodePoints: [{
            type: 'Point',
            coordinates: [52.5487968, -1.816391],
            calculationMethod: 'Rooftop',
            usageTypes: ['Display']
          }, {
            type: 'Point',
            coordinates: [52.548644, -1.8164431],
            calculationMethod: 'Rooftop',
            usageTypes: ['Route']
          }],
          matchCodes: ['Good']
        }]
      }],
      statusCode: 200,
      statusDescription: 'OK',
      traceId: '0b9fa14a3d1542a29f9e94101b638c87|DU00000D72|0.0.0.1|Ref A: 96877241EA364F968BB71CFFC57CFC3D Ref B: DB3EDGE1110 Ref C: 2021-05-25T19:10:50Z'
    },
    expResults: [{
      formattedAddress: '135 Pilkington Avenue, Sutton Vesey, Sutton Coldfield, Birmingham B72 1LH, England, United Kingdom',
      latitude: 52.5487968,
      longitude: -1.816391,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      region: 'West Midlands',
      city: 'Birmingham',
      zipcode: 'B72 1LH',
      streetName: '135 Pilkington Avenue',
      extra: {
        confidence: 1,
        bbox: [-1.8248599349505783, 52.54493408242932, -1.8079220650494219, 52.552659517570675]
      }
    }]
  },
  '40.714232,-73.9612889': {
    body: {
      authenticationResultCode: 'ValidCredentials',
      brandLogoUri: 'http:\u002F\u002Fdev.virtualearth.net\u002FBranding\u002Flogo_powered_by.png',
      copyright: 'Copyright © 2021 Microsoft and its suppliers. All rights reserved. This API cannot be accessed and the content and any results may not be used, reproduced or transmitted in any manner without express written permission from Microsoft Corporation.',
      resourceSets: [{
        estimatedTotal: 1,
        resources: [{
          __type: 'Location:http:\u002F\u002Fschemas.microsoft.com\u002Fsearch\u002Flocal\u002Fws\u002Frest\u002Fv1',
          bbox: [40.710324282429326, -73.96805742719883, 40.71804971757068, -73.95446857280118],
          name: '279 Bedford Ave, Brooklyn, NY 11211, United States',
          point: {
            type: 'Point',
            coordinates: [40.714187, -73.961263]
          },
          address: {
            addressLine: '279 Bedford Ave',
            adminDistrict: 'NY',
            adminDistrict2: 'Kings Co.',
            countryRegion: 'United States',
            formattedAddress: '279 Bedford Ave, Brooklyn, NY 11211, United States',
            intersection: {
              baseStreet: 'Bedford Ave',
              secondaryStreet1: 'Grand St',
              secondaryStreet2: 'S 1st St',
              intersectionType: 'Between',
              displayName: 'Bedford Ave, between Grand St and S 1st St'
            },
            locality: 'Williamsburg',
            postalCode: '11211',
            countryRegionIso2: 'US'
          },
          confidence: 'High',
          entityType: 'Address',
          geocodePoints: [{
            type: 'Point',
            coordinates: [40.714187, -73.961263],
            calculationMethod: 'Parcel',
            usageTypes: ['Display']
          }],
          matchCodes: ['Good']
        }]
      }],
      statusCode: 200,
      statusDescription: 'OK',
      traceId: 'dcb79762819b4ec88bf0223a37146078|DU00000D57|0.0.0.1|DU01EAP000003EB'
    },
    expResults: [{
      formattedAddress: '279 Bedford Ave, Brooklyn, NY 11211, United States',
      latitude: 40.714187,
      longitude: -73.961263,
      country: 'United States',
      countryCode: 'US',
      state: 'NY',
      region: 'Kings Co.',
      city: 'Williamsburg',
      zipcode: '11211',
      streetName: '279 Bedford Ave',
      extra: {
        confidence: 1,
        bbox: [-73.96805742719883, 40.710324282429326, -73.95446857280118, 40.71804971757068]
      }
    }]
  },
  forward: {
    formattedAddress: '1 Port des Champs-Élysées, 75008 Paris, France',
    latitude: 48.8642334,
    longitude: 2.3153574,
    country: 'France',
    countryCode: 'FR',
    state: 'Île-de-France',
    region: 'Paris',
    city: 'Paris',
    zipcode: '75008',
    streetName: '1 Port des Champs-Élysées',
    extra: {
      confidence: 1,
      bbox: [2.307528977635416, 48.86037068242933, 2.3231858223645836, 48.86809611757068]
    }
  },
  reverse: {
    formattedAddress: '279 Bedford Ave, Brooklyn, NY 11211, United States',
    latitude: 40.714187,
    longitude: -73.961263,
    country: 'United States',
    countryCode: 'US',
    state: 'NY',
    region: 'Kings Co.',
    city: 'Williamsburg',
    zipcode: '11211',
    streetName: '279 Bedford Ave',
    extra: {
      confidence: 1,
      bbox: [-73.96805742719883, 40.710324282429326, -73.95446857280118, 40.71804971757068]
    }
  }
}
export default m

export const fixtures = m
