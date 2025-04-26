/**
 * @param {any} obj
 * @returns {boolean}
 */
export const isObject = (obj) => obj !== null && typeof obj === 'object'

/**
 * @param {any} num
 * @returns {boolean}
 */
export const isNumber = (num) => typeof num === 'number'

/**
 * @param {any} str
 * @returns {boolean}
 */
export const isString = (str) => typeof str === 'string'
