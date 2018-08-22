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

const server = app.listen(8081, () => {
  console.log('mock server listening on port ' + server.address().port)
})
