export const fixtures = {
  'birmingham, england': {
    body: {
      _embedded: {
        'city:search-results': [
          {
            _embedded: {
              'city:item': {
                _embedded: {
                  'city:admin1_division': {
                    _links: {
                      'a1:cities': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/admin1_divisions/geonames:ENG/cities/'
                      },
                      'a1:country': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/'
                      },
                      self: {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/admin1_divisions/geonames:ENG/'
                      }
                    },
                    geoname_id: 6269131,
                    geonames_admin1_code: 'ENG',
                    name: 'England'
                  },
                  'city:country': {
                    _links: {
                      'country:admin1_divisions': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/admin1_divisions/'
                      },
                      'country:continent': {
                        href: 'https://api.teleport.org/api/continents/geonames:EU/',
                        name: 'Europe'
                      },
                      'country:salaries': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/salaries/'
                      },
                      self: {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/'
                      }
                    },
                    currency_code: 'GBP',
                    geoname_id: 2635167,
                    iso_alpha2: 'GB',
                    iso_alpha3: 'GBR',
                    name: 'United Kingdom',
                    population: 62348447
                  },
                  'city:urban_area': {
                    _links: {
                      self: {
                        href: 'https://api.teleport.org/api/urban_areas/slug:birmingham/'
                      },
                      'ua:admin1-divisions': [
                        {
                          href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/admin1_divisions/geonames:ENG/',
                          name: 'England'
                        }
                      ],
                      'ua:cities': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:birmingham/cities/'
                      },
                      'ua:continent': {
                        href: 'https://api.teleport.org/api/continents/geonames:EU/',
                        name: 'Europe'
                      },
                      'ua:countries': [
                        {
                          href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/',
                          name: 'United Kingdom'
                        }
                      ],
                      'ua:details': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:birmingham/details/'
                      },
                      'ua:identifying-city': {
                        href: 'https://api.teleport.org/api/cities/geonameid:2655603/',
                        name: 'Birmingham'
                      },
                      'ua:images': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:birmingham/images/'
                      },
                      'ua:primary-cities': [
                        {
                          href: 'https://api.teleport.org/api/cities/geonameid:2655603/',
                          name: 'Birmingham'
                        }
                      ],
                      'ua:salaries': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:birmingham/salaries/'
                      },
                      'ua:scores': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:birmingham/scores/'
                      }
                    },
                    bounding_box: {
                      latlon: {
                        east: -1.6637,
                        north: 52.6681,
                        south: 52.345,
                        west: -2.1705
                      }
                    },
                    continent: 'Europe',
                    full_name: 'Birmingham, United Kingdom',
                    is_government_partner: false,
                    mayor: 'Carl Rice',
                    name: 'Birmingham',
                    slug: 'birmingham',
                    teleport_city_url: 'https://teleport.org/cities/birmingham/',
                    ua_id: 'gcqds'
                  }
                },
                _links: {
                  'city:admin1_division': {
                    href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/admin1_divisions/geonames:ENG/',
                    name: 'England'
                  },
                  'city:alternate-names': {
                    href: 'https://api.teleport.org/api/cities/geonameid:2655603/alternate_names/'
                  },
                  'city:country': {
                    href: 'https://api.teleport.org/api/countries/iso_alpha2:GB/',
                    name: 'United Kingdom'
                  },
                  'city:timezone': {
                    href: 'https://api.teleport.org/api/timezones/iana:Europe%2FLondon/',
                    name: 'Europe/London'
                  },
                  'city:urban_area': {
                    href: 'https://api.teleport.org/api/urban_areas/slug:birmingham/',
                    name: 'Birmingham'
                  },
                  self: {
                    href: 'https://api.teleport.org/api/cities/geonameid:2655603/'
                  }
                },
                full_name: 'Birmingham, England, United Kingdom',
                geoname_id: 2655603,
                location: {
                  geohash: 'gcqdscbw6vb0dky94dyf',
                  latlon: { latitude: 52.48142, longitude: -1.89983 }
                },
                name: 'Birmingham',
                population: 984333
              }
            },
            _links: {
              'city:item': {
                href: 'https://api.teleport.org/api/cities/geonameid:2655603/'
              }
            },
            matching_alternate_names: [{ name: 'Birmingham' }, { name: 'Birminghamia' }],
            matching_full_name: 'Birmingham, England, United Kingdom'
          }
        ]
      },
      _links: {
        curies: [
          {
            href: 'https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/',
            name: 'location',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/City/#!/relations/{rel}/',
            name: 'city',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/',
            name: 'ua',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/',
            name: 'country',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/',
            name: 'a1',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/',
            name: 'tz',
            templated: true
          }
        ],
        self: {
          href: 'https://api.teleport.org/api/cities/?search=birmingham,%20england&geohash='
        }
      },
      count: 1
    },
    expResults: [
      {
        latitude: 52.48142,
        longitude: -1.89983,
        city: 'Birmingham',
        country: 'United Kingdom',
        countryCode: 'GB',
        state: 'England',
        stateCode: 'ENG',
        extra: {
          urbanArea: 'Birmingham',
          urbanAreaApiUrl: 'https://api.teleport.org/api/urban_areas/slug:birmingham/',
          urbanAreaWebUrl: 'https://teleport.org/cities/birmingham/',
          matchingFullName: 'Birmingham, England, United Kingdom'
        }
      }
    ]
  },
  '40.714232,-73.9612889': {
    body: {
      _embedded: {
        'location:nearest-cities': [
          {
            _embedded: {
              'location:nearest-city': {
                _embedded: {
                  'city:admin1_division': {
                    _links: {
                      'a1:cities': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:NY/cities/'
                      },
                      'a1:country': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:US/'
                      },
                      self: {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:NY/'
                      }
                    },
                    geoname_id: 5128638,
                    geonames_admin1_code: 'NY',
                    name: 'New York'
                  },
                  'city:country': {
                    _links: {
                      'country:admin1_divisions': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/'
                      },
                      'country:continent': {
                        href: 'https://api.teleport.org/api/continents/geonames:NA/',
                        name: 'North America'
                      },
                      'country:salaries': {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:US/salaries/'
                      },
                      self: {
                        href: 'https://api.teleport.org/api/countries/iso_alpha2:US/'
                      }
                    },
                    currency_code: 'USD',
                    geoname_id: 6252001,
                    iso_alpha2: 'US',
                    iso_alpha3: 'USA',
                    name: 'United States',
                    population: 310232863
                  },
                  'city:urban_area': {
                    _links: {
                      self: {
                        href: 'https://api.teleport.org/api/urban_areas/slug:new-york/'
                      },
                      'ua:admin1-divisions': [
                        {
                          href: 'https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:NY/',
                          name: 'New York'
                        },
                        {
                          href: 'https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:NJ/',
                          name: 'New Jersey'
                        },
                        {
                          href: 'https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:CT/',
                          name: 'Connecticut'
                        }
                      ],
                      'ua:cities': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:new-york/cities/'
                      },
                      'ua:continent': {
                        href: 'https://api.teleport.org/api/continents/geonames:NA/',
                        name: 'North America'
                      },
                      'ua:countries': [
                        {
                          href: 'https://api.teleport.org/api/countries/iso_alpha2:US/',
                          name: 'United States'
                        }
                      ],
                      'ua:details': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:new-york/details/'
                      },
                      'ua:identifying-city': {
                        href: 'https://api.teleport.org/api/cities/geonameid:5128581/',
                        name: 'New York City'
                      },
                      'ua:images': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:new-york/images/'
                      },
                      'ua:primary-cities': [
                        {
                          href: 'https://api.teleport.org/api/cities/geonameid:5128581/',
                          name: 'New York City'
                        }
                      ],
                      'ua:salaries': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:new-york/salaries/'
                      },
                      'ua:scores': {
                        href: 'https://api.teleport.org/api/urban_areas/slug:new-york/scores/'
                      }
                    },
                    bounding_box: {
                      latlon: {
                        east: -73.226,
                        north: 41.097,
                        south: 40.345,
                        west: -74.501
                      }
                    },
                    continent: 'North America',
                    full_name: 'New York, New York',
                    is_government_partner: false,
                    mayor: 'Bill de Blasio',
                    name: 'New York',
                    slug: 'new-york',
                    teleport_city_url: 'https://teleport.org/cities/new-york/',
                    ua_id: 'dr5rs'
                  }
                },
                _links: {
                  'city:admin1_division': {
                    href: 'https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:NY/',
                    name: 'New York'
                  },
                  'city:alternate-names': {
                    href: 'https://api.teleport.org/api/cities/geonameid:5128581/alternate_names/'
                  },
                  'city:country': {
                    href: 'https://api.teleport.org/api/countries/iso_alpha2:US/',
                    name: 'United States'
                  },
                  'city:timezone': {
                    href: 'https://api.teleport.org/api/timezones/iana:America%2FNew_York/',
                    name: 'America/New_York'
                  },
                  'city:urban_area': {
                    href: 'https://api.teleport.org/api/urban_areas/slug:new-york/',
                    name: 'New York'
                  },
                  self: {
                    href: 'https://api.teleport.org/api/cities/geonameid:5128581/'
                  }
                },
                full_name: 'New York City, New York, United States',
                geoname_id: 5128581,
                location: {
                  geohash: 'dr5regy3zfj0tp84x062',
                  latlon: { latitude: 40.71427, longitude: -74.00597 }
                },
                name: 'New York City',
                population: 8175133
              }
            },
            _links: {
              'location:nearest-city': {
                href: 'https://api.teleport.org/api/cities/geonameid:5128581/',
                name: 'New York City'
              }
            },
            distance_km: 3.7754433
          }
        ],
        'location:nearest-urban-areas': [
          {
            _links: {
              'location:nearest-urban-area': {
                href: 'https://api.teleport.org/api/urban_areas/slug:new-york/',
                name: 'New York'
              }
            },
            distance_km: 0
          }
        ]
      },
      _links: {
        curies: [
          {
            href: 'https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/',
            name: 'location',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/City/#!/relations/{rel}/',
            name: 'city',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/',
            name: 'ua',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/',
            name: 'country',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/',
            name: 'a1',
            templated: true
          },
          {
            href: 'https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/',
            name: 'tz',
            templated: true
          }
        ],
        self: {
          href: 'https://api.teleport.org/api/locations/40.714232,-73.961289/'
        }
      },
      coordinates: {
        geohash: '',
        latlon: { latitude: 40.714232, longitude: -73.9612889 }
      }
    },
    expResults: [
      {
        latitude: 40.71427,
        longitude: -74.00597,
        city: 'New York City',
        country: 'United States',
        countryCode: 'US',
        state: 'New York',
        stateCode: 'NY',
        extra: {
          urbanArea: 'New York',
          urbanAreaApiUrl: 'https://api.teleport.org/api/urban_areas/slug:new-york/',
          urbanAreaWebUrl: 'https://teleport.org/cities/new-york/',
          distanceKm: 3.7754433,
          confidence: 8.4898
        }
      }
    ]
  },
  forward: {
    latitude: 48.85341,
    longitude: 2.3488,
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    state: 'Île-de-France',
    stateCode: '11',
    extra: {
      urbanArea: 'Paris',
      urbanAreaApiUrl: 'https://api.teleport.org/api/urban_areas/slug:paris/',
      urbanAreaWebUrl: 'https://teleport.org/cities/paris/',
      matchingFullName: 'Paris, Île-de-France, France'
    }
  },
  reverse: {
    latitude: 40.71427,
    longitude: -74.00597,
    city: 'New York City',
    country: 'United States',
    countryCode: 'US',
    state: 'New York',
    stateCode: 'NY',
    extra: {
      urbanArea: 'New York',
      urbanAreaApiUrl: 'https://api.teleport.org/api/urban_areas/slug:new-york/',
      urbanAreaWebUrl: 'https://teleport.org/cities/new-york/',
      distanceKm: 3.7754433,
      confidence: 8.4898
    }
  }
}
