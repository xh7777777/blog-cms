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

export const getLoggerAPI = () => {
    return request({
        url: '/logger'
    })
}

export const editLoggerAPI = ({content,id}) => {
    return request({
        url: `/logger/${id}`,
        method:'put',
        data:{
            content
        },
    })
}

export const createLoggerAPI = ({content}) => {
    return request({
        url: `/logger`,
        method:'post',
        data:{
            content
        },
    })
}
  
export const deleteLoggerAPI = ({id}) => {
    return request({
        url: `/logger/${id}`,
        method:'delete',
    })
}

export const getTalkAPI = () => {
    return request({
        url: '/talk'
    })
}

export const editTalkAPI = ({content,id}) => {
    return request({
        url: `/talk/${id}`,
        method:'put',
        data:{
            content
        },
    })
}

export const createTalkAPI = ({content}) => {
    return request({
        url: `/talk`,
        method:'post',
        data:{
            content
        },
    })
}
  
export const deleteTalkAPI = ({id}) => {
    return request({
        url: `/talk/${id}`,
        method:'delete',
    })
}
  
export const getCateAPI = () => {
    return request({
        url: '/category'
    })
}

export const editCateAPI = ({name,id}) => {
    return request({
        url: `/category/${id}`,
        method:'put',
        data:{
            name
        },
    })
}

export const createCateAPI = ({name}) => {
    return request({
        url: `/category`,
        method:'post',
        data:{
            name
        },
    })
}
  
export const deleteTagAPI = (id) => {
    return request({
        url: `/tag/${id}`,
        method:'delete',
    })
}
  
export const getTagAPI = () => {
    return request({
        url: '/tag'
    })
}

export const editTagAPI = ({tag_name,id}) => {
    return request({
        url: `/tag/${id}`,
        method:'put',
        data:{
            tag_name
        },
    })
}

export const createTagAPI = (tag_name) => {
    return request({
        url: `/tag`,
        method:'post',
        data:{
            tag_name
        },
    })
}
  
export const deleteCateAPI = (id) => {
    return request({
        url: `/category/${id}`,
        method:'delete',
    })
}

export const createArticleAPI = (data) => {
    return request({
        url: `/article`,
        method:'post',
        data
    })
}

export const getArticleTableAPI = (pageIndex,pageSize) => {
    return request({
        url: `/article/table?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        method:'post',
        data: {
            
        }
    })
}

export const deleteArticleAPI = (id) => {
    return request({
        url: `/article/${id}`,
        method:'delete'
    })
}

export const getArticleDetailAPI = (id) => {
    return request({
        url: `/article/detail/${id}`
    })
}


export const getPicAPi = (url) => {
    return request({
        url
    })
}

export const getAboutAPI = () => {
    return request({
        url:'/about'
    })
}

export const updateAboutAPI = (content) => {
    return request({
        url:'/about',
        method:'put',
        data:{content}
    })
}

