import assert from 'assert'
import sinon from 'sinon'
import { PickpointGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/pickpoint.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

describe('PickpointGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('pickpoint.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new PickpointGeocoder()
      }, /PickpointGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new PickpointGeocoder(mockedAdapter, { referer: 'http://localhost' })
      }, /You must specify apiKey to use PickpointGeocoder/)
    })

    it('is an instance of PickpointGeocoder', () => {
      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof PickpointGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /PickpointGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /PickpointGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://api.pickpoint.io/v1/forward?key=apiKey&format=json&addressdetails=1&q=1+champs+%C3%A9lys%C3%A9e+Paris',
        undefined
      )
    })

    it('should call api in different language', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new PickpointGeocoder(mockedAdapter, {
        ...options,
        language: 'de'
      })
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://api.pickpoint.io/v1/forward?key=apiKey&format=json&addressdetails=1&q=1+champs+%C3%A9lys%C3%A9e+Paris&accept-language=de',
        undefined
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns({
        status: 502,
        json: () => Promise.resolve({})
      })

      const geocoder = new PickpointGeocoder(mockedAdapter, options)
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
      const expUrl =
        'https://api.pickpoint.io/v1/forward?key=apiKey&format=json&addressdetails=1&q=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, undefined)
    })

    it('should return address when object', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]
      const expUrl =
        'https://api.pickpoint.io/v1/forward?key=apiKey&format=json&addressdetails=1&q=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      const results = await geocoder.forward({ address: query })

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, undefined)
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

      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({
        lat: 40.714232,
        lng: -73.9612889
      })

      assert.deepStrictEqual(results, [])
      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://api.pickpoint.io/v1/reverse?key=apiKey&format=json&addressdetails=1&lat=40.714232&lon=-73.9612889',
        undefined
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns({
        status: 502,
        json: () => Promise.resolve({})
      })

      const geocoder = new PickpointGeocoder(mockedAdapter, options)
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
      const expUrl =
        'https://api.pickpoint.io/v1/reverse?key=apiKey&format=json&addressdetails=1&lat=40.714232&lon=-73.9612889'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new PickpointGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, undefined)
    })
  })

  describe('call api', () => {
    const { PICKPOINT_APIKEY: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new PickpointGeocoder(fetchAdapter(), { apiKey })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = 'avenue des champs élysées Paris'
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
