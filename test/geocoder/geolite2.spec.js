import assert from 'assert'
import sinon from 'sinon'
import { GeoLite2Geocoder } from '../../src/geocoder/index.js'
import { fixtures } from './fixtures/geolite2.js'

describe('GeoLite2Geocoder', function () {
  const options = {
    endpoint: 'http://localhost:3000/city'
  }
  const mockedAdapter = sinon.stub()

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new GeoLite2Geocoder()
      }, /GeoLite2Geocoder needs an adapter/)
    })

    it('is an instance of GeoLite2Geocoder', () => {
      const adapter = new GeoLite2Geocoder(mockedAdapter, options)
      assert.ok(adapter instanceof GeoLite2Geocoder)
    })
  })

  describe('forward', () => {
    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new GeoLite2Geocoder(mockedAdapter, options)
      const results = await adapter.forward('66.249.64.0')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'http://localhost:3000/city/66.249.64.0', undefined)
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new GeoLite2Geocoder(mockedAdapter, options)
      try {
        await adapter.forward('66.249.64.0')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address for ipv4', async function () {
      const query = '66.249.64.0'
      const { body, expResults } = fixtures[query]

      const expUrl = 'http://localhost:3000/city/66.249.64.0'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new GeoLite2Geocoder(mockedAdapter, options)
      const results = await adapter.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, undefined)
    })

    it('should return address for ipv6', async function () {
      const query = '2001:8004:713f:2f00:f9d2:16e5:38e4:adc3'
      const { body, expResults } = fixtures[query]

      const expUrl = 'https://geolite.info/geoip/v2.1/city/2001:8004:713f:2f00:f9d2:16e5:38e4:adc3'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new GeoLite2Geocoder(mockedAdapter, { accountId: '11111', apiKey: 'apikey' })
      const results = await adapter.forward({ address: query })

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, { headers: { authorization: 'Basic MTExMTE6YXBpa2V5' } })
    })
  })

  describe('reverse', () => {
    it('should throw', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new GeoLite2Geocoder(mockedAdapter, options)
      try {
        await adapter.reverse({ lat: 40.714232, lon: -73.9612889 })
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.message, 'GeoLite2Geocoder does not support reverse geocoding')
      }
    })
  })
})
