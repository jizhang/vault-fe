function login(req, res) {
  res.json({
    payload: {
      id: 1,
      username: '张三',
    },
  })
}

function getUserList(req, res) {
  res.json({
    payload: [
      { id: 1, username: '张三', is_current: 1 },
      { id: 2, username: '李四', is_current: 0 },
    ],
  })
}

module.exports = {
  'POST /api/login': login,
  'GET /api/user/list': getUserList,
}
