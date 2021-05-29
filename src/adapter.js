import got from 'got'
import HttpAgent from 'agentkeepalive'
const { HttpsAgent } = HttpAgent

const USER_AGENT = 'user-agent'

/* eslint-disable */
const logger = (r) => {
  console.dir(r, { depth: null })
  return r
}
/* eslint-enable */

export function fetchAdapter (opts) {
  const globalOpts = {
    agent: {
      http: new HttpAgent(),
      https: new HttpsAgent()
    },
    throwHttpErrors: false, // do not change
    retry: 0,
    timeout: 5000,
    headers: {},
    ...opts
  }

  if (!globalOpts.headers[USER_AGENT]) {
    globalOpts.headers[USER_AGENT] = 'Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0'
  }

  return (url, options = {}) => {
    if (typeof url === 'object') {
      const { url: _url, ...other } = url
      url = _url
      options = other
    }

    const headers = { ...globalOpts.headers, ...options.headers }
    const opts = { ...globalOpts, ...options, headers }
    // console.log(url, opts)
    return got(url, opts)
      .then((res) => new Response(res))
      // .then(logger)
  }
}

class Response {
  constructor ({ statusCode, statusMessage, redirectUrls, headers, body }) {
    this.status = statusCode
    this.statusText = statusMessage
    this.headers = headers
    this.body = body
    this.redirected = redirectUrls && redirectUrls.length > 0
    this.type = 'default'
  }

  ok () {
    return this.status >= 200 && this.status < 300
  }

  text () {
    const text =
      this.body == null
        ? ''
        : typeof this.body === 'string'
          ? this.body
          : Buffer.isBuffer(this.body)
            ? this.body.toString('utf8')
            : null

    return text !== null
      ? Promise.resolve(text)
      : Promise.reject(new TypeError('Unsupported body type'))
  }

  json () {
    return this.text().then(JSON.parse)
    // .then(logger)
  }

  formData () {
    return this.text().then((body) => new URLSearchParams(body))
  }
}
