const Config = require('./config')
const config = new Config()

class Stats {
  constructor () {
    this.logs = []
  }

  push (data) {
    this.logs.push(data)
  }

  clean () {
    this.logs = []
  }

  monitor (now) {
    console.log('Stats:', new Date() - now, 'miliseconds passed', this.logs.length, 'entries')
    this.clean()

    setTimeout(() => {
      this.monitor(now)
    }, config.statsDisplayInterval)
  }
}

module.exports = Stats
