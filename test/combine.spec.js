import assert from 'assert'
import sinon from 'sinon'
import { AbstractGeocoder, Combine } from '../src/index.js'

class MockGeocoder extends AbstractGeocoder {
  constructor (tag, errorsAt = [3]) {
    super({})
    Object.assign(this, { errorsAt, tag, count: 0 })
  }

  _forward (query) {
    const { tag, errorsAt } = this
    if (errorsAt.includes(this.count++)) {
      return Promise.reject(new Error('baam'))
    }
    return Promise.resolve([{ query, tag }])
  }

  _reverse (query) {
    return this._forward(query)
  }
}

class Mock1Geocoder extends MockGeocoder {}

class EmptyGeocoder extends AbstractGeocoder {
  async _forward () {
    return []
  }
}

describe('Combine', function () {
  let clock
  beforeEach(function () {
    clock = sinon.useFakeTimers()
  })

  afterEach(function () {
    clock.restore()
  })

  it('forward', async function () {
    const geocoders = [
      new MockGeocoder('one', [2, 4]),
      new Mock1Geocoder('two', [1]),
      new EmptyGeocoder({})
    ]
    const cascade = new Combine(geocoders)
    const list = await cascade.forward('test')
    assert.deepStrictEqual(list, [
      { query: 'test', tag: 'one', provider: 'mock' },
      { query: 'test', tag: 'two', provider: 'mock1' }
    ])
  })

  it('reverse', async function () {
    const geocoders = [
      new MockGeocoder('one', [2, 4]),
      new Mock1Geocoder('two', [1]),
      new EmptyGeocoder({})
    ]
    const cascade = new Combine(geocoders)
    const list = await cascade.reverse('10,-10')
    assert.deepStrictEqual(list, [
      { query: { lat: 10, lng: -10 }, tag: 'one', provider: 'mock' },
      { query: { lat: 10, lng: -10 }, tag: 'two', provider: 'mock1' }
    ])
  })
})
