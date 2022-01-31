import assert from 'assert'
import sinon from 'sinon'
import { ArcGisGeocoder, fetchAdapter } from '../../src/index.js'
import { fixtures } from './fixtures/arcgis.js'
import { itWithApiKey } from './helper.js'

describe('ArcGisGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new ArcGisGeocoder()
      }, /ArcGisGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new ArcGisGeocoder(mockedAdapter)
      }, /You must specify apiKey to use ArcGisGeocoder/)
    })

    it('is an instance of ArcGisGeocoder', () => {
      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      assert.ok(geocoder instanceof ArcGisGeocoder)
    })

    it('should have a name ArcGisGeocoder', () => {
      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      assert.strictEqual(geocoder.name, 'arcgis')
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('127.0.0.1')
      }, /ArcGisGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      assert.throws(() => {
        geocoder.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /ArcGisGeocoder does not support geocoding IPv6/)
    })

    it('should call mocked api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ status: 'OK' })
        })
      )

      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      const results = await geocoder.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'f=json&token=apiKey&address=1+champs+%C3%A9lys%C3%A9e+Paris&outFields=AddNum%2CAddr_type%2CCity%2CCountry%2CLongLabel%2CPlace_addr%2CPlaceName%2CPostal%2CRank%2CRegion%2CStName%2CStPreDir%2CStType%2CType'
      }
      )
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
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

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      const results = await geocoder.forward(query)

      // console.dir(results, {depth:null})
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnce(mockedAdapter)
    })

    it('should return address when object', async function () {
      const query = '135 pilkington avenue, birmingham'
      const { body, expResults } = fixtures[query]

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      const results = await geocoder.forward({ address: query })

      // console.dir(results, {depth:null})
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnce(mockedAdapter)
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

      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'f=json&token=apiKey&location=-73.9612889%2C40.714232'
      })
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
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

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const geocoder = new ArcGisGeocoder(mockedAdapter, options)
      const results = await geocoder.reverse(query)
      assert.deepStrictEqual(results, expResults)

      sinon.assert.calledOnce(mockedAdapter)
    })
  })

  describe('call api', () => {
    const { ARCGIS_APIKEY: apiKey, SHOW_LOG } = process.env
    let geocoder

    before(function () {
      geocoder = apiKey && new ArcGisGeocoder(fetchAdapter(), { apiKey })
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
