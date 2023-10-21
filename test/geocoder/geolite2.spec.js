import assert from 'assert'
import sinon from 'sinon'
import { GeoLite2Geocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/geolite2.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

describe('GeoLite2Geocoder', function () {
  const options = {
    endpoint: 'http://localhost:3000/city'
  }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('geocodio.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new GeoLite2Geocoder()
      }, /GeoLite2Geocoder needs an adapter/)
    })

    it('is an instance of GeoLite2Geocoder', () => {
      const geocoder = new GeoLite2Geocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof GeoLite2Geocoder)
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

      const geocoder = new GeoLite2Geocoder(mockedAdapter, options)
      const results = await geocoder.forward('66.249.64.0')

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

      const geocoder = new GeoLite2Geocoder(mockedAdapter, options)
      try {
        await geocoder.forward('66.249.64.0')
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

      const geocoder = new GeoLite2Geocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

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

      const geocoder = new GeoLite2Geocoder(mockedAdapter, { accountId: '11111', apiKey: 'apikey' })
      const results = await geocoder.forward({ address: query })

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

      const geocoder = new GeoLite2Geocoder(mockedAdapter, options)
      try {
        await geocoder.reverse({ lat: 40.714232, lon: -73.9612889 })
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.message, 'GeoLite2Geocoder does not support reverse geocoding')
      }
    })
  })

  describe('call api', () => {
    const { MAXMIND_ACCOUNT_ID: accountId, MAXMIND_APIKEY: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && accountId && new GeoLite2Geocoder(fetchAdapter(), { apiKey, accountId })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = '66.249.64.0'
      const results = await geocoder.forward(query)
      // eslint-disable-next-line no-console
      updateFixture(fixtures, 'forward', results[0])
      assert.deepStrictEqual(results[0], fixtures.forward)
    })

    itWithApiKey(apiKey, 'should not call reverse api', async function () {
      const query = '40.714232,-73.9612889'
      try {
        await geocoder.reverse(query)
        throw new Error('bad')
      } catch (err) {
        assert.strictEqual(err.message, 'GeoLite2Geocoder does not support reverse geocoding')
      }
    })
  })
})
