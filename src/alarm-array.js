/**
 * AlarmArray class
 * @extends Array
 */
class AlarmArray extends Array {
  /**
   * Creates a new instance
   * @param {number} maximumSize the maximum size of the array - relates to the Alarm monitoring time
   */
  constructor (maximumSize) {
    super()
    /**
     * The total number of requests stored since the last update
     * @type {number}
     */
    this.requests = 0

    /**
     * The maximum size of the array
     * @type {number}
     */
    this.maximumSize = maximumSize

    /**
     * The total requests on the alarm monitoring period
     * @type {number}
     */
    this.requestsOnPeriod = 0
  }

  /**
   * Add a request
   */
  addRequest () {
    this.requests += 1
  }

  /**
   * Update the queue by pushing a new value and shifting the value in the end of the array if it is bigger than the `maximumSize`
   */
  updateQueue () {
    this.push(this.requests)
    this.requestsOnPeriod += this.requests
    if (this.length > this.maximumSize) {
      this.requestsOnPeriod -= this.shift()
    }
    this.requests = 0
  }
}

module.exports = AlarmArray
