export const fixtures = {
  'Paisley Park, Minneapolis': {
    body: {
      input: {
        address_components: {
          street: 'Paisley',
          formatted_street: 'Paisley',
          city: 'Minneapolis',
          state: 'MN',
          zip: '55422',
          country: 'US'
        },
        formatted_address: 'Paisley, Minneapolis, MN 55422'
      },
      results: [
        {
          address_components: {
            street: 'Paisley',
            suffix: 'Ln',
            formatted_street: 'Paisley Ln',
            city: 'Minneapolis',
            county: 'Hennepin County',
            state: 'MN',
            zip: '55422',
            country: 'US'
          },
          formatted_address: 'Paisley Ln, Minneapolis, MN 55422',
          location: { lat: 44.979549, lng: -93.358475 },
          accuracy: 1,
          accuracy_type: 'street_center',
          source: 'TIGER/Line® dataset from the US Census Bureau'
        }
      ]
    },
    expResults: [
      {
        formattedAddress: 'Paisley Ln, Minneapolis, MN 55422',
        latitude: 44.979549,
        longitude: -93.358475,
        country: 'United States of America',
        countryCode: 'US',
        state: 'MN',
        county: 'Hennepin County',
        city: 'Minneapolis',
        zipcode: '55422',
        streetName: 'Paisley Ln',
        streetNumber: undefined,
        extra: { confidence: 1 }
      }
    ]
  },
  '7801 Audubon Road, Chanhassen, Minnesota 55317': {
    body: {
      input: {
        address_components: {
          number: '7801',
          street: 'Audubon',
          suffix: 'Rd',
          formatted_street: 'Audubon Rd',
          city: 'Chanhassen',
          state: 'MN',
          zip: '55317',
          country: 'US'
        },
        formatted_address: '7801 Audubon Rd, Chanhassen, MN 55317'
      },
      results: [
        {
          address_components: {
            number: '7801',
            street: 'Audubon',
            suffix: 'Rd',
            formatted_street: 'Audubon Rd',
            city: 'Chanhassen',
            county: 'Carver County',
            state: 'MN',
            zip: '55317',
            country: 'US'
          },
          formatted_address: '7801 Audubon Rd, Chanhassen, MN 55317',
          location: { lat: 44.863148, lng: -93.561747 },
          accuracy: 1,
          accuracy_type: 'range_interpolation',
          source: 'TIGER/Line® dataset from the US Census Bureau'
        },
        {
          address_components: {
            number: '7801',
            street: 'Audubon',
            suffix: 'Rd',
            formatted_street: 'Audubon Rd',
            city: 'Chanhassen',
            county: 'Carver County',
            state: 'MN',
            zip: '55317',
            country: 'US'
          },
          formatted_address: '7801 Audubon Rd, Chanhassen, MN 55317',
          location: { lat: 44.862961, lng: -93.561899 },
          accuracy: 0.9,
          accuracy_type: 'range_interpolation',
          source: 'TIGER/Line® dataset from the US Census Bureau'
        },
        {
          address_components: {
            number: '7801',
            street: 'Audubon',
            formatted_street: 'Audubon',
            city: 'Chanhassen',
            county: 'Carver County',
            state: 'MN',
            zip: '55317',
            country: 'US'
          },
          formatted_address: '7801 Audubon, Chanhassen, MN 55317',
          location: { lat: 44.86181, lng: -93.560497 },
          accuracy: 0.8,
          accuracy_type: 'rooftop',
          source: 'Carver'
        }
      ]
    },
    expResults: [
      {
        formattedAddress: '7801 Audubon Rd, Chanhassen, MN 55317',
        latitude: 44.863148,
        longitude: -93.561747,
        country: 'United States of America',
        countryCode: 'US',
        state: 'MN',
        county: 'Carver County',
        city: 'Chanhassen',
        zipcode: '55317',
        streetName: 'Audubon Rd',
        streetNumber: '7801',
        extra: { confidence: 1 }
      },
      {
        formattedAddress: '7801 Audubon Rd, Chanhassen, MN 55317',
        latitude: 44.862961,
        longitude: -93.561899,
        country: 'United States of America',
        countryCode: 'US',
        state: 'MN',
        county: 'Carver County',
        city: 'Chanhassen',
        zipcode: '55317',
        streetName: 'Audubon Rd',
        streetNumber: '7801',
        extra: { confidence: 0.8 }
      },
      {
        formattedAddress: '7801 Audubon, Chanhassen, MN 55317',
        latitude: 44.86181,
        longitude: -93.560497,
        country: 'United States of America',
        countryCode: 'US',
        state: 'MN',
        county: 'Carver County',
        city: 'Chanhassen',
        zipcode: '55317',
        streetName: 'Audubon',
        streetNumber: '7801',
        extra: { confidence: 0.7000000000000001 }
      }
    ]
  },
  '40.714232,-73.9612889': {
    body: {
      results: [
        {
          address_components: {
            number: '279',
            street: 'Bedford',
            suffix: 'Ave',
            formatted_street: 'Bedford Ave',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11211',
            country: 'US'
          },
          formatted_address: '279 Bedford Ave, Brooklyn, NY 11211',
          location: { lat: 40.71422, lng: -73.961343 },
          accuracy: 1,
          accuracy_type: 'rooftop',
          source: 'City of New York'
        },
        {
          address_components: {
            number: '275',
            street: 'Bedford',
            suffix: 'Ave',
            formatted_street: 'Bedford Ave',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11211',
            country: 'US'
          },
          formatted_address: '275 Bedford Ave, Brooklyn, NY 11211',
          location: { lat: 40.714324, lng: -73.961273 },
          accuracy: 1,
          accuracy_type: 'rooftop',
          source: 'City of New York'
        },
        {
          address_components: {
            number: '281',
            street: 'Bedford',
            suffix: 'Ave',
            formatted_street: 'Bedford Ave',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11211',
            country: 'US'
          },
          formatted_address: '281 Bedford Ave, Brooklyn, NY 11211',
          location: { lat: 40.714158, lng: -73.961383 },
          accuracy: 1,
          accuracy_type: 'rooftop',
          source: 'City of New York'
        },
        {
          address_components: {
            number: '174',
            street: 'Grand',
            suffix: 'St',
            formatted_street: 'Grand St',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11211',
            country: 'US'
          },
          formatted_address: '174 Grand St, Brooklyn, NY 11211',
          location: { lat: 40.714323, lng: -73.961182 },
          accuracy: 1,
          accuracy_type: 'rooftop',
          source: 'City of New York'
        },
        {
          address_components: {
            number: '172',
            street: 'Grand',
            suffix: 'St',
            formatted_street: 'Grand St',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11211',
            country: 'US'
          },
          formatted_address: '172 Grand St, Brooklyn, NY 11211',
          location: { lat: 40.714347, lng: -73.961221 },
          accuracy: 1,
          accuracy_type: 'rooftop',
          source: 'City of New York'
        },
        {
          address_components: {
            number: '275',
            street: 'Bedford',
            suffix: 'Ave',
            formatted_street: 'Bedford Ave',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11249',
            country: 'US'
          },
          formatted_address: '275 Bedford Ave, Brooklyn, NY 11249',
          location: { lat: 40.714501, lng: -73.961287 },
          accuracy: 0.99,
          accuracy_type: 'nearest_street',
          source: 'TIGER/Line® dataset from the US Census Bureau'
        },
        {
          address_components: {
            number: '172',
            street: 'Grand',
            suffix: 'St',
            formatted_street: 'Grand St',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11211',
            country: 'US'
          },
          formatted_address: '172 Grand St, Brooklyn, NY 11211',
          location: { lat: 40.714501, lng: -73.961287 },
          accuracy: 0.99,
          accuracy_type: 'nearest_street',
          source: 'TIGER/Line® dataset from the US Census Bureau'
        },
        {
          address_components: {
            number: '138',
            predirectional: 'S',
            street: '1st',
            suffix: 'St',
            formatted_street: 'S 1st St',
            city: 'Brooklyn',
            county: 'Kings County',
            state: 'NY',
            zip: '11211',
            country: 'US'
          },
          formatted_address: '138 S 1st St, Brooklyn, NY 11211',
          location: { lat: 40.713901, lng: -73.96168 },
          accuracy: 0.98,
          accuracy_type: 'nearest_street',
          source: 'TIGER/Line® dataset from the US Census Bureau'
        }
      ]
    },
    expResults: [
      {
        formattedAddress: '279 Bedford Ave, Brooklyn, NY 11211',
        latitude: 40.71422,
        longitude: -73.961343,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'Bedford Ave',
        streetNumber: '279',
        extra: { confidence: 1 }
      },
      {
        formattedAddress: '275 Bedford Ave, Brooklyn, NY 11211',
        latitude: 40.714324,
        longitude: -73.961273,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'Bedford Ave',
        streetNumber: '275',
        extra: { confidence: 1 }
      },
      {
        formattedAddress: '281 Bedford Ave, Brooklyn, NY 11211',
        latitude: 40.714158,
        longitude: -73.961383,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'Bedford Ave',
        streetNumber: '281',
        extra: { confidence: 1 }
      },
      {
        formattedAddress: '174 Grand St, Brooklyn, NY 11211',
        latitude: 40.714323,
        longitude: -73.961182,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'Grand St',
        streetNumber: '174',
        extra: { confidence: 1 }
      },
      {
        formattedAddress: '172 Grand St, Brooklyn, NY 11211',
        latitude: 40.714347,
        longitude: -73.961221,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'Grand St',
        streetNumber: '172',
        extra: { confidence: 1 }
      },
      {
        formattedAddress: '275 Bedford Ave, Brooklyn, NY 11249',
        latitude: 40.714501,
        longitude: -73.961287,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11249',
        streetName: 'Bedford Ave',
        streetNumber: '275',
        extra: { confidence: 0.89 }
      },
      {
        formattedAddress: '172 Grand St, Brooklyn, NY 11211',
        latitude: 40.714501,
        longitude: -73.961287,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'Grand St',
        streetNumber: '172',
        extra: { confidence: 0.89 }
      },
      {
        formattedAddress: '138 S 1st St, Brooklyn, NY 11211',
        latitude: 40.713901,
        longitude: -73.96168,
        country: 'United States of America',
        countryCode: 'US',
        state: 'NY',
        county: 'Kings County',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'S 1st St',
        streetNumber: '138',
        extra: { confidence: 0.88 }
      }
    ]
  }
}
