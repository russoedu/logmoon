#!/usr/bin/env node

const tail = require('./tail')
// const Config = require('./config')
// const config = new Config()

let dataCol = [];
tail.on('line', (data) => {
  console.log(data)
  // dataCol.push(data)
})

tail.on('error', (error) => {
  console.error(error)
})

function repeat (data = 0) {
  console.log(data, dataCol.length)
  dataCol = []
  setTimeout(() => {
    repeat(data + 1)
  }, 1000)
}
repeat()
