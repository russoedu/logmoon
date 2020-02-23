const Config = require('./config')
const config = new Config()

class Alarm {
  constructor () {
    this.requests = 0;
  }

  addRequest (amount) {
    this.requests += amount
  }

  clean () {
    this.requests = 0
  }

  monitor (now) {
    console.log('Alarm:', new Date() - now, 'miliseconds passed', this.requests, 'requests')
    this.clean()

    setTimeout(() => {
      this.monitor(now)
    }, config.alarmCheckInterval)
  }
}

module.exports = Alarm
