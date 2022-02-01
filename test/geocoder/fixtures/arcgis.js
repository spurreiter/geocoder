export const fixtures = {
  '135 pilkington avenue, birmingham': {
    body: {
      spatialReference: { wkid: 4326, latestWkid: 4326 },
      candidates: [
        {
          address: '135 Pilkington Avenue, Wylde Green, Sutton Coldfield, West Midlands, England, B72 1LH',
          location: { x: -1.8160966054189729, y: 52.54869661680167 },
          score: 97.45,
          attributes: {
            LongLabel: '135 Pilkington Avenue, Wylde Green, Sutton Coldfield, West Midlands, England, B72 1LH, GBR',
            Addr_type: 'StreetAddress',
            Type: '',
            PlaceName: '',
            Place_addr: '135 Pilkington Avenue, Wylde Green, Sutton Coldfield, West Midlands, England, B72 1LH',
            Rank: 20,
            AddNum: '135',
            StPreDir: '',
            StName: 'Pilkington',
            StType: 'Avenue',
            City: 'Sutton Coldfield',
            Region: 'England',
            Postal: 'B72 1LH',
            Country: 'GBR'
          },
          extent: {
            xmin: -1.8170966054189728,
            ymin: 52.54769661680167,
            xmax: -1.815096605418973,
            ymax: 52.54969661680167
          }
        },
        {
          address: '135 Packington Avenue, Birmingham, West Midlands, England, B34 7',
          location: { x: -1.7725176463579642, y: 52.493721559682136 },
          score: 94.03,
          attributes: {
            LongLabel: '135 Packington Avenue, Birmingham, West Midlands, England, B34 7, GBR',
            Addr_type: 'StreetAddress',
            Type: '',
            PlaceName: '',
            Place_addr: '135 Packington Avenue, Birmingham, West Midlands, England, B34 7',
            Rank: 20,
            AddNum: '135',
            StPreDir: '',
            StName: 'Packington',
            StType: 'Avenue',
            City: 'Birmingham',
            Region: 'England',
            Postal: 'B34 7',
            Country: 'GBR'
          },
          extent: {
            xmin: -1.773517646357964,
            ymin: 52.49272155968214,
            xmax: -1.7715176463579643,
            ymax: 52.494721559682134
          }
        },
        {
          address: 'Packington Avenue, Birmingham, West Midlands, England, B34 7',
          location: { x: -1.7718263463743127, y: 52.494327588929764 },
          score: 86.59,
          attributes: {
            LongLabel: 'Packington Avenue, Birmingham, West Midlands, England, B34 7, GBR',
            Addr_type: 'StreetName',
            Type: '',
            PlaceName: '',
            Place_addr: 'Packington Avenue, Birmingham, West Midlands, England, B34 7',
            Rank: 20,
            AddNum: '',
            StPreDir: '',
            StName: 'Packington',
            StType: 'Avenue',
            City: 'Birmingham',
            Region: 'England',
            Postal: 'B34 7',
            Country: 'GBR'
          },
          extent: {
            xmin: -1.7728263463743126,
            ymin: 52.493327588929766,
            xmax: -1.7708263463743128,
            ymax: 52.49532758892976
          }
        }
      ]
    },
    expResults: [
      {
        formattedAddress: '135 Pilkington Avenue, Wylde Green, Sutton Coldfield, West Midlands, England, B72 1LH, GBR',
        latitude: 52.54869661680167,
        longitude: -1.8160966054189729,
        country: 'United Kingdom',
        countryCode: 'GB',
        state: 'England',
        city: 'Sutton Coldfield',
        zipcode: 'B72 1LH',
        streetName: 'Pilkington Avenue',
        streetNumber: '135',
        extra: {
          confidence: 0.9745,
          type: undefined,
          placeName: undefined,
          addrType: 'StreetAddress',
          rank: 20,
          bbox: [
            -1.8170966054189728,
            52.54769661680167,
            -1.815096605418973,
            52.54969661680167
          ]
        }
      },
      {
        formattedAddress: '135 Packington Avenue, Birmingham, West Midlands, England, B34 7, GBR',
        latitude: 52.493721559682136,
        longitude: -1.7725176463579642,
        country: 'United Kingdom',
        countryCode: 'GB',
        state: 'England',
        city: 'Birmingham',
        zipcode: 'B34 7',
        streetName: 'Packington Avenue',
        streetNumber: '135',
        extra: {
          confidence: 0.9403,
          type: undefined,
          placeName: undefined,
          addrType: 'StreetAddress',
          rank: 20,
          bbox: [
            -1.773517646357964,
            52.49272155968214,
            -1.7715176463579643,
            52.494721559682134
          ]
        }
      },
      {
        formattedAddress: 'Packington Avenue, Birmingham, West Midlands, England, B34 7, GBR',
        latitude: 52.494327588929764,
        longitude: -1.7718263463743127,
        country: 'United Kingdom',
        countryCode: 'GB',
        state: 'England',
        city: 'Birmingham',
        zipcode: 'B34 7',
        streetName: 'Packington Avenue',
        streetNumber: undefined,
        extra: {
          confidence: 0.8659,
          type: undefined,
          placeName: undefined,
          addrType: 'StreetName',
          rank: 20,
          bbox: [
            -1.7728263463743126,
            52.493327588929766,
            -1.7708263463743128,
            52.49532758892976
          ]
        }
      }
    ]
  },
  '40.714232,-73.9612889': {
    body: {
      address: {
        Match_addr: 'Chocolat Michel Cluizel',
        LongLabel: 'Chocolat Michel Cluizel, 279 Bedford Ave, Brooklyn, NY, 11211, USA',
        ShortLabel: 'Chocolat Michel Cluizel',
        Addr_type: 'POI',
        Type: 'Specialty Store',
        PlaceName: 'Chocolat Michel Cluizel',
        AddNum: '279',
        Address: '279 Bedford Ave',
        Block: '',
        Sector: '',
        Neighborhood: '',
        District: '',
        City: 'Brooklyn',
        MetroArea: '',
        Subregion: 'Kings County',
        Region: 'New York',
        Territory: '',
        Postal: '11211',
        PostalExt: '',
        CountryCode: 'USA'
      },
      location: {
        x: -73.96131499999996,
        y: 40.71420500000005,
        spatialReference: { wkid: 4326, latestWkid: 4326 }
      }
    },
    expResults: [
      {
        formattedAddress: 'Chocolat Michel Cluizel, 279 Bedford Ave, Brooklyn, NY, 11211, USA',
        latitude: 40.71420500000005,
        longitude: -73.96131499999996,
        country: 'United States of America',
        countryCode: 'US',
        state: 'New York',
        city: 'Brooklyn',
        zipcode: '11211',
        streetName: 'Bedford Ave',
        streetNumber: '279',
        extra: {
          type: 'Specialty Store',
          placeName: 'Chocolat Michel Cluizel',
          addrType: 'POI'
        }
      }
    ]
  },
  forward: {
    formattedAddress: '1 Arcades des Champs Elysées, 75008, 8e Arrondissement, Paris, Île-de-France, FRA',
    latitude: 48.87173298693807,
    longitude: 2.3045290085973704,
    country: 'France',
    countryCode: 'FR',
    state: 'Île-de-France',
    city: 'Paris',
    zipcode: '75008',
    streetName: 'Champs Elysées',
    streetNumber: '1',
    extra: {
      confidence: 0.9617,
      type: undefined,
      placeName: undefined,
      addrType: 'PointAddress',
      rank: 20,
      bbox: [
        2.3035290085973705,
        48.87073298693807,
        2.3055290085973703,
        48.87273298693807
      ]
    }
  },
  reverse: {
    formattedAddress: 'Chocolat Michel Cluizel, 279 Bedford Ave, Brooklyn, NY, 11211, USA',
    latitude: 40.71418600000004,
    longitude: -73.96128499999998,
    country: 'United States of America',
    countryCode: 'US',
    state: 'New York',
    city: 'Brooklyn',
    zipcode: '11211',
    streetName: 'Bedford Ave',
    streetNumber: '279',
    extra: {
      type: 'Specialty Store',
      placeName: 'Chocolat Michel Cluizel',
      addrType: 'POI'
    }
  }
}
