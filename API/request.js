import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'http://localhost:3000'
})

const whiteAPIList = ['/admin/login']

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (!whiteAPIList.includes(config.url)) {
    const token = localStorage.getItem('token')
    if(token)
        config.headers.Authorization ='Bearer '+ token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default myAxios