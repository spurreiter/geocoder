import assert from 'assert'
import sinon from 'sinon'
import { GeocodioGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/geocodio.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

describe('GeocodioGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('geocodio.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new GeocodioGeocoder()
      }, /GeocodioGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new GeocodioGeocoder(mockedAdapter)
      }, /You must specify apiKey to use GeocodioGeocoder/)
    })

    it('is an instance of GeocodioGeocoder', () => {
      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof GeocodioGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /GeocodioGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /GeocodioGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://api.geocod.io/v1.7/geocode?api_key=apiKey&q=1+champs+%C3%A9lys%C3%A9e+Paris')
    })

    it.skip('should call api in different language', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, { ...options, language: 'de' })
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://geocode.search.hereapi.com/v1/geocode?apiKey=apiKey&q=1+champs+%C3%A9lys%C3%A9e+Paris&lang=de')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      try {
        await geocoder.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const query = 'Paisley Park, Minneapolis'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://api.geocod.io/v1.7/geocode?api_key=apiKey&q=Paisley+Park%2C+Minneapolis'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = '7801 Audubon Road, Chanhassen, Minnesota 55317'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://api.geocod.io/v1.7/geocode?api_key=apiKey&q=7801+Audubon+Road%2C+Chanhassen%2C+Minnesota+55317'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      const results = await geocoder.forward({ address: query })

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('reverse', () => {
    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])
      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://api.geocod.io/v1.7/reverse?api_key=apiKey&q=40.714232%2C-73.9612889')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      try {
        await geocoder.reverse({ lat: 40.714232, lon: -73.9612889 })
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const query = '40.714232,-73.9612889'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://api.geocod.io/v1.7/reverse?api_key=apiKey&q=40.714232%2C-73.9612889'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new GeocodioGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('call api', () => {
    const { GEOCODIO_APIKEY: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new GeocodioGeocoder(fetchAdapter(), { apiKey })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = 'Paris, TX 75460'
      const results = await geocoder.forward(query)
      // eslint-disable-next-line no-console
      updateFixture(fixtures, 'forward', results[0])
      assert.deepStrictEqual(results[0], fixtures.forward)
    })

    itWithApiKey(apiKey, 'should call reverse api', async function () {
      const query = '40.714232,-73.9612889'
      const results = await geocoder.reverse(query)
      // eslint-disable-next-line no-console
      updateFixture(fixtures, 'reverse', results[0])
      assert.deepStrictEqual(results[0], fixtures.reverse)
    })
  })
})
