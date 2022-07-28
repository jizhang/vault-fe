import api from '@/common/api'

export async function queryBusinessOnlineList(params) {
  return api.get('/data-quality/business-online/list', { params })
}

export async function saveBusinessOnline(params) {
  return api.post('/data-quality/business-online/save', params)
}

export async function deleteBusinessOnline(params) {
  return api.post('/data-quality/business-online/delete', params)
}

export async function editBusinessOnline(params) {
  return api.get('/data-quality/business-online/edit', { params })
}

export async function checkQuery(data) {
  return api.post('/data-quality/business-online/check-query', data)
}
