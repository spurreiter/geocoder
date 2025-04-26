import dotenv from 'dotenv'
import { argv } from './argv.js'
import { fetchAdapter, OpenMapQuestGeocoder } from '../src/index.js'

dotenv.config()

const { MAPQUEST_APIKEY, FORWARD, REVERSE, LANGUAGE } = process.env
const { forward, reverse, ...other } = argv({
  forward: FORWARD,
  reverse: REVERSE
})

const adapter = fetchAdapter()
const geocoder = new OpenMapQuestGeocoder(adapter, {
  apiKey: MAPQUEST_APIKEY,
  language: LANGUAGE,
  ...other
})

const promise = reverse ? geocoder.reverse(reverse) : geocoder.forward(forward)
promise.then((res) => console.dir(res, { depth: null })).catch(console.error)
