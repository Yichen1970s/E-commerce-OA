import http from '../utils/http'
const login=(data)=>{
    return http.post('/login',data)
}
export {
    login
}