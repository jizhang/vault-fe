import qs from 'qs'

interface ConfigOption {
  params?: object
  data?: object
  json?: object
}

async function request(url: string, config?: ConfigOption) {
  url = '/api' + url
  if (config && config.params) {
    url += '?' + qs.stringify(config.params)
  }

  let response
  if (config && config.data) {
    response = await fetch(url, {
      method: 'POST',
      body: qs.stringify(config.data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  } else if (config && config.json) {
    response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(config.json),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } else {
    response = await fetch(url)
  }

  const data = await response.json()
  return data
}

export default request
