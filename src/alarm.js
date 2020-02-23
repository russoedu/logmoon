const chalk = require('chalk')
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

    /**
     * The latest time the alarm was fired. The alarm should stay activated for 2 minutes
     * @type Date
     */
    this.latestAlert = null

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
    if (this.requests >= config.requestsPreSecondAlarm) {
      this.latestAlert = new Date()
    }
    const twoMinutes = 2 * 1000
    // const twoMinutes = 2 * 60 * 1000

    // console.log(new Date() - this.latestAlert, twoMinutes, (new Date() - this.latestAlert) < twoMinutes)

    if (this.latestAlert !== null) {
      if ((new Date() - this.latestAlert) < twoMinutes) {
        console.log(chalk.bgRed.red(' '.repeat(process.stdout.columns)))
        const display = `****** ALERT! more than ${config.requestsPreSecondAlarm} requests per second! ******`
        console.log(chalk.bgRed.white(display + ' '.repeat(process.stdout.columns - display.length)))
        console.log(chalk.bgRed.red(' '.repeat(process.stdout.columns)))
        this.alertDisplayed = true
      } else if (this.alertDisplayed === true) {
        console.log('ALERT DISABLED')
        this.latestAlert = null
        this.alertDisplayed = false
      }
    }

    this.clean()

    setTimeout(() => {
      this.monitor(now)
    }, config.alarmCheckInterval)
  }
}

module.exports = Alarm
