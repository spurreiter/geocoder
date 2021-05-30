/**
 * @see https://github.com/geocoders/geocodejson-spec
 * @see https://datatracker.ietf.org/doc/html/rfc7946
 */
const featureCollection = (
  features,
  { license = null, attribution = null, query = null } = {}
) => ({
  type: 'FeatureCollection',
  geocoding: {
    version: '0.1.0',
    license,
    attribution,
    query
  },
  features
})

const feature = ({
  formattedAddress,
  latitude,
  longitude,
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
      coordinates: [longitude, latitude]
    },
    properties: {
      geocoding: {
        // "type": ??,
        label: formattedAddress,
        country: countryCode,
        state: state,
        district: district,
        county: county,
        city: city,
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

export function geoJsonFormatter (
  results,
  opts
) {
  if (!results) return
  const features = results.map(feature, opts)
  return featureCollection(features)
}
