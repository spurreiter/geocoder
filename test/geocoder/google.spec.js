import assert from 'assert'
import sinon from 'sinon'
import { GoogleGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/google.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

describe('GoogleGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('google.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new GoogleGeocoder()
      }, /GoogleGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new GoogleGeocoder(mockedAdapter)
      }, /You must specify apiKey to use GoogleGeocoder/)
    })

    it('is an instance of GoogleGeocoder', () => {
      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof GoogleGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /GoogleGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /GoogleGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ status: 'OK' })
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://maps.googleapis.com/maps/api/geocode/json?key=apiKey&address=1+champs+%C3%A9lys%C3%A9e+Paris')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      try {
        await geocoder.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should fail on results error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 200,
          json: () => Promise.resolve({
            error_message: 'sth... happened',
            status: 'OVER_QUERY_LIMIT'
          })
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      try {
        await geocoder.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.message, 'OVER_QUERY_LIMIT sth... happened')
      }
    })

    it('should return address', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]

      const expUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=apiKey&address=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      // console.dir(results, {depth:null})
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]

      const expUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=apiKey&address=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
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
          json: () => Promise.resolve({ status: 'ZERO_RESULTS', results: [] })
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://maps.googleapis.com/maps/api/geocode/json?key=apiKey&latlng=40.714232%2C-73.9612889')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
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
      const expUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=apiKey&latlng=40.714232%2C-73.9612889'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new GoogleGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('call api', () => {
    const { GOOGLE_APIKEY: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new GoogleGeocoder(fetchAdapter(), { apiKey })
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
