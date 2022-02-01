import dotenv from 'dotenv'

dotenv.config()

export function itWithApiKey (apiKey, name, fn, isOnly = false) {
  if (!apiKey) {
    return it.skip(name, fn)
  } else {
    return isOnly ? it.only(name, fn) : it(name, fn)
  }
}

itWithApiKey.only = (envVar, name, fn) => itWithApiKey(envVar, name, fn, true)
