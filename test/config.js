const Config = require('../src/config.js')
const env = require('dotenv').config()
const expect = require('chai').expect
const mockedEnv = require('mocked-env')

let config = null

describe('Config', () => {
  describe('constructor()', () => {
    it('should use the default values if no environment vars found', () => {
      const restore = mockedEnv({ clear: true })

      config = new Config()
      expect(config).to.be.an('object')
      expect(config.statsDisplayInterval).to.equal(10 * 1000)
      expect(config.requestsPreSecondAlarm).to.equal(10)
      expect(config.logFile).to.equal('/tmp/access.log')
      expect(config.outputLocation).to.equal(false)
      expect(config.alarmPeriod).to.equal(120)

      restore()
    })

    it('should be a singleton and return the same value, even if data changes', () => {
      const restore = mockedEnv(
        {
          LOGMOON_STATS_DISPLAY_INTERVAL: '123',
          LOGMOON_REQUESTS_PER_SECOND_ALARM: '456',
          LOGMOON_LOG_FILE: '/var/tmp/file.log',
          LOGMOON_OUTPUT_LOCATION: '/var/tmp/logmoon.log',
          LOGMOON_ALARM_PERIOD: '10'
        }
      )
      config = new Config()
      expect(config).to.be.an('object')
      expect(process.env.LOGMOON_STATS_DISPLAY_INTERVAL).to.equal('123')
      expect(config.statsDisplayInterval).to.equal(10 * 1000)

      expect(process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM).to.equal('456')
      expect(config.requestsPreSecondAlarm).to.equal(10)

      expect(process.env.LOGMOON_LOG_FILE).to.equal('/var/tmp/file.log')
      expect(config.logFile).to.equal('/tmp/access.log')

      expect(process.env.LOGMOON_OUTPUT_LOCATION).to.equal('/var/tmp/logmoon.log')
      expect(config.outputLocation).to.equal(false)

      expect(process.env.LOGMOON_ALARM_PERIOD).to.equal('10')
      expect(config.alarmPeriod).to.equal(120)

      restore()
    })

    it('should use the def environment vars found', () => {
      const restore = mockedEnv(
        {
          LOGMOON_STATS_DISPLAY_INTERVAL: '123',
          LOGMOON_REQUESTS_PER_SECOND_ALARM: '456',
          LOGMOON_LOG_FILE: '/var/tmp/file.log',
          LOGMOON_OUTPUT_LOCATION: '/var/tmp/logmoon.log',
          LOGMOON_ALARM_PERIOD: '10'
        }
      )

      config = new Config(true)
      expect(config).to.be.an('object')
      expect(config.statsDisplayInterval).to.equal(123 * 1000)
      expect(config.requestsPreSecondAlarm).to.equal(456)
      expect(config.logFile).to.equal('/var/tmp/file.log')
      expect(config.outputLocation).to.equal('/var/tmp/logmoon.log')
      expect(config.alarmPeriod).to.equal(10)
      restore()
    })
  })
})
