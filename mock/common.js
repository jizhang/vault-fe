function ping(req, res) {
  res.send('pong')
}

module.exports = {
  'GET /ping': ping,
}
