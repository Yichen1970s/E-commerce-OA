import http from '../utils/http'
//获取数据
const List=() => {
    return http.get('rights/list')
}

export {
    List
}