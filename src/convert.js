/**
 * Convertion helper class
 */
class Convert {
  /**
   * Convert bytes into KB, MB, GB or TB, depending on the amount of bytes
   * @param {number} bytes the bytes to be converted
   */
  static bytes (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    if (bytes === 0) return '0 Bytes'

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }
}

module.exports = Convert
