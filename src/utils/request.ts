import qs from 'qs'
import { ElNotification } from 'element-plus'

interface ConfigOption {
  params?: object
  data?: object
  json?: object
}

function parseConfig(config?: ConfigOption): RequestInit {
  if (config?.data) {
    return {
      method: 'POST',
      body: qs.stringify(config.data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  }

  if (config?.json) {
    return {
      method: 'POST',
      body: JSON.stringify(config.json),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  return {
    method: 'GET',
  }
}

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
async function request(url: string, config?: ConfigOption) {
  url = '/api' + url
  if (config?.params) {
    url += '?' + qs.stringify(config.params)
  }

  const options = parseConfig(config)
  let response
  try {
    response = await fetch(url, options)
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

export default request
