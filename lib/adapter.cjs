'use strict';

var got = require('got');
var agentkeepalive = require('agentkeepalive');
require('i18n-iso-countries');
var isType = require('./utils/isType.cjs');
var version = require('./version.cjs');

/** @typedef {import('#types.js').AdapterOptions} AdapterOptions */
/** @typedef {import('#types.js').fetchAdapterFn} fetchAdapterFn */

const USER_AGENT = 'user-agent';
/* eslint-enable */

/**
 * @param {AdapterOptions} [opts]
 * @returns {fetchAdapterFn}
 */
function fetchAdapter(opts) {
  const globalOpts = {
    agent: {
      http: new agentkeepalive.HttpAgent(),
      https: new agentkeepalive.HttpsAgent()
    },
    throwHttpErrors: false, // do not change
    retry: 0,
    timeout: 5000,
    headers: {},
    ...opts
  };

  if (!globalOpts.headers[USER_AGENT]) {
    globalOpts.headers[USER_AGENT] = `geocoder/${version.version}`;
  }

  return (url, options = {}) => {
    if (typeof url === 'object') {
      // @ts-expect-error
      const { url: _url, ...other } = url;
      url = _url;
      options = other;
    }

    const headers = { ...globalOpts.headers, ...options.headers };
    const opts = { ...globalOpts, ...options, headers };
    if (isType.isNumber(opts.timeout)) {
      opts.timeout = { request: opts.timeout };
    }
    if (isType.isNumber(opts.retry)) {
      opts.retry = { limit: opts.retry };
    }

    // console.log(url, opts)
    return (
      // @ts-ignore
      got(url, opts).then((res) => new Response(res))
    )
    // .then(logger)
  }
}

class Response {
  /**
   * @param {object} param0
   * @param {number} param0.statusCode
   * @param {string} param0.statusMessage
   * @param {any[]} [param0.redirectUrls]
   * @param {object} param0.headers
   * @param {object} param0.body
   */
  constructor({
    statusCode,
    statusMessage,
    redirectUrls,
    headers,
    body,
    ..._others
  }) {
    this.status = statusCode;
    this.statusText = statusMessage;
    this.headers = headers;
    this.body = body;
    this.redirected = redirectUrls && redirectUrls.length > 0;
    this.type = 'default';
  }

  ok() {
    return this.status >= 200 && this.status < 300
  }

  text() {
    const text =
      this.body == null
        ? ''
        : typeof this.body === 'string'
          ? this.body
          : Buffer.isBuffer(this.body)
            ? this.body.toString('utf8')
            : null;

    return text !== null
      ? Promise.resolve(text)
      : Promise.reject(new TypeError('Unsupported body type'))
  }

  json() {
    return this.text().then(JSON.parse)
    // .then(logger)
  }

  formData() {
    return this.text().then((body) => new URLSearchParams(body))
  }
}

exports.Response = Response;
exports.fetchAdapter = fetchAdapter;
