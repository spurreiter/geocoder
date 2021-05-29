function CircuitBreakerError (provider = '') {
  const err = new Error(`${provider} is temporarily offline`)
  err.status = 429
  err.provider = provider
  err.name = 'CircuitBreakerError'
  return err
}

export class CircuitBreaker {
  constructor (geocoder, { timeout, excludeStatusCode } = {}) {
    this.geocoder = geocoder
    this.timeout = timeout || 60000
    this.excludeStatusCode = excludeStatusCode || [400, 404]
    this.offlineUntil = 0
    this.name = geocoder.name
  }

  /**
   * @private
   * @returns
   */
  _checkOffline () {
    if (this.offlineUntil > 0) {
      if (this.offlineUntil < Date.now()) {
        this.offlineUntil = 0
        return
      }
      throw new CircuitBreakerError(this.geocoder.name)
    }
  }

  /**
   * @private
   * @returns
   */
  _turnOff (status) {
    const exclude = status && this.excludeStatusCode.includes(status)
    if (this.offlineUntil <= 0 && !exclude) {
      this.offlineUntil = Date.now() + this.timeout
    }
  }

  async forward (query) {
    this._checkOffline()
    try {
      return await this.geocoder.forward(query)
    } catch (err) {
      this._turnOff(err.response?.status)
      throw err
    }
  }

  async reverse (query) {
    this._checkOffline()
    try {
      return await this.geocoder.reverse(query)
    } catch (err) {
      this._turnOff(err.response?.status)
      throw err
    }
  }
}
