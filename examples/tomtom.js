import dotenv from 'dotenv'
import { argv } from './argv.js'
import { fetchAdapter, TomTomGeocoder } from '../src/index.js'

dotenv.config()

const { TOMTOM_APIKEY: apiKey, FORWARD, REVERSE, LANGUAGE } = process.env
const { forward, reverse, ...other } = argv({
  forward: FORWARD,
  reverse: REVERSE
})

const adapter = fetchAdapter()
const geocoder = new TomTomGeocoder(adapter, {
  apiKey,
  language: LANGUAGE,
  ...other
})

const promise = reverse ? geocoder.reverse(reverse) : geocoder.forward(forward)
promise.then((res) => console.dir(res, { depth: null })).catch(console.error)
