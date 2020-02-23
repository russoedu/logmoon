#!/usr/bin/env node

const Tail = require('./tail')
const Stats = require('./stats')
const Alarm = require('./alarm')

const stats = new Stats()
const alarm = new Alarm()

Tail.start(
  data => {
    stats.push(data)
    alarm.addRequest(1)
  },
  error => {
    console.error(error)
  }
)

stats.monitor()
alarm.monitor()
