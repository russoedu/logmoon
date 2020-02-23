#!/usr/bin/env node

const Tail = require('./tail')
const Output = require('./output')
const Stats = require('./stats')
const Alarm = require('./alarm')

const stats = new Stats()
const alarm = new Alarm()
const output = new Output()

output.start()

Tail.start(
  data => {
    stats.push(data)
    alarm.addRequest()
  },
  error => {
    console.error(error)
  }
)

stats.monitor()
alarm.monitor()
