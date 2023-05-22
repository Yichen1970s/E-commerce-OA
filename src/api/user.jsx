import http from "../utils/http"

//登录接口
const login = (data) => {
    return http.post('/login', data)
}
//用户列表接口 ，获取用户集合
const usersList = () => {
    return http.get('/usersList')
}
//用户表气泡框删除数据接口，删除用户
const userDelete = (id) => {
    return http.delete(`/users/${id}`)
}
//更新用户接口,局部更新patch,全部更新push
const userUpdate = (id,data) => {
    return http.patch(`/users/${id}`,data)
} 
//添加用户-----post就是添加功能
const userCreate = (data) => {
    return http.post(`/users`,data)
} 

export {
    login,
    usersList, 
    userDelete,
    userUpdate,
    userCreate
}