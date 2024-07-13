#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { version } = require('../package.json')

const content = `export const version = '${version}'\n`

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src/version.js'),
  content,
  'utf-8'
)
