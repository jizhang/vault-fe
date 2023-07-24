import { MockMethod } from 'vite-plugin-mock'

function getBiz() {
  return {
    payload: [
      [1, '任务'],
      [2, '广告主'],
    ],
  }
}

function getDbList() {
  return {
    payload: [
      { id: 1, db_alias: 'dw_stage' },
      { id: 2, db_alias: 'zhuanqian' },
    ],
  }
}

function getTableList() {
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

  return {
    payload: {
      data,
      total: data.length,
    },
  }
}

export default [
  {
    url: '/api/meta/table/biz',
    response: getBiz,
  },
  {
    url: '/api/meta/table/list',
    response: getTableList,
  },
  {
    url: '/api/meta/db/list',
    response: getDbList,
  },
] as MockMethod[]
