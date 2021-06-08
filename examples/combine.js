import dotenv from 'dotenv'
import { argv } from './argv.js'
import { Combine, fetchAdapter, HereGeocoder, OsmGeocoder, GeoLite2Geocoder } from '../src/index.js'

dotenv.config()

const { HERE_APIKEY: apiKey, FORWARD, REVERSE, LANGUAGE } = process.env
const { forward, reverse, ...other } = argv({ forward: FORWARD, reverse: REVERSE })

const adapter = fetchAdapter()

const geocoders = [
  new HereGeocoder(adapter, { apiKey, language: LANGUAGE, ...other }),
  new OsmGeocoder(adapter, { language: LANGUAGE, ...other }),
  new GeoLite2Geocoder(adapter)
]
const combine = new Combine(geocoders)

const promise = reverse
  ? combine.reverse(reverse)
  : combine.forward(forward)
promise
  .then(res => console.dir(res, { depth: null }))
  .catch(console.error)
