class AlarmArray extends Array {
  constructor (size) {
    super()
    this.requests = 0
    this.size = size
    this.requestsOnPeriod = 0
  }

  addRequest () {
    this.requests += 1
  }

  updateQueue () {
    this.push(this.requests)
    this.requestsOnPeriod += this.requests
    if (this.length > this.size) {
      this.requestsOnPeriod -= this.shift()
    }
    this.requests = 0
  }
}

module.exports = AlarmArray
