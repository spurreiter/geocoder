import assert from 'assert'
import sinon from 'sinon'
import { OpendataFranceGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/opendatafrance.js'

describe('OpendataFranceGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new OpendataFranceGeocoder()
      }, /OpendataFranceGeocoder needs an adapter/)
    })

    it('is an instance of OpendataFranceGeocoder', () => {
      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof OpendataFranceGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /OpendataFranceGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /OpendataFranceGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://api-adresse.data.gouv.fr/search?q=1+champs+%C3%A9lys%C3%A9e+Paris'
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
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
        'https://api-adresse.data.gouv.fr/search?q=135+pilkington+avenue%2C+birmingham'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = '1 champs élysée Paris'
      const { body, expResults } = fixtures[query]
      const expUrl =
        'https://api-adresse.data.gouv.fr/search?q=1+champs+%C3%A9lys%C3%A9e+Paris'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
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

      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])
      sinon.assert.calledOnceWithExactly(
        mockedAdapter,
        'https://api-adresse.data.gouv.fr/reverse?lon=-73.9612889&lat=40.714232'
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      try {
        await geocoder.reverse({ lat: 40.714232, lon: -73.9612889 })
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const query = '48.357,2.37'
      const { body, expResults } = fixtures[query]
      const expUrl =
        'https://api-adresse.data.gouv.fr/reverse?lon=2.37&lat=48.357'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new OpendataFranceGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('call api', () => {
    const { SHOW_LOG } = process.env
    let geocoder

    before(function () {
      geocoder = new OpendataFranceGeocoder(fetchAdapter(), { })
    })

    it('should call forward api', async function () {
      const query = '1 champs élysée Paris'
      const results = await geocoder.forward(query)
      // eslint-disable-next-line no-console
      if (SHOW_LOG) console.dir(results[0], { depth: null })
      assert.deepStrictEqual(fixtures.forward, results[0])
    })

    it('should call reverse api', async function () {
      const query = '49.12027,6.17559'
      const results = await geocoder.reverse(query)
      // eslint-disable-next-line no-console
      if (SHOW_LOG) console.dir(results[0], { depth: null })
      assert.deepStrictEqual(fixtures.reverse, results[0])
    })
  })
})
