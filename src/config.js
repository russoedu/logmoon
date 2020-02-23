const env = require('dotenv').config()
let instance = null

/**
 * Singleton configuration class
 */
class Config {
  /**
   * Configurator constructor
   * Read all environment variables to configure the application
   * @param {boolean} reset Reset the instance singleton and set the configuration again. Used for unit test purpose, only.
   */
  constructor (reset = false) {
    if (reset === true) {
      instance = null
    }

    if (instance !== null) {
      return instance
    }
    /**
     * The interval to display information in miliseconds
     * @type number
     * @default 10,000
     */

    this.statsDisplayInterval = typeof process.env.LOGMOON_STATS_DISPLAY_INTERVAL === 'undefined' ||
      isNaN(Number(process.env.LOGMOON_STATS_DISPLAY_INTERVAL))
      ? 10 * 1000
      : Number(process.env.LOGMOON_STATS_DISPLAY_INTERVAL) * 1000

    /**
     * The interval to check the requests per second in miliseconds
     * @type number
     * @default 1,000
     */
    this.alarmCheckInterval = 1 * 1000

    /**
     * The amount of requests per second logged that should fire the alert
     * @type number
     * @default 10
     */
    this.requestsPreSecondAlarm = typeof process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM === 'undefined' ||
      isNaN(Number(process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM))
      ? 10
      : Number(process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM)

    /**
     * The location of the log file to be streamed
     * @type string
     * @default '/tmp/access.log'
     */
    this.logFile = typeof process.env.LOGMOON_LOG_FILE === 'undefined'
      ? '/tmp/access.log'
      : process.env.LOGMOON_LOG_FILE

    /**
     * The configuration for the tail execution. Used to define the char encoding of the log file
     * @type object
     */
    this.tailConfig = typeof process.env.LOGMOON_LOG_ENCODING === 'undefined'
      ? { encoding: 'utf-8' }
      : { encoding: process.env.LOGMOON_LOG_ENCODING }

    instance = this
    return instance
  }
}

module.exports = Config
