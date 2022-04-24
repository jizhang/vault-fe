import api from '@/utils/api'

export async function getTableList() {
  return api.get('/table/list')
}

export async function getTableColumns(params: object) {
  return api.get('/table/columns', params)
}

export async function getTable(params: object) {
  return api.get('/table/get', params)
}

export async function saveTable(data: object) {
  return api.post('/table/save', data)
}

export async function deleteTable(data: object) {
  return api.post('/table/delete', data)
}
