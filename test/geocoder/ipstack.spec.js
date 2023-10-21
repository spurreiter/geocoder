import assert from 'assert'
import sinon from 'sinon'
import { IpStackGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/ipstack.js'
import { itWithApiKey } from './helper.js'
import { updateFixture, writeFixtures } from './fixtures/support.js'

describe('IpStackGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  after(() => {
    writeFixtures('ipstack.js', fixtures)
  })

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new IpStackGeocoder()
      }, /IpStackGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new IpStackGeocoder(mockedAdapter)
      }, /You must specify apiKey to use IpStackGeocoder/)
    })

    it('is an instance of IpStackGeocoder', () => {
      const geocoder = new IpStackGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof IpStackGeocoder)
    })
  })

  describe('forward', () => {
    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new IpStackGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('66.249.64.0')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'http://api.ipstack.com/66.249.64.0?access_key=apiKey')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new IpStackGeocoder(mockedAdapter, options)
      try {
        await geocoder.forward('66.249.64.0')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address for ipv4', async function () {
      const query = '66.249.64.0'
      const { body, expResults } = fixtures[query]

      const expUrl = 'http://api.ipstack.com/66.249.64.0?access_key=apiKey'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new IpStackGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address for ipv6', async function () {
      const query = '2001:e61:3add:9602:7d42:8734:e471:94fb'
      const { body, expResults } = fixtures[query]

      const expUrl = 'http://api.ipstack.com/2001:e61:3add:9602:7d42:8734:e471:94fb?access_key=apiKey'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new IpStackGeocoder(mockedAdapter, options)
      const results = await geocoder.forward({ address: query })

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return empty result', async function () {
      const query = 'bad:bad:bad'
      const { body, expResults } = fixtures[query]

      const expUrl = 'http://api.ipstack.com/bad:bad:bad?access_key=apiKey'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new IpStackGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })

  describe('reverse', () => {
    it('should throw', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new IpStackGeocoder(mockedAdapter, options)
      try {
        await geocoder.reverse({ lat: 40.714232, lon: -73.9612889 })
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.message, 'IpStackGeocoder does not support reverse geocoding')
      }
    })
  })

  describe('call api', () => {
    const { IPSTACK_APIKEY: apiKey } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new IpStackGeocoder(fetchAdapter(), { apiKey })
    })

    itWithApiKey(apiKey, 'should call forward api', async function () {
      const query = '66.249.64.0'
      const results = await geocoder.forward(query)
      // eslint-disable-next-line no-console
      updateFixture(fixtures, 'forward', results[0])
      assert.deepStrictEqual(results[0], fixtures.forward)
    })

    itWithApiKey(apiKey, 'should call reverse api', async function () {
      const query = '40.714232,-73.9612889'
      try {
        await geocoder.reverse(query)
        throw new Error('bad')
      } catch (err) {
        assert.strictEqual(err.message, 'IpStackGeocoder does not support reverse geocoding')
      }
    })
  })
})
