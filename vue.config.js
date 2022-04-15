const glob = require('glob')
const apiMocker = require('mocker-api')

let devServer = {}

if (process.env.MOCK === 'none') {
  devServer.proxy = {
    '/api': {
      target: 'http://127.0.0.1:8081'
    },
  }
} else {
  devServer.setupMiddlewares = (middlewares, devServer) => {
    apiMocker(devServer.app, glob.sync('mock/**/*.js'))
    return middlewares
  }
}

module.exports = {
  devServer,
}
