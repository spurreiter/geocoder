const m = {
  '1 champs élysée Paris': {
    body: {
      type: 'FeatureCollection',
      version: 'draft',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.302859, 48.871285]
        },
        properties: {
          label: 'Avenue des Champs Elys\u005Cu00e9es 75008 Paris',
          score: 0.565457184750733,
          id: '75108_1733',
          name: 'Avenue des Champs Elys\u005Cu00e9es',
          postcode: '75008',
          citycode: '75108',
          x: 648863.24,
          y: 6863698.94,
          city: 'Paris',
          district: 'Paris 8e Arrondissement',
          context: '75, Paris, \u005Cu00cele-de-France',
          type: 'street',
          importance: 0.7039
        }
      }, {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.314339, 48.864193]
        },
        properties: {
          label: '1 Port des Champs Elys\u005Cu00e9es 75008 Paris',
          score: 0.5492108211143695,
          housenumber: '1',
          id: '75108_1734_00001',
          name: '1 Port des Champs Elys\u005Cu00e9es',
          postcode: '75008',
          citycode: '75108',
          x: 649698.45,
          y: 6862902.99,
          city: 'Paris',
          district: 'Paris 8e Arrondissement',
          context: '75, Paris, \u005Cu00cele-de-France',
          type: 'housenumber',
          importance: 0.52519,
          street: 'Port des Champs Elys\u005Cu00e9es'
        }
      }, {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.304529, 48.871733]
        },
        properties: {
          label: '1 Arcades des Champs Elys\u005Cu00e9es 75008 Paris',
          score: 0.5049637967914438,
          housenumber: '1',
          id: '75108_1732_00001',
          name: '1 Arcades des Champs Elys\u005Cu00e9es',
          postcode: '75008',
          citycode: '75108',
          x: 648986.17,
          y: 6863747.67,
          city: 'Paris',
          district: 'Paris 8e Arrondissement',
          context: '75, Paris, \u005Cu00cele-de-France',
          type: 'housenumber',
          importance: 0.52519,
          street: 'Arcades des Champs Elys\u005Cu00e9es'
        }
      }, {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1.609799, 50.511589]
        },
        properties: {
          label: 'Allee des Champs Elysees 62520 Le Touquet-Paris-Plage',
          score: 0.4399588714733542,
          id: '62826_0239',
          name: 'Allee des Champs Elysees',
          postcode: '62520',
          citycode: '62826',
          x: 601243.68,
          y: 7046900.34,
          city: 'Le Touquet-Paris-Plage',
          context: '62, Pas-de-Calais, Hauts-de-France',
          type: 'street',
          importance: 0.49472
        }
      }, {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.317179, 48.869598]
        },
        properties: {
          label: 'Rue de l\u005Cu2019Elys\u005Cu00e9e 75008 Paris',
          score: 0.40505935064935056,
          id: '75108_3190',
          name: 'Rue de l\u005Cu2019Elys\u005Cu00e9e',
          postcode: '75008',
          citycode: '75108',
          x: 649911.99,
          y: 6863502.18,
          city: 'Paris',
          district: 'Paris 8e Arrondissement',
          context: '75, Paris, \u005Cu00cele-de-France',
          type: 'street',
          importance: 0.59851
        }
      }],
      attribution: 'BAN',
      licence: 'ETALAB-2.0',
      query: '1 champs \u005Cu00e9lys\u005Cu00e9e Paris',
      limit: 5
    },
    expResults: [{
      formattedAddress: 'Avenue des Champs Elys\u005Cu00e9es 75008 Paris',
      latitude: 48.871285,
      longitude: 2.302859,
      country: 'France',
      countryCode: 'FR',
      state: '75, Paris, \u005Cu00cele-de-France',
      city: 'Paris',
      zipcode: '75008',
      citycode: '75108',
      extra: {
        id: '75108_1733',
        confidence: 0.5655
      },
      streetName: 'Avenue des Champs Elys\u005Cu00e9es'
    }, {
      formattedAddress: '1 Port des Champs Elys\u005Cu00e9es 75008 Paris',
      latitude: 48.864193,
      longitude: 2.314339,
      country: 'France',
      countryCode: 'FR',
      state: '75, Paris, \u005Cu00cele-de-France',
      city: 'Paris',
      zipcode: '75008',
      citycode: '75108',
      extra: {
        id: '75108_1734_00001',
        confidence: 0.5492
      },
      streetName: 'Port des Champs Elys\u005Cu00e9es',
      streetNumber: '1'
    }, {
      formattedAddress: '1 Arcades des Champs Elys\u005Cu00e9es 75008 Paris',
      latitude: 48.871733,
      longitude: 2.304529,
      country: 'France',
      countryCode: 'FR',
      state: '75, Paris, \u005Cu00cele-de-France',
      city: 'Paris',
      zipcode: '75008',
      citycode: '75108',
      extra: {
        id: '75108_1732_00001',
        confidence: 0.505
      },
      streetName: 'Arcades des Champs Elys\u005Cu00e9es',
      streetNumber: '1'
    }, {
      formattedAddress: 'Allee des Champs Elysees 62520 Le Touquet-Paris-Plage',
      latitude: 50.511589,
      longitude: 1.609799,
      country: 'France',
      countryCode: 'FR',
      state: '62, Pas-de-Calais, Hauts-de-France',
      city: 'Le Touquet-Paris-Plage',
      zipcode: '62520',
      citycode: '62826',
      extra: {
        id: '62826_0239',
        confidence: 0.44
      },
      streetName: 'Allee des Champs Elysees'
    }, {
      formattedAddress: 'Rue de l\u005Cu2019Elys\u005Cu00e9e 75008 Paris',
      latitude: 48.869598,
      longitude: 2.317179,
      country: 'France',
      countryCode: 'FR',
      state: '75, Paris, \u005Cu00cele-de-France',
      city: 'Paris',
      zipcode: '75008',
      citycode: '75108',
      extra: {
        id: '75108_3190',
        confidence: 0.4051
      },
      streetName: 'Rue de l\u005Cu2019Elys\u005Cu00e9e'
    }]
  },
  '135 pilkington avenue, birmingham': {
    body: {
      type: 'FeatureCollection',
      version: 'draft',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [4.812126, 45.775294]
        },
        properties: {
          label: 'Avenue de Birmingham 69004 Lyon',
          score: 0.43272491978609623,
          id: '69384_0920',
          name: 'Avenue de Birmingham',
          postcode: '69004',
          citycode: '69384',
          x: 840806.08,
          y: 6521135.92,
          city: 'Lyon',
          district: 'Lyon 4e Arrondissement',
          context: '69, Rhône, Auvergne-Rhône-Alpes',
          type: 'street',
          importance: 0.52468
        }
      }, {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [4.812218, 45.774574]
        },
        properties: {
          label: 'Avenue de Birmingham 69004 Lyon',
          score: 0.43088219251336896,
          type: 'locality',
          importance: 0.50441,
          id: '69384_0920',
          name: 'Avenue de Birmingham',
          postcode: '69004',
          citycode: '69384',
          x: 840815.06,
          y: 6521056.15,
          city: 'Lyon',
          district: 'Lyon 4e Arrondissement',
          context: '69, Rhône, Auvergne-Rhône-Alpes'
        }
      }],
      attribution: 'BAN',
      licence: 'ETALAB-2.0',
      query: '135 pilkington avenue, birmingham',
      limit: 5
    },
    expResults: [{
      formattedAddress: 'Avenue de Birmingham 69004 Lyon',
      latitude: 45.775294,
      longitude: 4.812126,
      country: 'France',
      countryCode: 'FR',
      state: '69, Rhône, Auvergne-Rhône-Alpes',
      city: 'Lyon',
      zipcode: '69004',
      citycode: '69384',
      extra: {
        id: '69384_0920',
        confidence: 0.4327
      },
      streetName: 'Avenue de Birmingham'
    }, {
      formattedAddress: 'Avenue de Birmingham 69004 Lyon',
      latitude: 45.774574,
      longitude: 4.812218,
      country: 'France',
      countryCode: 'FR',
      state: '69, Rhône, Auvergne-Rhône-Alpes',
      city: 'Lyon',
      zipcode: '69004',
      citycode: '69384',
      extra: {
        id: '69384_0920',
        confidence: 0.4309
      },
      streetName: 'Avenue de Birmingham'
    }]
  },
  '48.357,2.37': {
    body: {
      type: 'FeatureCollection',
      version: 'draft',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.371056, 48.355615]
        },
        properties: {
          label: '23 Chemin de Pithiviers 91720 Prunay-sur-Essonne',
          score: 0.9999880927779257,
          housenumber: '23',
          id: '91507_b009_00023',
          name: '23 Chemin de Pithiviers',
          postcode: '91720',
          citycode: '91507',
          x: 653408.9,
          y: 6806330.63,
          city: 'Prunay-sur-Essonne',
          context: '91, Essonne, \u005Cu00cele-de-France',
          type: 'housenumber',
          importance: 0.26574,
          street: 'Chemin de Pithiviers',
          distance: 172
        }
      }],
      attribution: 'BAN',
      licence: 'ETALAB-2.0',
      limit: 1
    },
    expResults: [{
      formattedAddress: '23 Chemin de Pithiviers 91720 Prunay-sur-Essonne',
      latitude: 48.355615,
      longitude: 2.371056,
      country: 'France',
      countryCode: 'FR',
      state: '91, Essonne, \u005Cu00cele-de-France',
      city: 'Prunay-sur-Essonne',
      zipcode: '91720',
      citycode: '91507',
      extra: {
        id: '91507_b009_00023',
        confidence: 1
      },
      streetName: 'Chemin de Pithiviers',
      streetNumber: '23'
    }]
  },
  forward: {
    formattedAddress: 'Avenue des Champs Elysées 75008 Paris',
    latitude: 48.871285,
    longitude: 2.302859,
    country: 'France',
    countryCode: 'FR',
    state: '75, Paris, Île-de-France',
    city: 'Paris',
    zipcode: '75008',
    citycode: '75108',
    extra: {
      id: '75108_1733',
      confidence: 0.5658
    },
    streetName: 'Avenue des Champs Elysées'
  },
  reverse: {
    formattedAddress: '12 Place Saint-Etienne 57000 Metz',
    latitude: 49.120295,
    longitude: 6.175231,
    country: 'France',
    countryCode: 'FR',
    state: '57, Moselle, Grand Est',
    city: 'Metz',
    zipcode: '57000',
    citycode: '57463',
    extra: {
      id: '57463_5920_00012',
      confidence: 1
    },
    streetName: 'Place Saint-Etienne',
    streetNumber: '12'
  }
}
export default m

export const fixtures = m
