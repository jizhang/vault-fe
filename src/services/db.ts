import api from '@/utils/api'

export async function getDbList() {
  return api.get('/db/list')
}

export async function saveDb(data: object) {
  return api.post('/db/save', data)
}

export async function deleteDb(data: object) {
  return api.post('/db/delete', data)
}
