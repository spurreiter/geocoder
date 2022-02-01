import assert from 'assert'
import sinon from 'sinon'
import { TeleportGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/teleport.js'

describe('TeleportGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new TeleportGeocoder()
      }, /TeleportGeocoder needs an adapter/)
    })

    it('is an instance of TeleportGeocoder', () => {
      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof TeleportGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /TeleportGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /TeleportGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://api.teleport.org/api/cities?apiKey=apiKey&search=Paris&embed=city%3Asearch-results%2Fcity%3Aitem%2F%7Bcity%3Acountry%2Ccity%3Aadmin1_division%2Ccity%3Aurban_area%7D')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      try {
        await geocoder.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const query = 'birmingham, england'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://api.teleport.org/api/cities?apiKey=apiKey&search=birmingham%2C+england&embed=city%3Asearch-results%2Fcity%3Aitem%2F%7Bcity%3Acountry%2Ccity%3Aadmin1_division%2Ccity%3Aurban_area%7D'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = 'birmingham, england'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://api.teleport.org/api/cities?apiKey=apiKey&search=birmingham%2C+england&embed=city%3Asearch-results%2Fcity%3Aitem%2F%7Bcity%3Acountry%2Ccity%3Aadmin1_division%2Ccity%3Aurban_area%7D'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new TeleportGeocoder(mockedAdapter, options)
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

      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])
      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://api.teleport.org/api/locations/40.714232,-73.9612889?apiKey=apiKey&embed=location%3Anearest-cities%2Flocation%3Anearest-city%2F%7Bcity%3Acountry%2Ccity%3Aadmin1_division%2Ccity%3Aurban_area%7D')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new TeleportGeocoder(mockedAdapter, options)
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
      const expUrl = 'https://api.teleport.org/api/locations/40.714232,-73.9612889?apiKey=apiKey&embed=location%3Anearest-cities%2Flocation%3Anearest-city%2F%7Bcity%3Acountry%2Ccity%3Aadmin1_division%2Ccity%3Aurban_area%7D'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new TeleportGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('call api', () => {
    const { ARCGIS_APIKEY: apiKey, SHOW_LOG } = process.env
    let geocoder

    before(function () {
      geocoder = new TeleportGeocoder(fetchAdapter(), { apiKey })
    })

    it('should call forward api', async function () {
      const query = 'Paris'
      const results = await geocoder.forward(query)
      // eslint-disable-next-line no-console
      if (SHOW_LOG) console.dir(results[0], { depth: null })
      assert.deepStrictEqual(fixtures.forward, results[0])
    })

    it('should call reverse api', async function () {
      const query = '40.714232,-73.9612889'
      const results = await geocoder.reverse(query)
      // eslint-disable-next-line no-console
      if (SHOW_LOG) console.dir(results[0], { depth: null })
      assert.deepStrictEqual(fixtures.reverse, results[0])
    })
  })
})
