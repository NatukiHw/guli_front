import axios from 'axios'
import { message } from 'ant-design-vue';

import cookie from  "js-cookie"

const BASE_URL = "http://127.0.0.1:9020"

const service = axios.create({
  baseURL: BASE_URL
})

service.interceptors.request.use(
  config => {
    let token = cookie.get("guli_token");
    if(token) {
      config.headers["authorization"] = token;
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      message.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
