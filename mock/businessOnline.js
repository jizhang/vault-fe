function getData(req, res) {
  res.json({
    payload: {
      data: [
        {
          id: 1,
          title: '购物返现',
          status: 1,
          user_id: 1,
          username: '张三',
          query: 'SELECT 1',
          created_at: '2022-04-20 15:46:00',
        },
      ],
    },
  })
}

function saveItem(req, res) {
  res.json({
    payload: {
      id: 1,
    },
  })
}

function deleteItem(req, res) {
  res.json({
    payload: 'ok',
  })
}

function editItem(req, res) {
  res.json({
    payload: {
      data: {
        id: 1,
        title: '购物返现',
        status: 1,
        user_id: 1,
        db_id: 1,
        query: 'SELECT 1',
      },
    },
  })
}

function checkQuery(req, res) {
  res.json({
    payload: {
      code: 200,
      message: 'Query 1:\n1',
    },
  })
}

module.exports = {
  'GET /api/data-quality/business-online/list': getData,
  'POST /api/data-quality/business-online/save': saveItem,
  'POST /api/data-quality/business-online/delete': deleteItem,
  'GET /api/data-quality/business-online/edit': editItem,
  'POST /api/data-quality/business-online/check-query': checkQuery,
}
