# 2.2.0 (2025-04-26)

- chore: move to eslint-prettier (#9f6d238)

# 2.1.1 (2024-11-04)

- docs: fix table (#ee4b0d8)

# 2.1.0 (2024-11-04)

- fix: types (#4310e40)
- feat(mapbox): rework code (#bb9e81c)
- feat(mapbox): fix formatResult to follow guidelines of other providers + adapt tests to mapbox api v6 (#f3d2d16)
- feat(mapbox): avoid breaking typing (#ab2cb99)
- return whole match_code object and avoid encoding address twice (#76bd147)
- feat(mapbox): update to mapbox api v6 (#04100c2)
- docs(README): reformat, update CI badge (#aa19b7b)
- chore: update env template (#396acd2)

# 2.0.0 (2024-07-13)

- chore: use node 20 + 22 for actions (#34d4f7b)
- test: disable free geocoding tests to pass github actions (#d4cdf6e)
- fix: mapquest use licensed data (#a108e5e)
- docs: update README (#580195a)
- feat!: OSM requires referer header (#11fcc7a)
- feat!: discontinue support for teleport (#b4af01d)
- chore(mocha): increase timeout (#9011dcb)

# 1.5.5 (2023-10-21)

- fix: update geocod.io to v1.7 API (#f0e60fc)
- chore: fix failing osm tests (#e84a573)

# 1.5.4 (2023-09-24)

- chore: bump dependencies (#0159432)
- chore: fix tests (#594111b)

# 1.5.3 (2022-12-04)

- chore: bump dependencies (#0b826b5)

# 1.5.2 (2022-05-28)

- chore: bump dependencies (#2088067)

# 1.5.1 (2022-05-12)

- chore: git actions for pushes on all branches (#e5a12ba)
- chore: bump dependencies (#1c10765)
- fix: types export (#5ccd342)
- chore: bump dependencies (#18f09cf)
- test: fix tests (#fd54d9a)
- chore: env example add TOMTOM_APIKEY (#3a67a1e)

# 1.5.0 (2022-02-12)

- docu: add some badges (#395d658)
- test: fix test for gh actions (#de65c2c)
- chore: enable github actions (#1609e5d)
- feat: TomTom geocoder (#0c4bd71)

# 1.4.1 (2022-02-01)

- test: add online tests if api key is available (#3d0316a)
- fix: types (#70d5eeb)
- fix: typings (#15cd17b)

# 1.4.0 (2021-06-10)

- feat: OpenMapQuestGeocoder (#7138da5)
- docs: fix typos (#ce9b141)

# 1.3.0 (2021-06-10)

- feat: rename LocalGeoIp2 to GeoLite2 geocoder (#2b48653)
- docs: formatter (#0d9c3b2)

# 1.2.1 (2021-06-06)

- fix: normalize country-code to iso-3166-1 alpha2 (#f6b3dd6)
- docs: package.json homepage (#b5b089f)

# 1.2.0 (2021-06-05)

- test: gpx formatter escape chars (#28cd4fe)
- docs: fix jsdoc dashes (#41e2cb6)
- fix: wrap error with 400 status (#643f4dc)
- fix: typings (#6da810f)
- feat: gpx formatter (#fbfd073)
- fix: geojson geocoding add version (#b91e7b9)

# 1.1.0 (2021-05-30)

- fix: typings (#6bcd894)
- feat: geojson formatter (#37e9379)
- feat: geocoder opendatafrance (#ec21f6d)
- fix: exclude unsupported ip lookup from circuitbreaker (#b075a6d)
- docs: yandex geocoder options (#8751f93)
- docs: package.json (#34663df)
- test: fix filename (#c63c3f5)
- feat: yandex geocoder (#569daeb)
- feat: pickpoint geocoder (#16fe177)
- docs: fix spelling (#a03f7d6)
- chore: fix package.json (#ed626d5)

# 1.0.0 (2021-05-29)

- chore: fix package.json (#597c552)
- feat: various geocode providers (#3578504)
- Initial commit (#4fb89ea)
