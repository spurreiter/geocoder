import assert from 'assert'
import sinon from 'sinon'
import { HereGeocoder } from '../../src/geocoder/index.js'
import { fixtures } from './fixtures/here.js'

describe('HereGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new HereGeocoder()
      }, /HereGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new HereGeocoder(mockedAdapter)
      }, /You must specify apiKey to use HereGeocoder/)
    })

    it('is an instance of HereGeocoder', () => {
      const adapter = new HereGeocoder(mockedAdapter, options)
      assert.ok(adapter instanceof HereGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const adapter = new HereGeocoder(mockedAdapter, options)
      assert.throws(() => {
        adapter.forward('127.0.0.1')
      }, /HereGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const adapter = new HereGeocoder(mockedAdapter, options)
      assert.throws(() => {
        adapter.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /HereGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new HereGeocoder(mockedAdapter, options)
      const results = await adapter.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://geocode.search.hereapi.com/v1/geocode?apiKey=apiKey&q=1+champs+%C3%A9lys%C3%A9e+Paris')
    })

    it('should call api in different language', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new HereGeocoder(mockedAdapter, { ...options, language: 'de' })
      const results = await adapter.forward('1 champs élysée Paris')

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

      const adapter = new HereGeocoder(mockedAdapter, options)
      try {
        await adapter.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://geocode.search.hereapi.com/v1/geocode?apiKey=apiKey&q=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new HereGeocoder(mockedAdapter, options)
      const results = await adapter.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://geocode.search.hereapi.com/v1/geocode?apiKey=apiKey&q=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new HereGeocoder(mockedAdapter, options)
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

      const adapter = new HereGeocoder(mockedAdapter, options)
      const results = await adapter.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])
      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=apiKey&at=40.714232%2C-73.9612889')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new HereGeocoder(mockedAdapter, options)
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
      const expUrl = 'https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=apiKey&at=40.714232%2C-73.9612889'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new HereGeocoder(mockedAdapter, options)
      const results = await adapter.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })
})
