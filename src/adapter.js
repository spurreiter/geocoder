// @ts-expect-error
import got from 'got'
// @ts-expect-error
import HttpAgent from 'agentkeepalive'
import { isNumber } from './utils/index.js'
const { HttpsAgent } = HttpAgent

/** @typedef {import('./types').AdapterOptions} AdapterOptions */
/** @typedef {import('./types').fetchAdapterFn} fetchAdapterFn */

const USER_AGENT = 'user-agent'

/* eslint-disable */
const logger = (r) => {
  console.dir(r, { depth: null })
  return r
}
/* eslint-enable */

/**
 * @param {AdapterOptions} [opts]
 * @returns {fetchAdapterFn}
 */
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
      // @ts-ignore
      const { url: _url, ...other } = url
      url = _url
      options = other
    }

    const headers = { ...globalOpts.headers, ...options.headers }
    const opts = { ...globalOpts, ...options, headers }
    if (isNumber(opts.timeout)) {
      opts.timeout = { request: opts.timeout }
    }
    if (isNumber(opts.retry)) {
      opts.retry = { limit: opts.retry }
    }

    // console.log(url, opts)
    // @ts-ignore
    return got(url, opts)
      // @ts-ignore
      .then((res) => new Response(res))
      // .then(logger)
  }
}

export class Response {
  /**
   * @param {object} param0
   * @param {number} param0.statusCode
   * @param {string} param0.statusMessage
   * @param {any[]} [param0.redirectUrls]
   * @param {object} param0.headers
   * @param {object} param0.body
   */
  constructor ({ statusCode, statusMessage, redirectUrls, headers, body, ...others }) {
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
