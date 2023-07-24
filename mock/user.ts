import { IncomingMessage, ServerResponse } from 'http'
import { MockMethod } from 'vite-plugin-mock'

function login(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    payload: {
      id: 1,
      username: 'Jerry',
    },
  }))

  // res.statusCode = 400
  // res.end(JSON.stringify({
  //   message: 'Invalid username or password',
  // }))
}

function logout() {
  return {}
}

function getUserList() {
  return {
    payload: [
      { id: 1, username: 'Jerry', is_current: 1 },
      { id: 2, username: 'Ope', is_current: 0 },
    ],
  }
}

export default [
  {
    url: '/api/login',
    method: 'post',
    rawResponse: login,
  },
  {
    url: '/api/logout',
    method: 'post',
    response: logout,
  },
  {
    url: '/api/user/list',
    response: getUserList,
  },
] as MockMethod[]
