const Config = require('./config')
const config = new Config()
/**
 * Alarm class, control the number of requests per second
 */
class Alarm {
  /**
   * Constructor function
   */
  constructor () {
    /**
     * The total requests since the last iteraction
     * @type number
     */
    this.requests = 0
  }

  /**
   * Add an amount of requests to the total amount
   * @param {number} amount The number of requests to be added
   */
  addRequest (amount) {
    this.requests += amount
  }

  /**
   * Clean the requests amount
   */
  clean () {
    this.requests = 0
  }

  /**
   * Start the log monitoring alarm
   * @param {date} startTime The time LogMoon was started
   */
  monitor (now) {
    console.log('Alarm:', new Date() - now, 'miliseconds passed', this.requests, 'requests')
    this.clean()

    setTimeout(() => {
      this.monitor(now)
    }, config.alarmCheckInterval)
  }
}

module.exports = Alarm
