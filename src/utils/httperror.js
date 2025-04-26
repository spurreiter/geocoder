/** @typedef {import('#adapter.js').Response} Response */
/** @typedef {import('#types.js').HttpError} HttpErrorType */

/**
 * @param {Response} response
 * @returns {HttpErrorType}
 */
export function HttpError(response) {
  const status = response.status || 500
  /** @type {HttpErrorType} */
  // @ts-ignore
  const err = new Error('' + status)
  err.status = status
  err.response = response
  err.name = 'HttpError'
  return err
}
