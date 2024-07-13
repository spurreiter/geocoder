import assert from 'assert'
import sinon from 'sinon'
import { OsmGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/osm.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

const referer = 'https://github.com/spurreiter/geocoder'

describe('OsmGeocoder', function () {
  const options = { referer }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('osm.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new OsmGeocoder()
      }, /OsmGeocoder needs an adapter/)
    })

    it('is an instance of OsmGeocoder', () => {
      const geocoder = new OsmGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof OsmGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new OsmGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /OsmGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new OsmGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /OsmGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new OsmGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=1+champs+%C3%A9lys%C3%A9e+Paris',
        { headers: { referer } }
      )
    })

    it('should call api in different language', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new OsmGeocoder(mockedAdapter, { ...options, language: 'de' })
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=1+champs+%C3%A9lys%C3%A9e+Paris&accept-language=de',
        { headers: { referer } }
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new OsmGeocoder(mockedAdapter, options)
      try {
        await geocoder.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const { query, body, expResults } = fixtures['135 pilkington avenue, birmingham']

      const expUrl = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new OsmGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, {
        headers: { referer: options.referer }
      })
    })

    it('should return address when object', async function () {
      const { query, body, expResults } = fixtures['135 pilkington avenue, birmingham']

      const expUrl = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new OsmGeocoder(mockedAdapter, options)
      const results = await geocoder.forward({ address: query })

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, {
        headers: { referer: options.referer }
      })
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

      const geocoder = new OsmGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])
      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=40.714232&lon=-73.9612889',
        { headers: { referer } }
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new OsmGeocoder(mockedAdapter, options)
      try {
        await geocoder.reverse({ lat: 40.714232, lon: -73.9612889 })
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const { query, body, expResults } = fixtures['40.714232,-73.9612889']
      const expUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=40.714232&lon=-73.9612889'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new OsmGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, {
        headers: { referer: options.referer }
      })
    })
  })

  describe('call api', () => {
    // set apiKey to random value; required to run tests on github
    const { OSM_TEST: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = new OsmGeocoder(fetchAdapter(), { referer })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = 'Paris Avenue des Champs Elysees 1'
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
