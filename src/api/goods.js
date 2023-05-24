import http from "../utils/http";
//获取商品列表
const goodsList=(data)=>{
    return http.get('goods',data)
}
//删除商品
const removeGood=(id)=>{
    return http.delete(`goods/${id}`)
}
//获取商品分类
const getCategories=()=>{
    return http.get('categories')
}
//获取商品参数
const getCategoriesMany=(id)=>{
    return http.get(`categories/${id}/attributes?sel=many`)
}
//获取商品属性
const getCategoriesOnly=(id)=>{
    return http.get(`categories/${id}/attributes?sel=only`)
}
const CreateGood=(data)=>{
    return http.post('/goods',data)
}
//更新商品
const UpdateGood=(id,data)=>{
    return http.put(`/goods/${id}`,data)
}

const GoodDetail=(id)=>{
    return http.get(`goods/${id}`)
}
export {
    goodsList,
    removeGood,
    getCategories,
    getCategoriesMany,
    getCategoriesOnly,
    CreateGood,
    GoodDetail,
    UpdateGood
}