import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import serialize from 'serialize-to-module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const WRITE = process.env.WRITE_FIXTURES === 'true'

export const updateFixture = (fixtures, prop, result) => {
  if (!WRITE) return
  fixtures[prop] = result
}

export const writeFixtures = (filename, fixtures) => {
  if (!WRITE) return

  const serialized = `${serialize(fixtures, { beautify: true, esm: true })}\nexport const fixtures = m\n`
  const file = path.join(__dirname, filename)
  fs.writeFileSync(file, serialized, 'utf-8')
}
