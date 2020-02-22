#!/usr/bin/env node

const Config = require('./config')
const Tail = require('tail').Tail

console.log('module running')
const config = new Config()

try {
  const tail = new Tail(config.logFileLocation, config.tailConfig)
  console.log(config)

  tail.on('line', (data) => {
    console.log(data)
  })

  tail.on('error', (error) => {
    console.error(error)
  })
} catch (error) {
  console.error(error)
}
