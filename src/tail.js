const Tail = require('tail').Tail
const Config = require('./config')
const config = new Config()

console.log(config);
/**
 * Tail caller, responsible for reading the log file in real time
 */
module.exports = new Tail(config.logFileLocation, config.tailConfig)
