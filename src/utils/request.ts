import axios from 'axios'
import router from '@/router'
import { Message, MessageBox } from 'element-ui'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status:number, other:string) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    case 403:
      Message('登录过期，请重新登录')
      // localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    case 404:
      Message('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000,
  withCredentials: true // send cookies when requests
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add token header to every request 根据本地是否存在token判断用户的登录情况
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const res = response.data
      if (res.code !== 0) {
        // sign out or not login 未登录
        if (res.code === -3) {
          MessageBox.confirm(
            '你已被登出，可以取消继续留在该页面，或者重新登录',
            '确定登出',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            // UserModule.ResetToken()
            location.reload() // To prevent bugs from vue-router
          })
        } else {
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(new Error(res.message || 'Error'))
        }
      } else {
        return response.data
      }
    } else {
      Promise.reject(response)
    }
  },
  (error) => {
    const { response } = error
    if (response) {
      // return status not 200
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 是否在线
      if (!window.navigator.onLine) {
        //  store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error)
      }
    }
  }
)

export default service
