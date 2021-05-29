import assert from 'assert'
import sinon from 'sinon'
import { AbstractGeocoder, Cascade } from '../src/index.js'

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

class Mock2Geocoder extends MockGeocoder {}

class EmptyGeocoder extends AbstractGeocoder {
  async _forward () {
    return []
  }
}

describe('Cascade', function () {
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
      new Mock2Geocoder('three', [2, 3])
    ]
    const list = []
    const cascade = new Cascade(geocoders)
    for (let i = 0; i < 10; i++) {
      try {
        const r = await cascade.forward(i)
        list.push(r)
      } catch (err) {
        list.push(err.message)
      }
      clock.tick(19000)
    }
    assert.deepStrictEqual(list, [
      [{ query: 0, tag: 'one', provider: 'mock' }],
      [{ query: 1, tag: 'one', provider: 'mock' }],
      [{ query: 2, tag: 'two', provider: 'mock1' }],
      [{ query: 3, tag: 'three', provider: 'mock2' }],
      [{ query: 4, tag: 'three', provider: 'mock2' }],
      'all geocoders offline',
      [{ query: 6, tag: 'one', provider: 'mock' }],
      [{ query: 7, tag: 'two', provider: 'mock1' }],
      [{ query: 8, tag: 'two', provider: 'mock1' }],
      [{ query: 9, tag: 'two', provider: 'mock1' }]
    ])
  })

  it('reverse', async function () {
    const geocoders = [
      new MockGeocoder('one', [2, 4]),
      new Mock1Geocoder('two', [1]),
      new Mock2Geocoder('three', [2, 3])
    ]
    const list = []
    const cascade = new Cascade(geocoders)
    for (let i = 0; i < 10; i++) {
      try {
        const r = await cascade.reverse(i + ',' + i)
        list.push(r)
      } catch (err) {
        list.push(err.message)
      }
      clock.tick(19000)
    }
    assert.deepStrictEqual(list, [
      [{ query: { lat: 0, lng: 0 }, tag: 'one', provider: 'mock' }],
      [{ query: { lat: 1, lng: 1 }, tag: 'one', provider: 'mock' }],
      [{ query: { lat: 2, lng: 2 }, tag: 'two', provider: 'mock1' }],
      [{ query: { lat: 3, lng: 3 }, tag: 'three', provider: 'mock2' }],
      [{ query: { lat: 4, lng: 4 }, tag: 'three', provider: 'mock2' }],
      'all geocoders offline',
      [{ query: { lat: 6, lng: 6 }, tag: 'one', provider: 'mock' }],
      [{ query: { lat: 7, lng: 7 }, tag: 'two', provider: 'mock1' }],
      [{ query: { lat: 8, lng: 8 }, tag: 'two', provider: 'mock1' }],
      [{ query: { lat: 9, lng: 9 }, tag: 'two', provider: 'mock1' }]
    ])
  })

  it('shall return empty result', async function () {
    const geocoders = [
      new MockGeocoder('one', [1]),
      new EmptyGeocoder({})
    ]

    const list = []
    const cascade = new Cascade(geocoders)
    for (let i = 0; i < 10; i++) {
      try {
        const r = await cascade.forward(i)
        list.push(r)
      } catch (err) {
        list.push(err.message)
      }
      clock.tick(19000)
    }
    assert.deepStrictEqual(list, [
      [{ query: 0, tag: 'one', provider: 'mock' }],
      [],
      [],
      [],
      [],
      [{ query: 5, tag: 'one', provider: 'mock' }],
      [{ query: 6, tag: 'one', provider: 'mock' }],
      [{ query: 7, tag: 'one', provider: 'mock' }],
      [{ query: 8, tag: 'one', provider: 'mock' }],
      [{ query: 9, tag: 'one', provider: 'mock' }]
    ])
  })
})
