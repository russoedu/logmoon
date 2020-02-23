const Config = require('./config')
const StatsMap = require('./stats-map')
const Convert = require('./convert')
const Display = require('./display')
const config = new Config()

/**
 * Stats class, control and display stats data
 */
class Stats {
  /**
   * Constructor function
   */
  constructor () {
    /**
     * The StatsMap of the log methods
     * @type StatsMap
     */
    this.methods = new StatsMap()

    /**
     * The StatsMap of the log sections
     * @type StatsMap
     */
    this.sections = new StatsMap()

    /**
     * The StatsMap of the log statuses
     * @type StatsMap
     */
    this.statuses = new StatsMap()

    /**
     * The total transfered bytes
     * @type number
     */
    this.totalDataTransfer = 0
  }

  /**
   * Add a new line of data to the logs array
   * @param {string} data The line of data read from the log
   * Example of data: 127.0.0.1 - - [23/Feb/2020:10:16:44 +0000] "GET /user/charles HTTP/1.1" 200 246
   */
  push (data) {
    const entryRegEx = /[0-9.]+ [A-Za-z-]+ [A-Za-z-]+ \[.+\] "(.+) \/([^/]*)\/?[^ ]* [^ ]* ([0-9]+) ([0-9]+)/
    //                                                        ^      ^                     ^        ^
    // Capture Groups                                         1      2                     3        4
    //                                                        method section               status   dataTransfer
    const match = data.match(entryRegEx)

    this.methods.addOne(match[1])
    this.sections.addOne(match[2])
    this.statuses.addOne(match[3])
    this.totalDataTransfer += Number(match[4])
  }

  /**
   * Clean the maps and zero the total data transfer
   */
  clean () {
    this.methods.clear()
    this.sections.clear()
    this.statuses.clear()
    this.totalDataTransfer = 0
  }

  /**
   * Start the log monitoring
   */
  monitor () {
    const now = new Date()
    const topMethod = this.methods.top()
    const topSection = this.sections.top()
    const topStatus = this.statuses.top()

    console.log('*'.repeat(process.stdout.columns))
    if (topSection.amount && topSection.amount > 0) {
      console.log(`REPORT FOR ${now}`)
      console.log(`** MOST ACCESSED SECTION: ${topSection.value} => ${topSection.amount} accesses`)
      console.log(`** MOST USED HTTP METHOD: ${topMethod.value} => ${topMethod.amount} times`)
      console.log(`** MOST RESPONDED STATUS: ${topStatus.value} => ${topStatus.amount} times`)
      console.log(`** TOTAL TRANSFER IN THE PERIOD: ${Convert.bytes(this.totalDataTransfer)}`)
    } else {
      console.log(`no available data for ${now}`)
    }
    console.log('*'.repeat(process.stdout.columns))

    // Zero the data for the next run
    this.clean()

    // Pause for the statsDisplayInterval amount
    setTimeout(() => {
      this.monitor()
    }, config.statsDisplayInterval)
  }
}

module.exports = Stats
