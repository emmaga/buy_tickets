import axios from 'axios'
import {getParam, clearParam} from '@/utils'
import router from '@/router'
import Vue from 'vue'
import store from '@/store'

axios.defaults.baseURL = 'http://otatest.cleartv.cn/ota_backend/v1'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (getParam('clearToken')) {
    config.data.token = getParam('clearToken')
    config.data.projectName = getParam('projectName')
    config.data.OTACode = getParam('OTACode')
    config.data.account = getParam('account')
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做些事
  if (response.data.rescode === 401) {
    alert(response.data.errInfo)
    clearParam('clearToken')
    store.commit('delUserName')
    router.push('/login')
  } else if (response.data.rescode !== 200) {
    alert(response.data.errInfo)
  } else {
    return response
  }
}, function (error) {
  // 请求错误时做些事
  alert('连接服务器出错 ' + error)
  // return Promise.reject(error)
})

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

export default axios
