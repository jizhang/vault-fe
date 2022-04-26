import api from '@/utils/api'

export async function login(username: string, password: string) {
  const response = await fetch('/api/user/current', {
    headers: {
      Authorization: 'Basic ' + window.btoa(`${username}:${password}`),
    },
  })

  if (response.ok) {
    return response.json()
  }

  throw { status: response.status }
}

export async function getCurrentUser() {
  return api.get('/user/current')
}
