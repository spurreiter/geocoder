import assert from 'assert'
import sinon from 'sinon'
import { YandexGeocoder } from '../../src/geocoder/index.js'
import { fixtures } from './fixtures/yandex.js'

describe('YandexGeocoder', function () {
  const options = { apiKey: 'apiKey' }
  const mockedAdapter = sinon.stub()

  describe('constructor', () => {
    it('an adapter must be set', () => {
      assert.throws(() => {
        new YandexGeocoder()
      }, /YandexGeocoder needs an adapter/)
    })

    it('needs an apiKey', () => {
      assert.throws(() => {
        new YandexGeocoder(mockedAdapter)
      }, /You must specify apiKey to use YandexGeocoder/)
    })

    it('is an instance of YandexGeocoder', () => {
      const adapter = new YandexGeocoder(mockedAdapter, options)
      assert.ok(adapter instanceof YandexGeocoder)
    })
  })

  describe('forward', () => {
    it('should not accept IPv4', () => {
      const adapter = new YandexGeocoder(mockedAdapter, options)
      assert.throws(() => {
        adapter.forward('127.0.0.1')
      }, /YandexGeocoder does not support geocoding IPv4/)
    })

    it('should not accept IPv6', () => {
      const adapter = new YandexGeocoder(mockedAdapter, options)
      assert.throws(() => {
        adapter.forward('2001:0db8:0000:85a3:0000:0000:ac1f:8001')
      }, /YandexGeocoder does not support geocoding IPv6/)
    })

    it('should call api', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new YandexGeocoder(mockedAdapter, options)
      const results = await adapter.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://geocode-maps.yandex.ru/1.x?apikey=apiKey&format=json&geocode=1+champs+%C3%A9lys%C3%A9e+Paris')
    })

    it('should call api in different language', async function () {
      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new YandexGeocoder(mockedAdapter, { ...options, language: 'en-ru' })
      const results = await adapter.forward('1 champs élysée Paris')

      assert.deepStrictEqual(results, [])

      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://geocode-maps.yandex.ru/1.x?apikey=apiKey&format=json&geocode=1+champs+%C3%A9lys%C3%A9e+Paris&lang=en_RU')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new YandexGeocoder(mockedAdapter, options)
      try {
        await adapter.forward('1 champs élysée Paris')
        assert.ok(false, 'shall not reach here')
      } catch (e) {
        assert.strictEqual(e.status, 502)
      }
    })

    it('should return address', async function () {
      const query = '135 pilkington avenue, birmingham, england'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://geocode-maps.yandex.ru/1.x?apikey=apiKey&format=json&geocode=135+pilkington+avenue%2C+birmingham%2C+england'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new YandexGeocoder(mockedAdapter, options)
      const results = await adapter.forward(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })

    it('should return address when object', async function () {
      const query = 'Kabasakal Caddesi, Istanbul, Turkey'
      const { body, expResults } = fixtures[query]
      const expUrl = 'https://geocode-maps.yandex.ru/1.x?apikey=apiKey&format=json&geocode=Kabasakal+Caddesi%2C+Istanbul%2C+Turkey'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new YandexGeocoder(mockedAdapter, options)
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

      const adapter = new YandexGeocoder(mockedAdapter, options)
      const results = await adapter.reverse({ lat: 40.714232, lng: -73.9612889 })

      assert.deepStrictEqual(results, [])
      sinon.assert.calledOnceWithExactly(mockedAdapter, 'https://geocode-maps.yandex.ru/1.x?apikey=apiKey&format=json&geocode=-73.9612889%2C40.714232')
    })

    it('should throw on error', async function () {
      const mockedAdapter = sinon.stub().returns(
        ({
          status: 502,
          json: () => Promise.resolve({})
        })
      )

      const adapter = new YandexGeocoder(mockedAdapter, options)
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
      const expUrl = 'https://geocode-maps.yandex.ru/1.x?apikey=apiKey&format=json&geocode=-73.9612889%2C40.714232'

      const mockedAdapter = sinon.stub().returns(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(body)
        })
      )

      const adapter = new YandexGeocoder(mockedAdapter, options)
      const results = await adapter.reverse(query)

      assert.deepStrictEqual(results, expResults)
      sinon.assert.calledOnceWithExactly(mockedAdapter, expUrl)
    })
  })
})
