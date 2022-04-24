import qs from 'qs'
import { ElNotification } from 'element-plus'

function showError(message: string) {
  ElNotification({
    type: 'error',
    title: 'Error',
    message,
  })
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

async function handleBadRequest(response: Response) {
  const payload = await response.json()

  // Non-standard errors will be handled by caller
  if (payload.status === 400) {
    showError(payload.message)
  }

  throw payload
}

// http://shzhangji.com/blog/2018/04/07/error-handling-in-restful-api/
async function request(url: string, config: RequestInit) {
  url = '/api' + url

  config.headers = {
    ...config.headers,
    Authorization: 'Basic ' + window.btoa('admin:password'),
  }

  let response
  try {
    response = await fetch(url, config)
  } catch (error) {
    showError(getErrorMessage(error))
    throw error
  }

  if (response.ok) {
    // Deserialization error is not handled.
    return await response.json()
  }

  if (response.status === 400) {
    return await handleBadRequest(response)
  }

  if (response.status === 401) {
    // TODO login
  }

  showError(response.statusText)
  throw {
    status: response.status,
    message: response.statusText,
  }
}

async function get(url: string, params?: object) {
  const config: RequestInit = {
    method: 'GET',
  }

  if (params) {
    url += '?' + qs.stringify(params)
  }

  return request(url, config)
}

async function post(url: string, data?: object) {
  const config: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  if (data) {
    config.body = qs.stringify(data)
  }

  return request(url, config)
}

async function postJson(url: string, json: object) {
  const config: RequestInit = {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return request(url, config)
}

async function postForm(url: string, form: FormData) {
  const config: RequestInit = {
    method: 'POST',
    body: form,
  }
  return request(url, config)
}

export default {
  get,
  post,
  postJson,
  postForm,
}
