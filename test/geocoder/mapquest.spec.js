import assert from 'assert'
import sinon from 'sinon'
import { MapQuestGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/mapquest.js'
import { itWithApiKey } from './helper.js'

describe('MapQuestGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new MapQuestGeocoder()
      }, /MapQuestGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new MapQuestGeocoder(mockedAdapter)
      }, /You must specify apiKey to use MapQuestGeocoder/)
    })

    it('is an instance of MapQuestGeocoder', () => {
      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof MapQuestGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /MapQuestGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /MapQuestGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ status: 'OK' })
        })
      )

      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'http://open.mapquestapi.com/geocoding/v1/address?key=apiKey&location=1+champs+%C3%A9lys%C3%A9e+Paris')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
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

      const expUrl = 'http://open.mapquestapi.com/geocoding/v1/address?key=apiKey&location=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      // console.dir(results, {depth:null})
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]

      const expUrl = 'http://open.mapquestapi.com/geocoding/v1/address?key=apiKey&location=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
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
          json: () => Promise.resolve({
            resourceSets: [{
              resources: []
            }],
            statusCode: 200
          })
        })
      )

      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'http://open.mapquestapi.com/geocoding/v1/reverse?key=apiKey&location=40.714232%2C-73.9612889')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
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
      const expUrl = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=apiKey&location=40.714232%2C-73.9612889'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new MapQuestGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('call api', () => {
    const { MAPQUEST_APIKEY: apiKey, SHOW_LOG } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new MapQuestGeocoder(fetchAdapter(), { apiKey })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = '1 champs élysée Paris'
      const results = await geocoder.forward(query)
      // eslint-disable-next-line no-console
      if (SHOW_LOG) console.dir(results[0], { depth: null })
      assert.deepStrictEqual(fixtures.forward, results[0])
    })

    itWithApiKey(apiKey, 'should call reverse api', async function () {
      const query = '40.714232,-73.9612889'
      const results = await geocoder.reverse(query)
      // eslint-disable-next-line no-console
      if (SHOW_LOG) console.dir(results[0], { depth: null })
      assert.deepStrictEqual(fixtures.reverse, results[0])
    })
  })
})
