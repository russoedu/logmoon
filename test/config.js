const Config = require('../src/config.mjs')
const env = require('dotenv').config()
const expect = require('chai').expect
const mockedEnv = require('mocked-env')

let config = null

describe('Config', () => {
  describe('constructor()', () => {
    it('it should use the default values if no environment vars found', () => {
      delete process.env.STATS_DISPLAY_INTERVAL
      delete process.env.REQUESTS_PER_SECOND_ALARM
      delete process.env.LOG_FILE_LOCATION
      delete process.env.LOG_ENCODING

      config = new Config()
      expect(config).to.be.an('object')
      expect(config.statsDisplayInterval).to.equal(10)
      expect(config.requestsPreSecondAlarm).to.equal(10)
      expect(config.logFileLocation).to.equal('/tmp/access.log')
      expect(config.tailConfig).to.be.an('object')
      expect(config.tailConfig.encoding).to.equal('utf-8')
    })

    it('it should use the environment vars if they are found', () => {
      const restore = mockedEnv({
        STATS_DISPLAY_INTERVAL: '123',
        REQUESTS_PER_SECOND_ALARM: '456',
        LOG_FILE_LOCATION: '/var/tmp/file.js',
        LOG_ENCODING: 'utf-16'
      })

      config = new Config()
      expect(config).to.be.an('object')
      expect(config.statsDisplayInterval).to.equal(123)
      expect(config.requestsPreSecondAlarm).to.equal(456)
      expect(config.logFileLocation).to.equal('/var/tmp/file.js')
      expect(config.tailConfig).to.be.an('object')
      expect(config.tailConfig.encoding).to.equal('utf-16')

      restore()
    })
  })
})
