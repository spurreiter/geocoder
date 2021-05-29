import assert from 'assert'
// import sinon from 'sinon'
import { AbstractGeocoder } from '../../src/geocoder/index.js'

describe('AbstractGeocoder', function () {
  it('shall throw if forward geocoding is not supported', function () {
    assert.throws(() => {
      const abstract = new AbstractGeocoder({})
      abstract.forward('search')
    }, /AbstractGeocoder does not support geocoding/)
  })

  it('shall throw if reverse geocoding is not supported', function () {
    assert.throws(() => {
      const abstract = new AbstractGeocoder({})
      abstract.reverse({ lat: 1, lng: 1 })
    }, /AbstractGeocoder does not support reverse geocoding/)
  })

  it('shall wrap a raw results', function () {
    const abstract = new AbstractGeocoder({}, { raw: true })
    const result = []
    const raw = { raw: 1 }
    abstract.wrapRaw(result, raw)
    assert.deepStrictEqual(result.raw, raw)
  })
})
