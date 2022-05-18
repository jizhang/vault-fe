export default {
  formatBytes (bytes) {
    let negative = bytes < 0
    bytes = Math.abs(bytes)
    if (bytes >= Math.pow(1024, 4)) {
      bytes = (bytes / Math.pow(1024, 4)).toFixed(1) + 'T'
    } else if (bytes >= Math.pow(1024, 3)) {
      bytes = (bytes / Math.pow(1024, 3)).toFixed(1) + 'G'
    } else if (bytes >= Math.pow(1024, 2)) {
      bytes = (bytes / Math.pow(1024, 2)).toFixed(1) + 'M'
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(1) + 'K'
    } else if (bytes > 0) {
      bytes = Number(bytes).toFixed(1) + 'B'
    }
    return (negative ? '-' : '') + bytes
  }
}
