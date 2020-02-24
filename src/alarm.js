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
     * @type {AlarmArray}
     */
    this.requestsQueue = new AlarmArray(config.alarmPeriod)

    /**
     * @type {boolean} Variable to stop the execution when needed
     */
    this.run = true

    /**
     * Variable to check if the alert has already been displayed
     * @type {boolean}
     */
    this.alertDisplayed = false
  }

  /**
   * Add a new request to the total requests amount
   */
  addRequest () {
    this.requestsQueue.addRequest()
  }

  /**
   * Start the log monitoring alarm. The function calls itself every `config.alarmCheckInterval` miliseconds
   * @param {boolean} [runOnce=false] Used for test purpose, only
   */
  monitor (runOnce = false) {
    this.requestsQueue.updateQueue()
    const now = new Date()
    if (!this.alertDisplayed && this.requestsQueue.requestsOnPeriod / config.alarmPeriod > config.requestsPreSecondAlarm) {
      const message = `****** ALERT! High traffic generated an alert hits = ${this.requestsQueue.requestsOnPeriod}, triggered at ${now} ******`
      output.alarm(message, true)
      this.alertDisplayed = true
    } else if (this.alertDisplayed && this.requestsQueue.requestsOnPeriod / config.alarmPeriod <= config.requestsPreSecondAlarm) {
      const message = `****** ALERT RECOVERED! Trafic normalized at ${now} ******`
      output.alarm(message, false)
      this.alertDisplayed = false
    }

    setTimeout(() => {
      if (!runOnce) {
        this.monitor()
      }
    }, config.alarmCheckInterval)
  }
}

module.exports = Alarm
