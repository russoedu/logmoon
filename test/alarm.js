const Config = require('../src/config.js')
const Output = require('../src/output.js')
const env = require('dotenv').config()
const expect = require('chai').expect
const sinon = require('sinon')
const mockedEnv = require('mocked-env')

let out
let restore

describe('Alarm', () => {
  beforeEach(() => {
    out = sinon.stub(Output.prototype, 'alarm')
    restore = mockedEnv(
      {
        LOGMOON_REQUESTS_PER_SECOND_ALARM: '10', // With more than 200 requests on our queue, the alarm should be fired
        LOGMOON_ALARM_PERIOD: '5', // The queue will have only 5 entries, so will be able to deal with them manually for the tests
        LOGMOON_OUTPUT_LOCATION: 'false'
      }
    )

    // eslint-disable-next-line no-unused-vars
    const config = new Config(true)
  })
  afterEach(() => {
    out.restore()
    restore()
  })
  describe('monitor()', function () {
    it('should fire the alarm', () => {
      // The alarm must be requested after the config so the mocked values are captured
      const Alarm = require('../src/alarm.js')
      const alarm = new Alarm()

      // To not fire the alarm, we should have less or equal 50 requests in total - 10 * 5 = 50
      // we will put 40 requests on each position of the queue and call the monitor
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
          alarm.addRequest()
        }
        alarm.monitor(true)
        expect(alarm.alertDisplayed).to.be.false
      }
      expect(alarm.requestsQueue.queue).to.be.eql([10, 10, 10, 10, 10])

      // Now, we have 50 requests. If we add a new set with 11 requests,
      // we should have 51 or more requests and the alarm should be fired
      for (let j = 0; j < 11; j++) {
        alarm.addRequest()
      }
      alarm.monitor(true)
      expect(alarm.requestsQueue.queue).to.be.eql([10, 10, 10, 10, 11])
      expect(alarm.alertDisplayed).to.be.true
    })

    it('should recover the alarm', () => {
      // The alarm must be requested after the config so the mocked values are captured
      const Alarm = require('../src/alarm.js')
      const alarm = new Alarm()

      // In this case, we will fire the alarm with 55 requests (only the last iteration)
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 11; j++) {
          alarm.addRequest()
        }
        alarm.monitor(true)

        if (i < 4) {
          expect(alarm.alertDisplayed).to.be.false
        } else {
          expect(alarm.alertDisplayed).to.be.true
        }
      }

      expect(alarm.requestsQueue.queue).to.be.eql([11, 11, 11, 11, 11])

      // Now, we have 55 requests. To recover, we need to drop it to 50 or less, so we will add a set of 6 requests
      for (let j = 0; j < 6; j++) {
        alarm.addRequest()
      }
      alarm.monitor(true)
      expect(alarm.requestsQueue.queue).to.be.eql([11, 11, 11, 11, 6])
      expect(alarm.alertDisplayed).to.be.false
    })
  })
})
