'use strict';

/**
 * @param {string|any} str
 * @returns {any}
 */
function toUpperCase(str) {
  return typeof str === 'string' ? str.toUpperCase() : str
}

exports.toUpperCase = toUpperCase;
