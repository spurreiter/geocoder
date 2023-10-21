const m = {
  'Kabasakal Caddesi, Istanbul, Turkey': {
    body: {
      response: {
        GeoObjectCollection: {
          metaDataProperty: {
            GeocoderResponseMetaData: {
              request: 'Kabasakal Caddesi, Istanbul, Turkey',
              results: '10',
              found: '1'
            }
          },
          featureMember: [{
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'Turkey, İstanbul, Fatih, Cankurtaran Mah., Kabasakal Cad.',
                  kind: 'street',
                  Address: {
                    country_code: 'TR',
                    formatted: 'Turkey, İstanbul, Fatih, Cankurtaran Mah., Kabasakal Cad.',
                    Components: [{
                      kind: 'country',
                      name: 'Turkey'
                    }, {
                      kind: 'province',
                      name: 'İstanbul'
                    }, {
                      kind: 'area',
                      name: 'Fatih'
                    }, {
                      kind: 'district',
                      name: 'Cankurtaran Mah.'
                    }, {
                      kind: 'street',
                      name: 'Kabasakal Cad.'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'Turkey, İstanbul, Fatih, Cankurtaran Mah., Kabasakal Cad.',
                      CountryNameCode: 'TR',
                      CountryName: 'Turkey',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'İstanbul',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Fatih',
                          Locality: {
                            DependentLocality: {
                              DependentLocalityName: 'Cankurtaran Mah.',
                              Thoroughfare: {
                                ThoroughfareName: 'Kabasakal Cad.'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Kabasakal Cad.',
              description: 'Cankurtaran Mah., Fatih, İstanbul, Turkey',
              boundedBy: {
                Envelope: {
                  lowerCorner: '28.978519 41.006264',
                  upperCorner: '28.979624 41.007346'
                }
              },
              Point: {
                pos: '28.979067 41.006809'
              }
            }
          }]
        }
      }
    },
    expResults: [{
      formattedAddress: 'Turkey, İstanbul, Fatih, Cankurtaran Mah., Kabasakal Cad.',
      latitude: 41.006809,
      longitude: 28.979067,
      country: 'Turkey',
      countryCode: 'TR',
      state: 'İstanbul',
      county: 'Fatih',
      city: 'Cankurtaran Mah.',
      streetName: 'Kabasakal Cad.',
      streetNumber: undefined,
      extra: {
        bbox: [28.978519, 41.006264, 28.979624, 41.007346]
      }
    }]
  },
  '135 pilkington avenue, birmingham, england': {
    body: {
      response: {
        GeoObjectCollection: {
          metaDataProperty: {
            GeocoderResponseMetaData: {
              request: '135 pilkington avenue, birmingham, england',
              results: '10',
              found: '10'
            }
          },
          featureMember: [{
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'United Kingdom, England, Worcestershire County, Birmingham',
                  kind: 'locality',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Worcestershire County, Birmingham',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Worcestershire County'
                    }, {
                      kind: 'locality',
                      name: 'Birmingham'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Worcestershire County, Birmingham',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Worcestershire County',
                          Locality: {
                            LocalityName: 'Birmingham'
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham',
              description: 'Worcestershire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-2.034298 52.371578',
                  upperCorner: '-1.863896 52.412181'
                }
              },
              Point: {
                pos: '-1.867553 52.389928'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'United Kingdom, England, Worcestershire County, Worcester and Birmingham Canal',
                  kind: 'hydro',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Worcestershire County, Worcester and Birmingham Canal',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Worcestershire County'
                    }, {
                      kind: 'hydro',
                      name: 'Worcester and Birmingham Canal'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Worcestershire County, Worcester and Birmingham Canal',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Worcestershire County',
                          Locality: {
                            Premise: {
                              PremiseName: 'Worcester and Birmingham Canal'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Worcester and Birmingham Canal',
              description: 'Worcestershire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-2.223771 52.182078',
                  upperCorner: '-1.986696 52.332743'
                }
              },
              Point: {
                pos: '-2.108427 52.266368'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Worcestershire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Worcestershire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Worcestershire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-2.238314 52.390989',
                  upperCorner: '-2.157214 52.411511'
                }
              },
              Point: {
                pos: '-2.197306 52.397166'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Warwickshire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Warwickshire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Warwickshire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-1.687683 52.42818',
                  upperCorner: '-1.57931 52.446166'
                }
              },
              Point: {
                pos: '-1.633065 52.441077'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Worcestershire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Worcestershire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Worcestershire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-2.045841 52.378616',
                  upperCorner: '-2.007429 52.395891'
                }
              },
              Point: {
                pos: '-2.028207 52.390373'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Worcestershire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Worcestershire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Worcestershire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-1.895167 52.274701',
                  upperCorner: '-1.873257 52.309199'
                }
              },
              Point: {
                pos: '-1.884073 52.291802'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Worcestershire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Worcestershire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Worcestershire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Worcestershire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-2.048294 52.34668',
                  upperCorner: '-2.04523 52.372606'
                }
              },
              Point: {
                pos: '-2.046353 52.359552'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Warwickshire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Warwickshire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Warwickshire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-1.745687 52.223601',
                  upperCorner: '-1.733093 52.245298'
                }
              },
              Point: {
                pos: '-1.73921 52.234545'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Warwickshire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Warwickshire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Warwickshire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-1.727191 52.194821',
                  upperCorner: '-1.709054 52.215799'
                }
              },
              Point: {
                pos: '-1.719456 52.204149'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                  kind: 'street',
                  Address: {
                    country_code: 'GB',
                    formatted: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                    Components: [{
                      kind: 'country',
                      name: 'United Kingdom'
                    }, {
                      kind: 'province',
                      name: 'England'
                    }, {
                      kind: 'area',
                      name: 'Warwickshire County'
                    }, {
                      kind: 'street',
                      name: 'Birmingham Road'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United Kingdom, England, Warwickshire County, Birmingham Road',
                      CountryNameCode: 'GB',
                      CountryName: 'United Kingdom',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'England',
                        SubAdministrativeArea: {
                          SubAdministrativeAreaName: 'Warwickshire County',
                          Locality: {
                            Thoroughfare: {
                              ThoroughfareName: 'Birmingham Road'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Birmingham Road',
              description: 'Warwickshire County, England, United Kingdom',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-1.691088 52.285952',
                  upperCorner: '-1.595471 52.351301'
                }
              },
              Point: {
                pos: '-1.649945 52.303005'
              }
            }
          }]
        }
      }
    },
    expResults: [{
      formattedAddress: 'United Kingdom, England, Worcestershire County, Birmingham',
      latitude: 52.389928,
      longitude: -1.867553,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Worcestershire County',
      city: 'Birmingham',
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-2.034298, 52.371578, -1.863896, 52.412181]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Worcestershire County, Worcester and Birmingham Canal',
      latitude: 52.266368,
      longitude: -2.108427,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Worcestershire County',
      city: undefined,
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-2.223771, 52.182078, -1.986696, 52.332743]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Worcestershire County, Birmingham Road',
      latitude: 52.397166,
      longitude: -2.197306,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Worcestershire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-2.238314, 52.390989, -2.157214, 52.411511]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Warwickshire County, Birmingham Road',
      latitude: 52.441077,
      longitude: -1.633065,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Warwickshire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-1.687683, 52.42818, -1.57931, 52.446166]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Worcestershire County, Birmingham Road',
      latitude: 52.390373,
      longitude: -2.028207,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Worcestershire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-2.045841, 52.378616, -2.007429, 52.395891]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Worcestershire County, Birmingham Road',
      latitude: 52.291802,
      longitude: -1.884073,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Worcestershire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-1.895167, 52.274701, -1.873257, 52.309199]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Worcestershire County, Birmingham Road',
      latitude: 52.359552,
      longitude: -2.046353,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Worcestershire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-2.048294, 52.34668, -2.04523, 52.372606]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Warwickshire County, Birmingham Road',
      latitude: 52.234545,
      longitude: -1.73921,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Warwickshire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-1.745687, 52.223601, -1.733093, 52.245298]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Warwickshire County, Birmingham Road',
      latitude: 52.204149,
      longitude: -1.719456,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Warwickshire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-1.727191, 52.194821, -1.709054, 52.215799]
      }
    }, {
      formattedAddress: 'United Kingdom, England, Warwickshire County, Birmingham Road',
      latitude: 52.303005,
      longitude: -1.649945,
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Warwickshire County',
      city: undefined,
      streetName: 'Birmingham Road',
      streetNumber: undefined,
      extra: {
        bbox: [-1.691088, 52.285952, -1.595471, 52.351301]
      }
    }]
  },
  '40.714232,-73.9612889': {
    body: {
      response: {
        GeoObjectCollection: {
          metaDataProperty: {
            GeocoderResponseMetaData: {
              Point: {
                pos: '-73.961289 40.714232'
              },
              request: '-73.9612889,40.714232',
              results: '10',
              found: '7'
            }
          },
          featureMember: [{
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'street',
                  text: 'United States of America, New York, Bedford Avenue',
                  kind: 'street',
                  Address: {
                    country_code: 'US',
                    formatted: 'United States of America, New York, Bedford Avenue',
                    Components: [{
                      kind: 'country',
                      name: 'United States of America'
                    }, {
                      kind: 'province',
                      name: 'New York'
                    }, {
                      kind: 'locality',
                      name: 'New York'
                    }, {
                      kind: 'street',
                      name: 'Bedford Avenue'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United States of America, New York, Bedford Avenue',
                      CountryNameCode: 'US',
                      CountryName: 'United States of America',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'New York',
                        Locality: {
                          LocalityName: 'New York',
                          Thoroughfare: {
                            ThoroughfareName: 'Bedford Avenue'
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Bedford Avenue',
              description: 'New York, United States of America',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-73.964451 40.58356',
                  upperCorner: '-73.943592 40.724147'
                }
              },
              Point: {
                pos: '-73.956114 40.653586'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'United States of America, New York, Brooklyn Borough',
                  kind: 'district',
                  Address: {
                    country_code: 'US',
                    formatted: 'United States of America, New York, Brooklyn Borough',
                    Components: [{
                      kind: 'country',
                      name: 'United States of America'
                    }, {
                      kind: 'province',
                      name: 'New York'
                    }, {
                      kind: 'locality',
                      name: 'New York'
                    }, {
                      kind: 'district',
                      name: 'Brooklyn Borough'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United States of America, New York, Brooklyn Borough',
                      CountryNameCode: 'US',
                      CountryName: 'United States of America',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'New York',
                        Locality: {
                          LocalityName: 'New York',
                          DependentLocality: {
                            DependentLocalityName: 'Brooklyn Borough'
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Brooklyn Borough',
              description: 'New York, United States of America',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-74.05589 40.569203',
                  upperCorner: '-73.83716 40.739386'
                }
              },
              Point: {
                pos: '-73.956932 40.649666'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'United States of America, New York, New York',
                  kind: 'locality',
                  Address: {
                    country_code: 'US',
                    formatted: 'United States of America, New York, New York',
                    Components: [{
                      kind: 'country',
                      name: 'United States of America'
                    }, {
                      kind: 'province',
                      name: 'New York'
                    }, {
                      kind: 'locality',
                      name: 'New York'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United States of America, New York, New York',
                      CountryNameCode: 'US',
                      CountryName: 'United States of America',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'New York',
                        Locality: {
                          LocalityName: 'New York'
                        }
                      }
                    }
                  }
                }
              },
              name: 'New York',
              description: 'New York, United States of America',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-74.260464 40.495247',
                  upperCorner: '-73.700643 40.917998'
                }
              },
              Point: {
                pos: '-74.0028 40.714606'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'United States of America, New York, Suffolk',
                  kind: 'other',
                  Address: {
                    country_code: 'US',
                    formatted: 'United States of America, New York, Suffolk',
                    Components: [{
                      kind: 'country',
                      name: 'United States of America'
                    }, {
                      kind: 'province',
                      name: 'New York'
                    }, {
                      kind: 'other',
                      name: 'Suffolk'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United States of America, New York, Suffolk',
                      CountryNameCode: 'US',
                      CountryName: 'United States of America',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'New York',
                        Locality: {
                          Premise: {
                            PremiseName: 'Suffolk'
                          }
                        }
                      }
                    }
                  }
                }
              },
              name: 'Suffolk',
              description: 'New York, United States of America',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-74.042191 40.545997',
                  upperCorner: '-71.856195 41.203869'
                }
              },
              Point: {
                pos: '-73.259345 40.808798'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'United States of America, New York',
                  kind: 'province',
                  Address: {
                    country_code: 'US',
                    formatted: 'United States of America, New York',
                    Components: [{
                      kind: 'country',
                      name: 'United States of America'
                    }, {
                      kind: 'province',
                      name: 'New York'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United States of America, New York',
                      CountryNameCode: 'US',
                      CountryName: 'United States of America',
                      AdministrativeArea: {
                        AdministrativeAreaName: 'New York'
                      }
                    }
                  }
                }
              },
              name: 'New York',
              description: 'United States of America',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-79.762591 40.431767',
                  upperCorner: '-71.606517 45.0162'
                }
              },
              Point: {
                pos: '-75.145933 42.991409'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'United States of America',
                  kind: 'country',
                  Address: {
                    country_code: 'US',
                    formatted: 'United States of America',
                    Components: [{
                      kind: 'country',
                      name: 'United States of America'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'United States of America',
                      CountryNameCode: 'US',
                      CountryName: 'United States of America'
                    }
                  }
                }
              },
              name: 'United States of America',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-193.546088 16.530522',
                  upperCorner: '-66.910214 71.49891'
                }
              },
              Point: {
                pos: '-99.115868 36.952915'
              }
            }
          }, {
            GeoObject: {
              metaDataProperty: {
                GeocoderMetaData: {
                  precision: 'other',
                  text: 'Atlantic Ocean',
                  kind: 'hydro',
                  Address: {
                    formatted: 'Atlantic Ocean',
                    Components: [{
                      kind: 'hydro',
                      name: 'Atlantic Ocean'
                    }]
                  },
                  AddressDetails: {
                    Country: {
                      AddressLine: 'Atlantic Ocean',
                      CountryName: 'Atlantic Ocean'
                    }
                  }
                }
              },
              name: 'Atlantic Ocean',
              boundedBy: {
                Envelope: {
                  lowerCorner: '-75.652789 -71.858219',
                  upperCorner: '18.488901 68.57962'
                }
              },
              Point: {
                pos: '-21.80098 -25.013453'
              }
            }
          }]
        }
      }
    },
    expResults: [{
      formattedAddress: 'United States of America, New York, Bedford Avenue',
      latitude: 40.653586,
      longitude: -73.956114,
      country: 'United States of America',
      countryCode: 'US',
      state: 'New York',
      county: undefined,
      city: 'New York',
      streetName: 'Bedford Avenue',
      streetNumber: undefined,
      extra: {
        bbox: [-73.964451, 40.58356, -73.943592, 40.724147]
      }
    }, {
      formattedAddress: 'United States of America, New York, Brooklyn Borough',
      latitude: 40.649666,
      longitude: -73.956932,
      country: 'United States of America',
      countryCode: 'US',
      state: 'New York',
      county: undefined,
      city: 'New York',
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-74.05589, 40.569203, -73.83716, 40.739386]
      }
    }, {
      formattedAddress: 'United States of America, New York, New York',
      latitude: 40.714606,
      longitude: -74.0028,
      country: 'United States of America',
      countryCode: 'US',
      state: 'New York',
      county: undefined,
      city: 'New York',
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-74.260464, 40.495247, -73.700643, 40.917998]
      }
    }, {
      formattedAddress: 'United States of America, New York, Suffolk',
      latitude: 40.808798,
      longitude: -73.259345,
      country: 'United States of America',
      countryCode: 'US',
      state: 'New York',
      county: undefined,
      city: undefined,
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-74.042191, 40.545997, -71.856195, 41.203869]
      }
    }, {
      formattedAddress: 'United States of America, New York',
      latitude: 42.991409,
      longitude: -75.145933,
      country: 'United States of America',
      countryCode: 'US',
      state: 'New York',
      county: undefined,
      city: undefined,
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-79.762591, 40.431767, -71.606517, 45.0162]
      }
    }, {
      formattedAddress: 'United States of America',
      latitude: 36.952915,
      longitude: -99.115868,
      country: 'United States of America',
      countryCode: 'US',
      state: undefined,
      county: undefined,
      city: undefined,
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-193.546088, 16.530522, -66.910214, 71.49891]
      }
    }, {
      formattedAddress: 'Atlantic Ocean',
      latitude: -25.013453,
      longitude: -21.80098,
      country: 'Atlantic Ocean',
      countryCode: undefined,
      state: undefined,
      county: undefined,
      city: undefined,
      streetName: undefined,
      streetNumber: undefined,
      extra: {
        bbox: [-75.652789, -71.858219, 18.488901, 68.57962]
      }
    }]
  },
  forward: {
    formattedAddress: 'Франция, Париж, VIII округ Парижа, Елисейские Поля, 5',
    latitude: 48.866193,
    longitude: 2.316495,
    country: 'Франция',
    countryCode: 'FR',
    state: 'Иль-де-Франс',
    county: undefined,
    city: 'Париж',
    streetName: 'Елисейские Поля',
    streetNumber: '5',
    extra: {
      bbox: [2.312389, 48.863485, 2.3206, 48.868902]
    }
  },
  reverse: {
    formattedAddress: 'Соединённые Штаты Америки, штат Нью-Йорк, район Бруклин, авеню Бедфорд',
    latitude: 40.653586,
    longitude: -73.956114,
    country: 'Соединённые Штаты Америки',
    countryCode: 'US',
    state: 'штат Нью-Йорк',
    county: undefined,
    city: 'Нью-Йорк',
    streetName: 'авеню Бедфорд',
    streetNumber: undefined,
    extra: {
      bbox: [-73.964451, 40.58356, -73.943592, 40.724147]
    }
  }
}
export default m

export const fixtures = m
