import request from '@/utils/request'

export async function getTableList(params) {
  return request('/table/list', { params })
}

export async function getTable(params) {
  return request('/table/get', { params })
}

export async function getTableColumns(params) {
  return request('/table/columns', { params })
}

export async function saveTable(data) {
  return request('/table/save', { data })
}

export async function deleteTable(data) {
  return request('/table/delete', { data })
}
