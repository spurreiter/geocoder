import assert from 'assert'
import sinon from 'sinon'
import { AzureMapsGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/azuremaps.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

describe('AzureMapsGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('azuremaps.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new AzureMapsGeocoder()
      }, /AzureMapsGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new AzureMapsGeocoder(mockedAdapter)
      }, /You must specify some authorization or apiKey to use AzureMapsGeocoder/)
    })

    it('is an instance of AzureMapsGeocoder', () => {
      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof AzureMapsGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /AzureMapsGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /AzureMapsGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ status: 'OK' })
        })
      )

      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://atlas.microsoft.com/geocode?api-version=2025-01-01&subscription-key=apiKey&query=1+champs+%C3%A9lys%C3%A9e+Paris',
        { headers: { 'accept-language': 'en' } }
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns({
        status: 502,
        json: () => Promise.resolve({})
      })

      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
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
        'https://atlas.microsoft.com/geocode?api-version=2025-01-01&subscription-key=apiKey&query=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      // console.dir(results, { depth: null })
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, {
        headers: { 'accept-language': 'en' }
      })
    })

    it('should return address when object', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]

      const expUrl =
        'https://atlas.microsoft.com/geocode?query=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      const results = await geocoder.forward({ address: query })

      // console.dir(results, {depth:null})
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, {
        headers: { 'accept-language': 'en' }
      })
    })
  })

  describe('reverse', () => {
    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              statusCode: 200
            })
        })
      )

      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({
        lat: 40.714232,
        lng: -73.9612889,
        language: 'fr'
      })

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://atlas.microsoft.com/reverseGeocode?api-version=2025-01-01&subscription-key=apiKey&coordinates=-73.9612889%2C40.714232',
        { headers: { 'accept-language': 'fr' } }
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns({
        status: 502,
        json: () => Promise.resolve({})
      })

      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
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
        'https://atlas.microsoft.com/reverseGeocode?api-version=2025-01-01&subscription-key=apiKey&coordinates=-73.9612889%2C40.714232'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new AzureMapsGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)
      // console.dir(results, { depth: null })
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl, {
        headers: { 'accept-language': 'en' }
      })
    })
  })

  describe('call api', () => {
    const { AZUREMAPS_APIKEY: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new AzureMapsGeocoder(fetchAdapter(), { apiKey })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = '1 champs élysée Paris'
      const results = await geocoder.forward(query)

      updateFixture(fixtures, 'forward', results[0])
      assert.deepStrictEqual(results[0], fixtures.forward)
    })

    itWithApiKey(apiKey, 'should call reverse api', async function () {
      const query = '40.714232,-73.9612889'
      const results = await geocoder.reverse(query)

      updateFixture(fixtures, 'reverse', results[0])
      assert.deepStrictEqual(results[0], fixtures.reverse)
    })
  })
})
