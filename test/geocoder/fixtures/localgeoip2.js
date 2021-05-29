export const fixtures = {
  '66.249.64.0': {
    body: {
      continent: {
        code: 'NA',
        geonameId: 6255149,
        names: {
          de: 'Nordamerika',
          en: 'North America',
          es: 'Norteamérica',
          fr: 'Amérique du Nord',
          ja: '北アメリカ',
          'pt-BR': 'América do Norte',
          ru: 'Северная Америка',
          'zh-CN': '北美洲'
        }
      },
      country: {
        geonameId: 6252001,
        isoCode: 'US',
        names: {
          de: 'USA',
          en: 'United States',
          es: 'Estados Unidos',
          fr: 'États-Unis',
          ja: 'アメリカ合衆国',
          'pt-BR': 'Estados Unidos',
          ru: 'США',
          'zh-CN': '美国'
        }
      },
      registeredCountry: {
        geonameId: 6252001,
        isoCode: 'US',
        names: {
          de: 'USA',
          en: 'United States',
          es: 'Estados Unidos',
          fr: 'États-Unis',
          ja: 'アメリカ合衆国',
          'pt-BR': 'Estados Unidos',
          ru: 'США',
          'zh-CN': '美国'
        },
        isInEuropeanUnion: false
      },
      traits: {
        isAnonymous: false,
        isAnonymousProxy: false,
        isAnonymousVpn: false,
        isHostingProvider: false,
        isLegitimateProxy: false,
        isPublicProxy: false,
        isResidentialProxy: false,
        isSatelliteProvider: false,
        isTorExitNode: false,
        ipAddress: '66.249.64.0',
        network: '66.249.64.0/22'
      },
      location: {
        accuracyRadius: 1000,
        latitude: 37.751,
        longitude: -97.822,
        timeZone: 'America/Chicago'
      }
    },
    expResults: [
      {
        ip: '66.249.64.0',
        latitude: 37.751,
        longitude: -97.822,
        countryCode: 'US',
        country: 'United States',
        extra: {
          id: 6252001,
          accuracyRadius: 1000,
          isInEuropeanUnion: false,
          timeZone: 'America/Chicago',
          network: '66.249.64.0/22'
        }
      }
    ]
  },
  '2001:8003:713f:2f00:f9d2:16e5:38e4:adc3': {
    body: {
      continent: {
        code: 'OC',
        geonameId: 6255151,
        names: {
          de: 'Ozeanien',
          en: 'Oceania',
          es: 'Oceanía',
          fr: 'Océanie',
          ja: 'オセアニア',
          'pt-BR': 'Oceania',
          ru: 'Океания',
          'zh-CN': '大洋洲'
        }
      },
      country: {
        geonameId: 2077456,
        isoCode: 'AU',
        names: {
          de: 'Australien',
          en: 'Australia',
          es: 'Australia',
          fr: 'Australie',
          ja: 'オーストラリア',
          'pt-BR': 'Austrália',
          ru: 'Австралия',
          'zh-CN': '澳大利亚'
        }
      },
      registeredCountry: {
        geonameId: 2077456,
        isoCode: 'AU',
        names: {
          de: 'Australien',
          en: 'Australia',
          es: 'Australia',
          fr: 'Australie',
          ja: 'オーストラリア',
          'pt-BR': 'Austrália',
          ru: 'Австралия',
          'zh-CN': '澳大利亚'
        },
        isInEuropeanUnion: false
      },
      traits: {
        isAnonymous: false,
        isAnonymousProxy: false,
        isAnonymousVpn: false,
        isHostingProvider: false,
        isLegitimateProxy: false,
        isPublicProxy: false,
        isResidentialProxy: false,
        isSatelliteProvider: false,
        isTorExitNode: false,
        ipAddress: '2001:8003:713f:2f00:f9d2:16e5:38e4:adc3',
        network: '2001:8003:7100::/40'
      },
      city: {
        geonameId: 2174003,
        names: {
          de: 'Brisbane',
          en: 'Brisbane',
          es: 'Brisbane',
          fr: 'Brisbane',
          ja: 'ブリスベン',
          'pt-BR': 'Brisbane',
          ru: 'Брисбен',
          'zh-CN': '布里斯班'
        }
      },
      location: {
        accuracyRadius: 50,
        latitude: -27.4732,
        longitude: 153.0215,
        timeZone: 'Australia/Brisbane'
      },
      postal: { code: '4000' },
      subdivisions: [
        {
          geonameId: 2152274,
          isoCode: 'QLD',
          names: { en: 'Queensland', 'pt-BR': 'Queensland', ru: 'Квинсленд' }
        }
      ]
    },
    expResults: [
      {
        ip: '2001:8003:713f:2f00:f9d2:16e5:38e4:adc3',
        latitude: -27.4732,
        longitude: 153.0215,
        countryCode: 'AU',
        country: 'Australia',
        extra: {
          id: 2077456,
          accuracyRadius: 50,
          isInEuropeanUnion: false,
          timeZone: 'Australia/Brisbane',
          network: '2001:8003:7100::/40'
        }
      }
    ]
  }
}
