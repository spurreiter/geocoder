/**
 * @param {string|any} str
 * @returns {any}
 */
export function toUpperCase(str) {
  return typeof str === 'string' ? str.toUpperCase() : str
}
