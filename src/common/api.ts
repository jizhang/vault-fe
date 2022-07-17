import axios from 'axios'
import { stringify } from 'qs'
import { Message } from 'element-ui'
import i18n from '@/i18n'
import router from '@/router'

axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const api = axios.create({
  baseURL: '/api',
  timeout: 10 * 1000, // 10 seconds
})

api.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === 'post' && config.data) {
    config.data = stringify(config.data)
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    // Do Nothing
    return response
  },
  (err) => {
    // Process error:
    const res = err.response

    if (res.status === 400 || res.status === 403) {
      Message({
        message: (res.data && res.data.message) || i18n.t('userActions.badRequest'),
      })
    } else if (res.status === 401) {
      router.push({
        path: '/login',
      })
    } else {
      // TODO
    }

    return Promise.reject(new Error(''))
  }
)

export default api
