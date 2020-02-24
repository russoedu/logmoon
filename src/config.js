const env = require('dotenv').config()
let instance = null

/**
 * Singleton configuration class
 */
class Config {
  /**
   * Singleton configurator constructor
   * Read all environment variables to configure the application
   * @param {boolean} [reset=false] Reset the instance singleton and set the configuration again. Used for unit test purpose, only.
   */
  constructor (reset = false) {
    // Singleton reset
    if (reset === true) {
      instance = null
    }

    if (instance !== null) {
      return instance
    }
    /**
     * The interval to display information in miliseconds
     * @type {number}
     * @default 10,000
     */
    this.statsDisplayInterval = typeof process.env.LOGMOON_STATS_DISPLAY_INTERVAL === 'undefined' ||
      isNaN(Number(process.env.LOGMOON_STATS_DISPLAY_INTERVAL))
      ? 10 * 1000
      : Number(process.env.LOGMOON_STATS_DISPLAY_INTERVAL) * 1000

    /**
     * The interval to check the alarm in miliseconds
     * @type {number}
     * @default 1,000
     */
    this.alarmCheckInterval = 1 * 1000

    /**
     * The alarm interval in seconds
     * @type {number}
     * @default 120
     */
    this.alarmPeriod = typeof process.env.LOGMOON_ALARM_PERIOD === 'undefined' ||
      isNaN(Number(process.env.LOGMOON_ALARM_PERIOD))
      ? 120
      : Number(process.env.LOGMOON_ALARM_PERIOD)

    /**
     * The amount of requests per second that should fire the alert
     * @type {number}
     * @default 10
     */
    this.requestsPreSecondAlarm = typeof process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM === 'undefined' ||
      isNaN(Number(process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM))
      ? 10
      : Number(process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM)

    /**
     * The location of the log file to be streamed
     * @type {string}
     * @default '/tmp/access.log'
     */
    this.logFile = typeof process.env.LOGMOON_LOG_FILE === 'undefined'
      ? '/tmp/access.log'
      : process.env.LOGMOON_LOG_FILE

    /**
     * Location of the output file. If empty, or not present, LogMoon will not log to file
     * @type {string|boolean}
     * @default false
     */
    this.outputLocation = typeof process.env.LOGMOON_OUTPUT_LOCATION === 'undefined' ||
      process.env.LOGMOON_OUTPUT_LOCATION === '' ||
      process.env.LOGMOON_OUTPUT_LOCATION === 'false'
      ? false
      : process.env.LOGMOON_OUTPUT_LOCATION

    instance = this
    return instance
  }
}

module.exports = Config
