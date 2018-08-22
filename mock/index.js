const _ = require('lodash')
const moment = require('moment')
const express = require('express')

const app = express()

app.get('/api/ping', (req, res) => {
  res.json({
    payload: 'pong',
  })
})

app.get('/api/table/list', (req, res) => {
  let tables = [{
    id: 1,
    sourceInstance: 2,
    sourceDatabase: 'zhuanqian',
    sourceTable: 'user',
    targetInstance: 1,
    targetDatabase: 'dw_stage',
    targetTable: 'ds_user',
    columns: [
      { name: 'id' },
      { name: 'create_day' },
    ],
    createTime: '2018-08-18 15:53:01',
    updateTime: '2018-08-18 15:53:01',
  }]

  res.json({
    payload: tables,
  })
})

app.post('/api/table/save', (req, res) => {
  res.json({
    payload: {
      id: 1,
    },
  })
})

app.get('/api/table/get', (req, res) => {
  let table = {
    id: 1,
    sourceInstance: 2,
    sourceDatabase: 'zhuanqian',
    sourceTable: 'user',
    targetInstance: 1,
    targetDatabase: 'dw_stage',
    targetTable: 'ds_user',
    columns: [
      { name: 'id', extract: true },
      { name: 'create_day', extract: true },
    ],
  }

  res.json({
    payload: table,
  })
})

app.get('/api/table/columns', (req, res) => {
  let columns = [
    { name: 'id' },
    { name: 'create_day' },
  ]

  res.json({
    payload: columns,
  })
})

const server = app.listen(8081, () => {
  console.log('mock server listening on port ' + server.address().port)
})
