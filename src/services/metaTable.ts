import api from '@/common/api'

export async function getDbList() {
  return api.get('/meta/db/list')
}
