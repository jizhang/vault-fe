import api from '@/common/api'

export async function queryBusinessOnlineList(params: object) {
  return api.get('/data-quality/business-online/list', { params })
}

export async function saveBusinessOnline(params: object) {
  return api.post('/data-quality/business-online/save', params)
}

export async function deleteBusinessOnline(params: object) {
  return api.post('/data-quality/business-online/delete', params)
}

export async function editBusinessOnline(params: object) {
  return api.get('/data-quality/business-online/edit', { params })
}

export async function checkQuery(data: object) {
  return api.post('/data-quality/business-online/check-query', data)
}
