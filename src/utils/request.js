import axios from 'axios'
import { Indicator } from 'mint-ui'
import { getStorage, clear } from '@/utils/auth'
// import { clear } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: config.baseURL // api 的 base_url
  // timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.url.includes('/port') && process.env.NODE_ENV === 'production') {
      config.url = config.url.replace('/port', '')
    }
    if (config.url.includes('uploadBase64FromApp') || config.url.includes('hhOcrAndSaveByPath')) {
      Indicator.open('识别中...')
    } else {
      Indicator.open('加载中...')
    }
    if (getStorage('tokenid')) {
      config.headers['tokenid'] = getStorage('tokenid') // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    if (Indicator) {
      Indicator.close()
    }
    if (response) {
      return response.data
    } else {
      Promise.reject(new Error('error'))
    }
  },
  error => {
    if (Indicator) {
      Indicator.close()
    }
    if (JSON.stringify(error).includes('401')) {
      alert('登录已过期，请重新登录！')
      clear()
      window.location.href = 'login'
    } else {
      alert(error)
    }
    return Promise.reject(error)
  }
)

export default service
