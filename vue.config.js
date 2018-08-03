const setupMockServer = require('./mock/index.js')

let devServer = {}

if (process.env.USE_PROXY == 'true') {
  devServer.proxy = {
    '/api': {
      target: 'http://127.0.0.1:8081',
    },
  }
} else {
  devServer.before = (app) => {
    setupMockServer(app)
  }
}

module.exports = {
  devServer,
}
