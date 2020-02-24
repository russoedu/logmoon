const T = require('tail').Tail
const Config = require('./config')
const config = new Config()

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
    tail = new T(config.logFile)

    tail.on('line', (data) => success(data))
    tail.on('error', (e) => error(e))
  }

  /**
   * Stop the tail
   */
  static stop () {
    tail.unwatch()
  }
}

module.exports = Tail
