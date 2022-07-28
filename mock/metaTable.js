function getBiz(req, res) {
  res.json({
    payload: [
      [1, '任务'],
      [2, '广告主'],
    ],
  })
}

function getDbList(req, res) {
  res.json({
    payload: [
      { id: 1, db_alias: 'dw_stage' },
      { id: 2, db_alias: 'zhuanqian' },
    ],
  })
}

function getTableList(req, res) {
  const data = [
    {
      id: 1,
      table_name: 'ds_member',
      status: 1,
      db_id: 1,
      db_alias: 'dw_stage',
      layer: 2,
      layer_label: '基础层',
      biz: 2,
      biz_label: '广告主',
      user_id: 1,
      username: '张三',
      description: '广告主后台登录表',
      create_time: '2022-02-15 13:30:42',
      create_date: '2022-02-15',
      update_time: '2022-02-18 12:00:33',
    },
  ]

  res.json({
    payload: {
      data,
      total: data.length,
    },
  })
}

module.exports = {
  'GET /api/meta/table/biz': getBiz,
  'GET /api/meta/table/list': getTableList,
  'GET /api/meta/db/list': getDbList,
}
