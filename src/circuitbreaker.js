/** @typedef {import('./geocoder/abstract').AbstractGeocoder} AbstractGeocoder */
/** @typedef {import('./types').CircuitBreakerError} CircuitBreakerError */
/** @typedef {import('./types').CircuitBreakerOptions} CircuitBreakerOptions */
/** @typedef {import('./types').ForwardQuery} ForwardQuery */
/** @typedef {import('./types').ReverseQuery} ReverseQuery */
/** @typedef {import('./types').GeocoderResult} GeocoderResult */

/**
 * @param {string} provider
 * @returns {CircuitBreakerError}
 */
function CircuitBreakerError (provider = '') {
  /** @type {CircuitBreakerError} */
  // @ts-ignore
  const err = new Error(`${provider} is temporarily offline`)
  err.status = 429
  err.provider = provider
  err.name = 'CircuitBreakerError'
  return err
}

export class CircuitBreaker {
  /**
   * @param {AbstractGeocoder} geocoder
   * @param {CircuitBreakerOptions} param1
   */
  constructor (geocoder, { timeout, excludeStatusCode } = {}) {
    this.geocoder = geocoder
    this.timeout = timeout || 60000
    this.excludeStatusCode = excludeStatusCode || [400, 404, 422]
    this.offlineUntil = 0
    this.name = geocoder.name
  }

  /**
   * @private
   */
  _checkOffline () {
    if (this.offlineUntil > 0) {
      if (this.offlineUntil < Date.now()) {
        this.offlineUntil = 0
        return
      }
      throw CircuitBreakerError(this.geocoder.name)
    }
  }

  /**
   * @private
   */
  _turnOff (status) {
    const exclude = status && this.excludeStatusCode.includes(status)
    if (this.offlineUntil <= 0 && !exclude) {
      this.offlineUntil = Date.now() + this.timeout
    }
  }

  /**
   * @param {ForwardQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async forward (query) {
    this._checkOffline()
    try {
      return await this.geocoder.forward(query)
    } catch (/** @type {any} */ err) {
      this._turnOff(err.response?.status || err.status)
      throw err
    }
  }

  /**
   * @param {ReverseQuery} query
   * @returns {Promise<GeocoderResult[]>}
   */
  async reverse (query) {
    this._checkOffline()
    try {
      return await this.geocoder.reverse(query)
    } catch (/** @type {any} */ err) {
      this._turnOff(err.response?.status)
      throw err
    }
  }
}
