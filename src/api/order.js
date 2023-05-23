import http from "../utils/http"

//订单列表接口 ，获取订单数据列表
const ordersList = (data) => {
    return http.get('/orders', data)
}
//修改订单状态
const orderStatusUpdate = (id, data) => {
    return http.put(`/orders/${id}`, data)
}
//查看指定的某个订单详情
const ordersDetail = (id) => {
    return http.get(`/orders/${id}`)
}
//修改地址
const ordersAddressUpdate = (id, data) => {
    return http.put(`/orders/${id}/address`, data)
}
//查看物流信息'815294206237577'
const orderLogisticsInfo = (id) => {
    return http.get(`/kuaidi/${id}`)
}


export {
    ordersList,
    orderStatusUpdate,
    ordersDetail,
    ordersAddressUpdate,
    orderLogisticsInfo
}