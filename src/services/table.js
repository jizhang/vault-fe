import request from '@/utils/request'

export async function queryTableList(params) {
  return request('/table/list', { params })
}

export async function queryTable(params) {
  return request('/table/get', { params })
}

export async function queryColumns(params) {
  return request('/table/columns', { params })
}

export async function saveTable(data) {
  return request('/table/save', { data })
}

export async function deleteTable(data) {
  return request('/table/delete', { data })
}
