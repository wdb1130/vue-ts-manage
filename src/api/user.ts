import request from '@/utils/request'
// import qs from 'qs' // 根据需求是否导入qs模块
const user = {
  getUsers(params: any):any {
    return request({
      url: '/users',
      method: 'get',
      params
    })
  },

  updateUser(username: string, data: any):any {
    return request({
      url: `/users/${username}`,
      method: 'put',
      data
    })
  },

  deleteUser(username: string):any {
    return request({
      url: `/users/${username}`,
      method: 'delete'
    })
  },

  login(data: any):any {
    return request({
      url: '/users/login',
      method: 'post',
      data
    })
  },

  logout():any {
    return request({
      url: '/users/logout',
      method: 'post'
    })
  },

  register(data: any):any {
    return request({
      url: '/users/register',
      method: 'post',
      data
    })
  }
}

export default user
