const T = require('tail').Tail
const Config = require('./config')
const config = new Config()

/**
 * Tail class
 * Read the log stream
 */
class Tail {
  /**
   * Returns a new Tail caller, responsible for reading the log file in real time
   */
  static run () {
    console.log(config)
    return new T(config.logFile, config.tailConfig)
  }
}

module.exports = Tail.run()
