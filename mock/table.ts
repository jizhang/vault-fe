import { MockMethod } from 'vite-plugin-mock'

function getTableList() {
  const tables = [
    {
      id: 1,
      sourceInstance: 2,
      sourceDatabase: 'zhuanqian',
      sourceTable: 'user',
      targetInstance: 1,
      targetDatabase: 'dw_stage',
      targetTable: 'ds_user',
      columnList: 'id,create_day',
      createdAt: '2018-08-18 15:53:01',
      updatedAt: '2018-08-18 15:53:01',
    },
  ]

  return { tables }
}

function saveTable() {
  return { id: 1 }
}

function getTable() {
  const table = {
    id: 1,
    sourceInstance: 2,
    sourceDatabase: 'zhuanqian',
    sourceTable: 'user',
    targetInstance: 1,
    targetDatabase: 'dw_stage',
    targetTable: 'ds_user',
    columnList: 'id,create_day',
  }

  const columns = ['id', 'nickname', 'create_day']

  return { table, columns }
}

function getTableColumns() {
  const columns = ['id', 'nickname', 'create_day']
  return { columns }
}

function deleteTable() {
  return { id: 1 }
}

export default [
  {
    url: '/api/table/list',
    response: getTableList,
  },
  {
    url: '/api/table/save',
    method: 'post',
    response: saveTable,
  },
  {
    url: '/api/table/get',
    response: getTable,
  },
  {
    url: '/api/table/columns',
    response: getTableColumns,
  },
  {
    url: '/api/table/delete',
    method: 'post',
    response: deleteTable,
  },
] as MockMethod[]
