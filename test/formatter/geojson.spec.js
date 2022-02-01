import assert from 'assert'
import { fixtures } from './fixtures.js'
import { geoJsonFormatter } from '../../src/index.js'

describe('geoJsonFormatter', function () {
  it('shall convert forward result', function () {
    assert.deepStrictEqual(
      geoJsonFormatter(fixtures['135 pilkington avenue, birmingham']),
      {
        type: 'FeatureCollection',
        geocoding: {
          version: '0.1.0',
          license: undefined,
          attribution: undefined,
          query: undefined
        },
        features: [
          {
            type: 'Feature',
            bbox: [-1.816513, 52.5487473, -1.8163464, 52.5488481],
            geometry: {
              type: 'Point',
              coordinates: [-1.8164308339635031, 52.5487921]
            },
            properties: {
              geocoding: {
                label:
                  '135, Pilkington Avenue, Maney, Sutton Coldfield, Wylde Green, Birmingham, West Midlands Combined Authority, West Midlands, England, B72 1LH, United Kingdom',
                country: 'GB',
                state: 'England',
                district: 'West Midlands',
                county: 'West Midlands Combined Authority',
                city: 'Birmingham',
                postcode: 'B72 1LH',
                street: 'Pilkington Avenue',
                housenumber: '135',
                neighbourhood: undefined,
                id: 90394480,
                confidence: 0.411
              }
            }
          }
        ]
      }
    )
  })

  it('shall convert reverse result', function () {
    assert.deepStrictEqual(
      geoJsonFormatter(fixtures['40.714232,-73.9612889']),
      {
        type: 'FeatureCollection',
        geocoding: {
          version: '0.1.0',
          license: undefined,
          attribution: undefined,
          query: undefined
        },
        features: [
          {
            type: 'Feature',
            bbox: [-73.9613744, 40.7141617, -73.961256, 40.7142482],
            geometry: {
              type: 'Point',
              coordinates: [-73.96131519274765, 40.714205]
            },
            properties: {
              geocoding: {
                label:
                  '279, Bedford Avenue, Williamsburg, Brooklyn, Kings County, New York, 11211, United States',
                country: 'US',
                state: 'New York',
                district: undefined,
                county: undefined,
                city: 'New York',
                postcode: '11211',
                street: 'Bedford Avenue',
                housenumber: '279',
                neighbourhood: undefined,
                id: 279767984,
                confidence: 0
              }
            }
          }
        ]
      }
    )
  })
})
