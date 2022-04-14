const path = require('path')
const glob = require('glob')

let proxy = {}

let options = {
  cwd: __dirname,
  absolute: true,
  ignore: path.basename(__filename),
}
glob.sync('**/*.js', options).forEach(filename => {
  Object.assign(proxy, require(filename))
})

module.exports = proxy
