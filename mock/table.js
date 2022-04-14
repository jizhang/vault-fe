module.exports = {
  'GET /api/table/list': (req, res) => {
    let tables = [{
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
    }]

    res.json({
      payload: {
        tables,
      },
    })
  },

  'POST /api/table/save': (req, res) => {
    res.json({
      code: 200,
      payload: {
        id: 1,
      },
    })
  },

  'GET /api/table/get': (req, res) => {
    let table = {
      id: 1,
      sourceInstance: 2,
      sourceDatabase: 'zhuanqian',
      sourceTable: 'user',
      targetInstance: 1,
      targetDatabase: 'dw_stage',
      targetTable: 'ds_user',
      columnList: 'id,create_day',
    }

    let columns = ['id', 'nickname', 'create_day']

    res.json({
      payload: {
        table,
        columns,
      }
    })
  },

  'GET /api/table/columns': (req, res) => {
    let columns = ['id', 'nickname', 'create_day']

    res.json({
      payload: {
        columns,
      }
    })
  },

  'POST /api/table/delete': (req, res) => {
    res.json({
      payload: {
        message: 'ok',
      },
    })
  },
}
