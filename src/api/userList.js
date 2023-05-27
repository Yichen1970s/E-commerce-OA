import http from '../utils/http'

//用户数据列表
const userList = (data) => {
    return http.get('/users', data)
}
//添加用户
const userAdd = (data) => {
    return http.post('/users', data)
}
//修改用户状态
const userUpdata = (id,data) => {
    console.log(data.mg_state);
    const type= data.mg_state===1?true:false
    return http.put(`users/${id}/state/${type}`,data)
}
//根据ID查询用户
const userSelect = (id,data) => {
    return http.get(`users/${id}/select`,data)
}
//编辑提交用户
const userSubmit = (id,data) => {
    return http.put(`users/${id}`,data)
}
//删除单个用户
const userDelete = (id) => {
    return http.delete(`users/${id}`)
}

const UserRole = () => {
    return http.get(`roles`)
}
//分配用户角色
const allotRole=(id,data)=>{
    return http.put(`users/${id}/role`,data)
}



export {
    userList,
    userAdd,
    userUpdata,
    userSelect,
    userSubmit,
    UserRole,
    userDelete,
    allotRole

}