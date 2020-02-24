const chalk = require('chalk')
const fs = require('fs')
const Config = require('./config')

const config = new Config()

/**
 * Output class
 * Output data to the terminal and to the optional result file
 */
class Output {
  constructor () {
    /**
     * The output openSync with the output file location data OR false if outputLocation is not set or set as 'false'
     * @type {number|boolean}
     */
    this.outputFs = config.outputLocation === 'false' ? false : fs.openSync(config.outputLocation, 'a')

    /**
     * The array to store the text to be logged or saved to file
     * @type {array}
     */
    this.messages = []
  }

  /**
   * Initial output message
   */
  start () {
    const startMessage = `LogMoon HTTP Log Monitoring started: ${new Date()}`
    const spacingBefore = Math.floor((process.stdout.columns - startMessage.length) / 2) - 1
    const spacingAfter = process.stdout.columns - (startMessage.length + spacingBefore + 2)

    this.messages = [
      `+${'-'.repeat(process.stdout.columns - 2)}+`,
      `|${' '.repeat(spacingBefore)}${startMessage}${' '.repeat(spacingAfter)}|`,
      `+${'-'.repeat(process.stdout.columns - 2)}+`,
      ''
    ]
    this.messages.forEach(message => {
      console.log(chalk.bgBlue.white.bold(message))
      if (this.outputFs !== false) {
        fs.writeSync(this.outputFs, `${message}\n`)
      }
    })
  }

  /**
   * Display a message in the terminal and, optionally, save it in the output file
   * @param {date} initialTime The initial time of the stats
   * @param {date} currentTime The current time, when the message is being displayed
   * @param {object} topSection The object with the most accessed section, with value and amount
   * @param {object} topMethod The object with the most accessed HTTP method, with value and amount
   * @param {object} topStatus The object with the most accessed HTTP response status, with value and amount
   * @param {number} totalRequests The total amount of requests
   * @param {number} totalDataTransfer The total data transfered, in bytes
   */
  stats (initialTime, currentTime, topSection, topMethod, topStatus, totalRequests, totalDataTransfer) {
    if (typeof topSection !== 'undefined') {
      this.messages = [
        '-'.repeat(process.stdout.columns),
        `REPORT FROM ${initialTime} until ${currentTime}`,
        '',
        `MOST ACCESSED SECTION: "${topSection.value}" => ${topSection.amount} times`,
        `MOST USED HTTP METHOD: "${topMethod.value}" => ${topMethod.amount} times`,
        `MOST RESPONDED STATUS: "${topStatus.value}" => ${topStatus.amount} times`,
        `TOTAL REQUESTS IN THE PERIOD: ${totalRequests} requests`,
        `TOTAL TRANSFER IN THE PERIOD: ${Output.convertBytes(totalDataTransfer)}`,
        '-'.repeat(process.stdout.columns)
      ]
    } else {
      this.messages = [
        '-'.repeat(process.stdout.columns),
        `no traffic  FROM ${initialTime} until ${currentTime}`,
        '-'.repeat(process.stdout.columns)
      ]
    }
    this.messages.forEach(message => {
      console.log(message)
      if (this.outputFs !== false) {
        fs.writeSync(this.outputFs, `${message}\n`)
      }
    })
  }

  /**
   * Display an alert message in the terminal and, optionally, save it in the output file
   * @param {string} text The text to be displayed
   * @param {boolean} alertOn If true, it's the alert being turned on, if false, the alert is being turned off
   */
  alarm (text, alertOn = false) {
    const bgColour = alertOn ? 'bgRed' : 'bgGreen'
    const colour = alertOn ? 'white' : 'black'
    this.messages = [
      '*'.repeat(process.stdout.columns),
      text + '*'.repeat(process.stdout.columns - text.length),
      '*'.repeat(process.stdout.columns)
    ]

    this.messages.forEach(message => {
      console.log(chalk[bgColour][colour](message))
      if (this.outputFs !== false) {
        fs.writeSync(this.outputFs, `${message}\n`)
      }
    })
  }

  /**
   * Convert bytes into KB, MB, GB or TB, depending on the amount of bytes
   * @param {number} bytes the bytes to be converted
   */
  static convertBytes (bytes) {
    if (bytes === 0) return '0 Bytes'

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }
}

module.exports = Output
