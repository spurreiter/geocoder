import dotenv from 'dotenv'
import { argv } from './argv.js'
import { fetchAdapter, LocalGeoip2Geocoder } from '../src/index.js'

dotenv.config()

const { FORWARD, LANGUAGE } = process.env
const { forward, ...other } = argv({ forward: FORWARD })

const adapter = fetchAdapter()
const geocoder = new LocalGeoip2Geocoder(adapter, { language: LANGUAGE, ...other })

geocoder.forward(forward)
  .then(res => console.dir(res, { depth: null }))
  .catch(console.error)
