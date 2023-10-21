import assert from 'assert'
import sinon from 'sinon'
import { MapBoxGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/mapbox.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

describe('MapBoxGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('mapbox.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new MapBoxGeocoder()
      }, /MapBoxGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new MapBoxGeocoder(mockedAdapter)
      }, /You must specify apiKey to use MapBoxGeocoder/)
    })

    it('is an instance of MapBoxGeocoder', () => {
      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof MapBoxGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /MapBoxGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /MapBoxGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://api.mapbox.com/geocoding/v5/mapbox.places/1%20champs%20%C3%A9lys%C3%A9e%20Paris.json?access_token=apiKey')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      try {
        await geocoder.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]

      const expUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/135%20pilkington%20avenue%2C%20birmingham.json?access_token=apiKey'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      // console.dir(results, {depth:null})
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/135%20pilkington%20avenue%2C%20birmingham.json?access_token=apiKey'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      const results = await geocoder.forward({ address: query })

      // console.dir(results, {depth:null})
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

      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://api.mapbox.com/geocoding/v5/mapbox.places/-73.9612889%2C40.714232.json?access_token=apiKey')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
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
      const expUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/-73.9612889%2C40.714232.json?access_token=apiKey'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new MapBoxGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('call api', () => {
    const { MAPBOX_APIKEY: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new MapBoxGeocoder(fetchAdapter(), { apiKey })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = '1 champs élysée Paris'
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
