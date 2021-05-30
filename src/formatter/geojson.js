/**
 * @see https://datatracker.ietf.org/doc/html/rfc7946
 */
const featureCollection = (features) => ({
  type: 'FeatureCollection',
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

export function geoJsonFormatter (results) {
  if (!results) return
  const features = results.map(feature)
  return featureCollection(features)
}
