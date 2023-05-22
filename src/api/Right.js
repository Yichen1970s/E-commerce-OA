import http from '../utils/http'

const RightList = () => {
    return http.get('/roles')
}

export {
    RightList
}