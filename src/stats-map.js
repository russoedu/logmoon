/**
 * Stats Map class
 * @extends {Map}
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
   * @returns {Object} Object with value and amount
   */
  top () {
    let topMethod = [null, 0]

    if (this.size > 0) {
      // Use the array reduce method to retrieve the bigger value. Iterates each item and always stay with the bigger item
      topMethod = [...this.entries()].reduce((previous, current) => current[1] > previous[1] ? current : previous)
    }
    return {
      value: topMethod[0],
      amount: topMethod[1]
    }
  }
}

module.exports = StatsMap
