import dotenv from 'dotenv'
import { argv } from './argv.js'
import { fetchAdapter, ArcGisGeocoder } from '../src/index.js'

dotenv.config()

const { ARCGIS_APIKEY: apiKey, FORWARD, REVERSE, LANGUAGE } = process.env
const { forward, reverse, ...other } = argv({ forward: FORWARD, reverse: REVERSE })

const adapter = fetchAdapter()
const geocoder = new ArcGisGeocoder(adapter, { apiKey, language: LANGUAGE, ...other })

const promise = reverse
  ? geocoder.reverse(reverse)
  : geocoder.forward(forward)
promise
  .then(res => console.dir(res, { depth: null }))
  // .catch(err => console.error)
  .catch(err => {
    console.dir(err, { depth: null })
    return err.response.text()
  })
  .then(console.log)
