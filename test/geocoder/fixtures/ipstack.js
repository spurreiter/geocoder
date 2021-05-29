export const fixtures = {
  '66.249.64.0': {
    query: '66.249.64.0',
    body: {
      ip: '66.249.64.0',
      type: 'ipv4',
      continent_code: 'NA',
      continent_name: 'North America',
      country_code: 'US',
      country_name: 'United States',
      region_code: 'CA',
      region_name: 'California',
      city: 'Menifee',
      zip: '92543',
      latitude: 33.70851135253906,
      longitude: -116.98120880126953,
      location: {
        geoname_id: 5372205,
        capital: 'Washington D.C.',
        languages: [{ code: 'en', name: 'English', native: 'English' }],
        country_flag: 'http://assets.ipstack.com/flags/us.svg',
        country_flag_emoji: '🇺🇸',
        country_flag_emoji_unicode: 'U+1F1FA U+1F1F8',
        calling_code: '1',
        is_eu: false
      }
    },
    expResults: [{
      ip: '66.249.64.0',
      latitude: 33.70851135253906,
      longitude: -116.98120880126953,
      countryCode: 'US',
      country: 'United States',
      regionCode: 'CA',
      regionName: 'California',
      city: 'Menifee',
      zipcode: '92543'
    }]
  },
  '2001:e61:3add:9602:7d42:8734:e471:94fb': {
    query: '2001:e61:3add:9602:7d42:8734:e471:94fb',
    body: {
      ip: '2001:e61:3add:9602:7d42:8734:e471:94fb',
      type: 'ipv6',
      continent_code: 'OC',
      continent_name: 'Oceania',
      country_code: 'AU',
      country_name: 'Australia',
      region_code: 'QLD',
      region_name: 'Queensland',
      city: 'Brisbane',
      zip: null,
      latitude: -27.47089958190918,
      longitude: 153.02349853515625,
      location: {
        geoname_id: 2174003,
        capital: 'Canberra',
        languages: [{ code: 'en', name: 'English', native: 'English' }],
        country_flag: 'http://assets.ipstack.com/flags/au.svg',
        country_flag_emoji: '🇦🇺',
        country_flag_emoji_unicode: 'U+1F1E6 U+1F1FA',
        calling_code: '61',
        is_eu: false
      }
    },
    expResults: [{
      ip: '2001:e61:3add:9602:7d42:8734:e471:94fb',
      latitude: -27.47089958190918,
      longitude: 153.02349853515625,
      countryCode: 'AU',
      country: 'Australia',
      regionCode: 'QLD',
      regionName: 'Queensland',
      city: 'Brisbane',
      zipcode: null
    }]
  },
  'bad:bad:bad': {
    query: 'bad:bad:bad',
    body: {
      ip: 'bad:bad:bad',
      type: null,
      continent_code: null,
      continent_name: null,
      country_code: null,
      country_name: null,
      region_code: null,
      region_name: null,
      city: null,
      zip: null,
      latitude: null,
      longitude: null,
      location: {
        geoname_id: null,
        capital: null,
        languages: null,
        country_flag: null,
        country_flag_emoji: null,
        country_flag_emoji_unicode: null,
        calling_code: null,
        is_eu: null
      }
    },
    expResults: []
  }
}
