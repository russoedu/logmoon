/**
 * Stats Map class
 */
class StatsMap extends Map {
  /**
   * Add 1 to the item mapped on index. If the index doesn't exist, create the item and set it's count as 1
   * @param {string} index The index of the data to be added
   */
  addOne (index) {
    const data = this.get(index)
    this.set(index, typeof data !== 'undefined' ? data + 1 : 1)
  }

  /**
   * Retrive the item that has more occurences and the amount of occurrences
   */
  top () {
    let topMethod = [null, 0]

    if (this.size > 0) {
      topMethod = [...this.entries()].reduce((a, e) => e[1] > a[1] ? e : a)
    }
    return {
      value: topMethod[0],
      amount: topMethod[1]
    }
  }
}

module.exports = StatsMap
