const env = require('dotenv').config()
let instance = null

/**
 * Singleton configuration class
 */
class Config {
  /**
   * Configurator constructor
   * Read all environment variables to configure the application
   */
  constructor () {
    if (instance !== null) {
      return instance
    }
    /**
     * The interval to display information
     * @type number
     * @default 10
     */
    this.statsDisplayInterval = typeof process.env.STATS_DISPLAY_INTERVAL === 'undefined' ||
      isNaN(Number(process.env.STATS_DISPLAY_INTERVAL))
      ? 10
      : Number(process.env.STATS_DISPLAY_INTERVAL)

    /**
     * The amount of requests per second logged that should fire the alert
     * @type number
     * @default 10
     */
    this.requestsPreSecondAlarm = typeof process.env.REQUESTS_PER_SECOND_ALARM === 'undefined' ||
      isNaN(Number(process.env.REQUESTS_PER_SECOND_ALARM))
      ? 10
      : Number(process.env.REQUESTS_PER_SECOND_ALARM)

    /**
     * The location of the log file to be streamed
     * @type string
     * @default '/tmp/access.log'
     */
    this.logFile = typeof process.env.LOG_FILE === 'undefined'
      ? '/tmp/access.log'
      : process.env.LOG_FILE

    /**
     * The configuration for the tail execution. Used to define the char encoding of the log file
     * @type object
     */
    this.tailConfig = typeof process.env.LOG_ENCODING === 'undefined'
      ? { encoding: 'utf-8' }
      : { encoding: process.env.LOG_ENCODING }

    instance = this
    return instance
  }
}

module.exports = Config
