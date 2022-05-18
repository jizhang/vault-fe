import api from '@/common/api'

export async function login(data) {
  return api.post('/login', data)
}

export async function getUserList() {
  return api.get('/user/list')
}
