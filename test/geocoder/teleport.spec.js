import assert from 'assert'
import sinon from 'sinon'
import { TeleportGeocoder } from '../../src/geocoder/index.js'
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
      const adapter = new TeleportGeocoder(mockedAdapter, options)
      assert.ok(adapter instanceof TeleportGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const adapter = new TeleportGeocoder(mockedAdapter, options)
      assert.throws(() => {
        adapter.forward('127.0.0.1')
      }, /TeleportGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const adapter = new TeleportGeocoder(mockedAdapter, options)
      assert.throws(() => {
        adapter.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /TeleportGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new TeleportGeocoder(mockedAdapter, options)
      const results = await adapter.forward('Paris')

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

      const adapter = new TeleportGeocoder(mockedAdapter, options)
      try {
        await adapter.forward('1 champs élysée Paris')
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

      const adapter = new TeleportGeocoder(mockedAdapter, options)
      const results = await adapter.forward(query)

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

      const adapter = new TeleportGeocoder(mockedAdapter, options)
      const results = await adapter.forward({ address: query })

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

      const adapter = new TeleportGeocoder(mockedAdapter, options)
      const results = await adapter.reverse({ lat: 40.714232, lng: -73.9612889 })

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

      const adapter = new TeleportGeocoder(mockedAdapter, options)
      try {
        await adapter.reverse({ lat: 40.714232, lon: -73.9612889 })
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

      const adapter = new TeleportGeocoder(mockedAdapter, options)
      const results = await adapter.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })
})
