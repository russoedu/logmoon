const T = require('tail').Tail
const Config = require('./config')
const config = new Config()
const fs = require('fs')

let tail
/**
 * Tail class, reads the log stream
 */
class Tail {
  /**
   * Starts the log tail
   * @param {function} success the callback function on data read success
   * @param {function} error the callback function on error
   */
  static start (success, error) {
    if (!fs.existsSync(config.logFile)) {
      return error(`The log file "${config.logFile}" could not be found`)
    }
    tail = new T(config.logFile)

    tail.on('line', (data) => success(data))
    tail.on('error', (e) => error(e))
  }
}

module.exports = Tail
