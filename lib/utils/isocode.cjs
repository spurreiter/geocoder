'use strict';

var countries = require('i18n-iso-countries');

// @ts-ignore

/**
 * convert alpha3 to alpha2 country code
 * @param {string} code
 * @returns {string|undefined}
 */
const countryCode = (code) =>
  code && code.length === 3 ? countries.alpha3ToAlpha2(code) : code;

const OPTS = { select: 'official' };

/**
 * obtain country name by code
 * @param {string} code
 * @param {string} [language='en']
 * @returns {string|undefined}
 */
const countryName = (code, language = 'en') => {
  if (!code) return
  const lang = language.split('-')[0];
  const name =
    // @ts-ignore
    countries.getName(code, lang, OPTS) || countries.getName(code, 'en', OPTS);
  return name
};

exports.countryCode = countryCode;
exports.countryName = countryName;
