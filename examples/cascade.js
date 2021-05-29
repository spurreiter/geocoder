import dotenv from 'dotenv'
import { argv } from './argv.js'
import { Cascade, fetchAdapter, HereGeocoder, OsmGeocoder } from '../src/index.js'

dotenv.config()

const { HERE_APIKEY: apiKey, FORWARD, REVERSE, LANGUAGE } = process.env
const { forward, reverse, ...other } = argv({ forward: FORWARD, reverse: REVERSE })

const adapter = fetchAdapter()

const geocoders = [
  new HereGeocoder(adapter, { apiKey, language: LANGUAGE, ...other }),
  new OsmGeocoder(adapter, { language: LANGUAGE, ...other })
]
const cascade = new Cascade(geocoders)

const promise = reverse
  ? cascade.reverse(reverse)
  : cascade.forward(forward)
promise
  .then(res => console.dir(res, { depth: null }))
  .catch(console.error)
