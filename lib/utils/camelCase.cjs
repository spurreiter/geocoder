'use strict';

/**
 * @param {string} str
 * @returns {string}
 */
const toCamelCase = (str) =>
  str.replace(/_(.)/g, (_, c) => c.toUpperCase());

/**
 * @param {object} obj
 * @returns {object}
 */
function objToCamelCase(obj) {
  return Object.entries(obj).reduce((o, [k, v]) => {
    const key = toCamelCase(k);
    o[key] = v && typeof v === 'object' ? objToCamelCase(v) : v;
    return o
  }, {})
}

exports.objToCamelCase = objToCamelCase;
exports.toCamelCase = toCamelCase;
