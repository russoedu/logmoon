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
      expect(config.tailConfig).to.be.an('object')
      expect(config.tailConfig.encoding).to.equal('utf-8')

      restore()
    })

    it('should be a singleton and return the same value, even if data changes', () => {
      const restore = mockedEnv(
        {
          LOGMOON_STATS_DISPLAY_INTERVAL: '123',
          LOGMOON_REQUESTS_PER_SECOND_ALARM: '456',
          LOGMOON_LOG_FILE: '/var/tmp/file.js',
          LOGMOON_LOG_ENCODING: 'utf-16'
        }
      )
      config = new Config()
      expect(config).to.be.an('object')
      expect(process.env.LOGMOON_STATS_DISPLAY_INTERVAL).to.equal('123')
      expect(config.statsDisplayInterval).to.equal(10 * 1000)

      expect(process.env.LOGMOON_REQUESTS_PER_SECOND_ALARM).to.equal('456')
      expect(config.requestsPreSecondAlarm).to.equal(10)

      expect(process.env.LOGMOON_LOG_FILE).to.equal('/var/tmp/file.js')
      expect(config.logFile).to.equal('/tmp/access.log')

      expect(config.tailConfig).to.be.an('object')

      expect(process.env.LOGMOON_LOG_ENCODING).to.equal('utf-16')
      expect(config.tailConfig.encoding).to.equal('utf-8')

      restore()
    })

    it('should use the def environment vars found', () => {
      const restore = mockedEnv(
        {
          LOGMOON_STATS_DISPLAY_INTERVAL: '123',
          LOGMOON_REQUESTS_PER_SECOND_ALARM: '456',
          LOGMOON_LOG_FILE: '/var/tmp/file.js',
          LOGMOON_LOG_ENCODING: 'utf-16'
        }
      )

      config = new Config(true)
      expect(config).to.be.an('object')
      expect(config.statsDisplayInterval).to.equal(123 * 1000)
      expect(config.requestsPreSecondAlarm).to.equal(456)
      expect(config.logFile).to.equal('/var/tmp/file.js')
      expect(config.tailConfig).to.be.an('object')
      expect(config.tailConfig.encoding).to.equal('utf-16')

      restore()
    })
  })
})
