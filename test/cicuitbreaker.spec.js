import assert from 'assert'
import sinon from 'sinon'
import { CircuitBreaker } from '../src/circuitbreaker.js'
import { AbstractGeocoder } from '../src/geocoder/abstract.js'

describe('CircuitBreaker', function () {
  let clock
  beforeEach(function () {
    clock = sinon.useFakeTimers()
  })
  afterEach(function () {
    clock.restore()
  })

  const testRun = async (
    mockGeocoder,
    { method = 'forward', tick = 21000 } = {}
  ) => {
    const breaker = new CircuitBreaker(mockGeocoder)

    const res = []
    for (let i = 0; i < 10; i++) {
      clock.tick(tick)
      try {
        const value = await breaker[method](i)
        res.push(value)
      } catch (err) {
        res.push(err.message)
      }
    }

    return res
  }

  it('shall pass', async function () {
    const mockGeocoder = {
      name: 'mock',
      forward: async (i) => i,
      reverse: async (i) => i
    }
    const exp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const fwd = await testRun(mockGeocoder)
    assert.deepStrictEqual(fwd, exp)

    const rev = await testRun(mockGeocoder, { method: 'reverse' })
    assert.deepStrictEqual(rev, exp)
  })

  it('shall go temporarily offline if 401', async function () {
    const stub = async (i) => {
      if (i === 1) {
        const err = new Error('baam')
        err.response = { status: 401 }
        throw err
      }
      return i
    }
    const mockGeocoder = {
      name: 'mock',
      forward: stub,
      reverse: stub
    }

    const exp = [
      0,
      'baam',
      'mock is temporarily offline',
      'mock is temporarily offline',
      4,
      5,
      6,
      7,
      8,
      9
    ]

    const fwd = await testRun(mockGeocoder)
    assert.deepStrictEqual(fwd, exp)

    const rev = await testRun(mockGeocoder, { method: 'reverse' })
    assert.deepStrictEqual(rev, exp)
  })

  it('shall go temporarily offline if status is unknown', async function () {
    const stub = async (i) => {
      if (i === 1) {
        const err = new Error('baam')
        throw err
      }
      return i
    }
    const mockGeocoder = {
      name: 'mock',
      forward: stub,
      reverse: stub
    }

    const exp = [
      0,
      'baam',
      'mock is temporarily offline',
      'mock is temporarily offline',
      4,
      5,
      6,
      7,
      8,
      9
    ]

    const fwd = await testRun(mockGeocoder)
    assert.deepStrictEqual(fwd, exp)

    const rev = await testRun(mockGeocoder, { method: 'reverse' })
    assert.deepStrictEqual(rev, exp)
  })

  it('shall ignore a 400', async function () {
    const stub = async (i) => {
      if (i === 1) {
        const err = new Error('baam')
        err.response = { status: 400 }
        throw err
      }
      return i
    }
    const mockGeocoder = {
      name: 'mock',
      forward: stub,
      reverse: stub
    }

    const exp = [0, 'baam', 2, 3, 4, 5, 6, 7, 8, 9]

    const fwd = await testRun(mockGeocoder)
    assert.deepStrictEqual(fwd, exp)

    const rev = await testRun(mockGeocoder, { method: 'reverse' })
    assert.deepStrictEqual(rev, exp)
  })

  it('shall ignore a 404', async function () {
    const stub = async (i) => {
      if (i === 1) {
        const err = new Error('baam')
        err.response = { status: 404 }
        throw err
      }
      return i
    }
    const mockGeocoder = {
      name: 'mock',
      forward: stub,
      reverse: stub
    }

    const exp = [0, 'baam', 2, 3, 4, 5, 6, 7, 8, 9]

    const fwd = await testRun(mockGeocoder)
    assert.deepStrictEqual(fwd, exp)

    const rev = await testRun(mockGeocoder, { method: 'reverse' })
    assert.deepStrictEqual(rev, exp)
  })

  it('shall ignore an unsupported ip lookup', async function () {
    class MockGeocoder extends AbstractGeocoder {
      _forward() {
        return [{ ok: 1 }]
      }
    }
    const mockGeocoder = new MockGeocoder({})
    const breaker = new CircuitBreaker(mockGeocoder)

    const res = []
    for (let i = 0; i < 10; i++) {
      clock.tick(21000)
      try {
        const ip = new Array(4).fill(i).join('.')
        const value = await breaker.forward(ip)
        res.push(value)
      } catch (err) {
        res.push(err.message)
      }
    }
    assert.deepStrictEqual(res, [
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4',
      'MockGeocoder does not support geocoding IPv4'
    ])
  })
})
