import request from './request'

async function get(url: string, params?: object) {
  return request(url, { params })
}

async function post(url: string, data?: object) {
  return request(url, { data })
}

async function postJson(url: string, json: object) {
  return request(url, { json })
}

async function postForm(url: string, form: FormData) {
  const options = {
    method: 'POST',
    body: form,
  }
  const response = await fetch(url, options)
  return await response.json()
}

export default {
  get,
  post,
  postJson,
  postForm,
}
