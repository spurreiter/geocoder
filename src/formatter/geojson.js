/** @typedef {import('#types.js').GeocoderResult} GeocoderResult */
/** @typedef {import('#types.js').GeoJsonFeature} GeoJsonFeature */
/** @typedef {import('#types.js').GeoJsonFeatureCollection} GeoJsonFeatureCollection */
/**
 * @see https://github.com/geocoders/geocodejson-spec
 * @see https://datatracker.ietf.org/doc/html/rfc7946
 * @param {GeoJsonFeature[]} features
 * @param {object} [param1]
 * @param {string} [param1.license]
 * @param {string} [param1.attribution]
 * @param {string} [param1.query]
 * @returns {GeoJsonFeatureCollection}
 */
const featureCollection = (features, { license, attribution, query } = {}) => ({
  type: 'FeatureCollection',
  geocoding: {
    version: '0.1.0',
    license,
    attribution,
    query
  },
  features
})

/**
 * @param {GeocoderResult} param0
 * @returns {GeoJsonFeature}
 */
const feature = ({
  formattedAddress,
  latitude,
  longitude,
  // eslint-disable-next-line no-unused-vars
  country,
  countryCode,
  state,
  district,
  county,
  city,
  zipcode,
  streetName,
  streetNumber,
  extra = {},
  ...other
}) => {
  const { bbox, ...otherExtra } = extra

  const feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    properties: {
      geocoding: {
        label: formattedAddress,
        // "type": ??,
        country: countryCode,
        state,
        district,
        county,
        city,
        postcode: zipcode,
        // "locality": ??,
        street: streetName,
        housenumber: streetNumber,
        ...other,
        ...otherExtra
      }
    }
  }

  if (bbox) {
    feature.bbox = bbox
  }

  return feature
}

/**
 * @param {GeocoderResult[]} results
 * @param {object} opts
 * @returns
 */
export function geoJsonFormatter(results, opts) {
  if (!results) return
  const features = results.map(feature, opts)
  return featureCollection(features)
}
