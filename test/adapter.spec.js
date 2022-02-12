import assert from 'assert'
import { fetchAdapter } from '../src/index.js'
import http from 'http'

const app = http.createServer((req, res) => {
  const { query, method, url } = req
  if (url === '/404') {
    res.statusCode = 404
  } else if (url === '/godot') {
    return
  }
  res.end(JSON.stringify({ args: query, url, method }))
})

describe('fetchAdapter', function () {
  const port = 30000
  const url = `http://localhost:${port}`
  let server

  before(function () {
    server = app.listen(30000)
  })
  after(function () {
    server.close()
  })

  it('shall fetch', async function () {
    const res = await fetchAdapter()(url + '?test=1&foo=bar')
    assert.strictEqual(res.ok(), true)
    const obj = await res.json()
    assert.deepStrictEqual(obj, {
      method: 'GET',
      url: '/?test=1&foo=bar'
    })
  })

  it('shall fetch with options', async function () {
    const res = await fetchAdapter()({ url: url, method: 'POST' })
    assert.strictEqual(res.status, 200)
    const obj = await res.json()
    assert.deepStrictEqual(obj, {
      method: 'POST',
      url: '/'
    })
  })

  it('shall not throw on 404', async function () {
    const res = await fetchAdapter()({ url: url + '/404', method: 'POST' })
    assert.strictEqual(res.status, 404)
    const obj = await res.json()
    assert.deepStrictEqual(obj, {
      method: 'POST',
      url: '/404'
    })
  })

  it('shall timeout ', async function () {
    let err
    try {
      await fetchAdapter({ timeout: 100 })(url + '/godot')
    } catch (e) {
      err = e
    }
    assert.strictEqual(err.message, "Timeout awaiting 'request' for 100ms")
  })

  it('shall throw ', async function () {
    let err
    try {
      await fetchAdapter({ timeout: 100 })('https://is-there-anybody-out-there')
    } catch (e) {
      err = e
    }
    assert.ok(/getaddrinfo (?:EAI_AGAIN|ENOTFOUND) is-there-anybody-out-there/.test(err.message))
  })
})
