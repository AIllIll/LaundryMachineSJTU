import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 此处进行token等数据处理
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      // 此处进行异常处理
      return Promise.reject(res)
    }
    return response
  },
  error => {
    // 此处进行异常处理
    return Promise.reject(error)
  }
)

export default service
