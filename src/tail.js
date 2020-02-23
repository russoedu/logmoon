const T = require('tail').Tail
const Config = require('./config')
const config = new Config()

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
    const tail = new T(config.logFile)

    tail.on('line', (data) => success(data))
    tail.on('error', (e) => error(e))
  }
}

module.exports = Tail
