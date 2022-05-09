import { MockMethod } from 'vite-plugin-mock'

function getDbList() {
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

  return { dbList }
}

function saveDb() {
  return { id: 1 }
}

function deleteDb() {
  return { id: 1 }
}

export default [
  {
    url: '/api/db/list',
    response: getDbList,
  },
  {
    url: '/api/db/save',
    method: 'post',
    response: saveDb,
  },
  {
    url: '/api/db/delete',
    method: 'post',
    response: deleteDb,
  },
] as MockMethod[]
