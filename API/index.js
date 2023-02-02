import request from './request'

export const loginAPI = ({username:nickname,password}) => {
    return request({
        url:'/admin/login',
        method:'post',
        data: {
            nickname,
            password,
        }
    })
}

export const getUserInfoAPI = (token) => {
    return request({
      url: '/admin/user/info',
      method:'get',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  