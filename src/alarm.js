const chalk = require('chalk')
const Config = require('./config')
const AlarmArray = require('./alarm-array')
const Output = require('./output')

const config = new Config()
const output = new Output()
/**
 * Alarm class, control the number of requests per second
 */
class Alarm {
  /**
   * Constructor function
   */
  constructor () {
    /**
     * The queue to check the threshould
     * @type AlarmArray
     */
    this.requestsQueue = new AlarmArray(config.alarmPeriod)

    /**
     * Variable to check if the alert has already been displayed
     * @type boolean
     */
    this.alertDisplayed = false
  }

  /**
   * Add an amount of requests to the total amount
   * @param {number} amount The number of requests to be added
   */
  addRequest () {
    this.requestsQueue.addRequest()
  }

  /**
   * Start the log monitoring alarm
   * @param {date} startTime The time LogMoon was started
   */
  monitor () {
    this.requestsQueue.updateQueue()
    // console.log(this.requestsQueue.requestsOnPeriod, this.requestsQueue.queue.length)
    const now = new Date()
    if (!this.alertDisplayed && this.requestsQueue.requestsOnPeriod / config.alarmPeriod > config.requestsPreSecondAlarm) {

      const message = `****** ALERT! High traffic generated an alert hits = ${this.requestsQueue.requestsOnPeriod}, triggered at ${now} ******`
      output.alarm(message, now, true)

      this.alertDisplayed = true
    } else if (this.alertDisplayed && this.requestsQueue.requestsOnPeriod / config.alarmPeriod <= config.requestsPreSecondAlarm) {
      const message = `****** ALERT RECOVERED! Trafic normalized at ${now} ******`
      output.alarm(message, now, true)
      this.alertDisplayed = false
    }

    setTimeout(() => {
      this.monitor()
    }, config.alarmCheckInterval)
  }
}

module.exports = Alarm
