import dotenv from 'dotenv'
import { argv } from './argv.js'
import { fetchAdapter, TeleportGeocoder } from '../src/index.js'

dotenv.config()

const { FORWARD, REVERSE, LANGUAGE } = process.env
const { forward, reverse, ...other } = argv({ forward: FORWARD, reverse: REVERSE })

const adapter = fetchAdapter()
const geocoder = new TeleportGeocoder(adapter, { language: LANGUAGE, ...other })

const promise = reverse
  ? geocoder.reverse(reverse)
  : geocoder.forward(forward)
promise
  .then(res => console.dir(res, { depth: null }))
  .catch(console.error)
