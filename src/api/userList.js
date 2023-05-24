import http from '../utils/http'

//用户数据列表
const userList = () => {
    return http.get('/users', {
        query: '',
        pagenum: 1,
        pagesize: 20

    })
}
//添加用户
const userAdd = (data) => {
    return http.post('/users', data)
}
//修改用户状态
const userUpdata = (data) => {
    return http.put('users/:uId/state/:type/updata',data)
}
//根据ID查询用户
const userSelect = (id,data) => {
    return http.get(`users/${id}/select`,data)
}
//编辑提交用户
const userSubmit = (id) => {
    return http.put(`users/${id}`)
}
//删除单个用户
const userDelete = (id) => {
    return http.delete(`users/${id}`)
}
//分配用户角色
const UserRole = (id) => {
    return http.put(`users/${id}/role`)
}
export {
    userList,
    userAdd,
    userUpdata,
    userSelect,
    userSubmit,
    UserRole,
    userDelete

}