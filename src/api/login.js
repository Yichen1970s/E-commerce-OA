import http from '../utils/http'
const login=(data)=>{
    return http.post('/login',data)
}

const userList=()=>{
    return http.get('/users')
}
export {
    login,
    userList
}