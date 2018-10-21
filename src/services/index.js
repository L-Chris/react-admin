import axios from 'axios'
import config from '@/config'
import { navigate } from '@reach/router'

// 默认配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = config.baseURL

axios.interceptors.request.use(config => config,
  err => Promise.reject(err)
)
axios.interceptors.response.use(({data: {data, status, message}, config: { url }}) => {
  if (status === 403) return navigate('/login')
  if (status === 200) return data
  return Promise.reject({data, status, message})
}, err => {
  return Promise.reject(err)
})

export default axios