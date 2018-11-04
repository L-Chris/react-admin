import axios from 'axios'
import conf from '@/conf'

// 默认配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = conf.baseURL

axios.interceptors.request.use(config => config,
  err => Promise.reject(err)
)
axios.interceptors.response.use(({data: { data, status, message }}) => {
  // if (status === 403) return navigate('/login')
  if (status === 200) { return data }
  return Promise.reject({data, status, message})
}, err => {
  return Promise.reject(err)
})

export default axios