/**
 * AlarmArray class
 */
class AlarmArray {
  /**
   * Creates a new instance
   * @param {number} maximumSize the maximum size of the array - relates to the Alarm monitoring time
   */
  constructor (maximumSize) {
    /**
     * The array where the requests will be stored
     * @type {number[]}
     */
    this.queue = []

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
    this.queue.push(this.requests)
    this.requestsOnPeriod += this.requests
    if (this.queue.length > this.maximumSize) {
      this.requestsOnPeriod -= this.queue.shift()
    }
    this.requests = 0
  }
}

module.exports = AlarmArray
