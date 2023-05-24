import http from '../utils/http'
//获取所有数据
const RightList = () => {
    return http.get('/roles')
}
//添加用户
const UserAdd = (data) => {
    return http.post('/roles',data)
}
//删除
const UserDelete = (id) => {
    return http.delete(`/roles/${id}`)
}
//获取当前编辑用户信息
const UserInfo = (id) => {
    return http.get(`/roles/${id}`)
}
//编辑用户信息
const UserUpdate = (id, data) => {
    return http.put(`/roles/${id}`,data)
}
//获取配置信息
const UserTree = () => {
    return http.get('rights/tree')
}

export {
    RightList,
    UserAdd,
    UserDelete,
    UserInfo,
    UserUpdate,
    UserTree
}