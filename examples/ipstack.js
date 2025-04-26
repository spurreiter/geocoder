import dotenv from 'dotenv'
import { argv } from './argv.js'
import { fetchAdapter, IpStackGeocoder } from '../src/index.js'

dotenv.config()

const { IPSTACK_APIKEY: apiKey, FORWARD_IP } = process.env
const { forward } = argv({ forward: FORWARD_IP })

const adapter = fetchAdapter()
const geocoder = new IpStackGeocoder(adapter, { apiKey })

geocoder
  .forward(forward)
  .then((res) => console.dir(res, { depth: null }))
  .catch(console.error)
