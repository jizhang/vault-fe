import { MockMethod } from 'vite-plugin-mock'

function getData() {
  return {
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
  }
}

function saveItem() {
  return {
    payload: {
      id: 1,
    },
  }
}

function deleteItem() {
  return {
    payload: 'ok',
  }
}

function editItem() {
  return {
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
  }
}

function checkQuery() {
  return {
    payload: {
      code: 200,
      message: 'Query 1:\n1',
    },
  }
}

export default [
  {
    url: '/api/data-quality/business-online/list',
    response: getData,
  },
  {
    url: '/api/data-quality/business-online/save',
    method: 'post',
    response: saveItem,
  },
  {
    url: '/api/data-quality/business-online/delete',
    method: 'post',
    response: deleteItem,
  },
  {
    url: '/api/data-quality/business-online/edit',
    response: editItem,
  },
  {
    url: '/api/data-quality/business-online/check-query',
    method: 'post',
    response: checkQuery,
  },
] as MockMethod[]
