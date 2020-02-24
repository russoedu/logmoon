const Tail = require('./tail')
const Output = require('./output')
const Stats = require('./stats')
const Alarm = require('./alarm')

const stats = new Stats()
const alarm = new Alarm()
const output = new Output()

/**
 * Main monitoring class
 */
class Monitor {
  /**
   * Execute the log tail and monitor stats and requests alarm
   */
  static run () {
    // Only start the monitor if the tail can start
    let monitor = true

    Tail.start(
      data => {
        stats.push(data)
        alarm.addRequest()
      },
      error => {
        monitor = false
        output.error(error)
      }
    )
    if (monitor) {
      output.start()
      stats.monitor()
      alarm.monitor()
    }
  }
}

module.exports = Monitor
