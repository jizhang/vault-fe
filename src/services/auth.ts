import api from '@/utils/api'

export async function login(data: object) {
  return api.post('/login', data)
}

export async function logout() {
  return api.post('/logout')
}

export async function getCurrentUser() {
  return api.get('/current-user')
}
