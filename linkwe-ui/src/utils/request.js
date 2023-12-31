import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.BASE_URL_REAR === 'development' ? 'api' : process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers = window.CONFIG.headers // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 200) {
      return res.data
    } else if (code === 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          location.href = process.env.VUE_APP_BASE_URL
        })
      })
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      // return Promise.reject(new Error(msg))
      return Promise.reject()
    } else {
      // let errMsg = response.data.msg || response.data.errMsg || data.msg || data.errMsg
      if (process.env.NODE_ENV === 'development') {
        Message({
          message: `后端错误：接口：${response.config.url}，${code}错误：${msg}`,
          type: 'error'
        })
      } else {
        Notification.error({
          title: msg
        })
      }
      return Promise.reject()
    }
  },
  (error) => {
    console.log('err: ' + error)
    let { message: msg, response, config } = error
    if (msg == 'Network Error') {
      msg = '后端接口连接异常'
    } else if (msg.includes('timeout')) {
      msg = '系统接口请求超时'
    } else if (response) {
      let status = response.status
      msg = '系统接口:' + status + '异常'
    }
    Message({
      message: `${msg}:${config.url}`,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject()
  }
)

export default service
