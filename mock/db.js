function getDbList(req, res) {
  const dbList = [
    {
      id: 1,
      name: 'dw_stage',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      createdAt: '2022-04-20 08:00:00',
      updatedAt: '2022-04-20 08:00:00',
    },
    {
      id: 2,
      name: 'zhuanqian',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      createdAt: '2022-04-20 09:00:00',
      updatedAt: '2022-04-20 09:00:00',
    },
  ]

  res.json({
    dbList,
  })
}

function saveDb(req, res) {
  res.json({
    id: 1,
  })
}

function deleteDb(req, res) {
  res.json({
    id: 1,
  })
}

module.exports = {
  'GET /db/list': getDbList,
  'POST /db/save': saveDb,
  'POST /db/delete': deleteDb,
}
