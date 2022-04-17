import request from '@/utils/request'

export async function getTableList() {
  return request('/table/list')
}

export async function getTableColumns(params: object) {
  return request('/table/columns', { params })
}

export async function getTable(params: object) {
  return request('/table/get', { params })
}

export async function saveTable(data: object) {
  return request('/table/save', { data })
}

export async function deleteTable(data: object) {
  return request('/table/delete', { data })
}
