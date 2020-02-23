#!/usr/bin/env node

const tail = require('./tail')
const Stats = require('./stats')
const Alarm = require('./alarm')

const stats = new Stats()
const alarm = new Alarm()

const now = new Date()

tail.on('line', (data) => {
  stats.push(data)
  alarm.addRequest(1)
})

tail.on('error', (error) => {
  console.error(error)
})

stats.monitor(now)
alarm.monitor(now)
