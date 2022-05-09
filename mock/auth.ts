import { MockMethod } from 'vite-plugin-mock'

const MOCK_USER = {
  id: 1,
  username: 'John Doe',
}

function login() {
  return MOCK_USER
}

function logout() {
  return {}
}

function getCurrentUser() {
  return MOCK_USER
}

export default [
  {
    url: '/api/login',
    method: 'post',
    response: login,
  },
  {
    url: '/api/logout',
    method: 'post',
    response: logout,
  },
  {
    url: '/api/current-user',
    response: getCurrentUser,
  },
] as MockMethod[]
