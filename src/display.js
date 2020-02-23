class Display {
  static stats (data, connector, type) {
    console.log(`${data.amount} ${connector} ${data.value} ${type}`)
  }

  static transfer (bytes, connector) {
    console.log(`${bytes} ${connector}`)
  }
}

module.exports = Display
