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
//商品详情
const GoodDetail=(id)=>{
    return http.get(`goods/${id}`)
}

//删除或添加商品many 动态参数下的子标签
const upDateGoodMany=(goodId,manyId,data)=>{
    // http://www.tangxiaoyang.vip:8888/api/v2/categories/6/attribu
    return http.put(`categories/${goodId}/attributes/${manyId}`,data)
}

//添加动态参数| 静态属性
const CreatMany=(id,data)=>{
    return http.post(`categories/${id}/attributes`,data)
}
//编辑动态参数| 静态属性
const AddMany=(id,manyid,data)=>{
    return http.put(`categories/${id}/attributes/${manyid}`,data)
}
//删除动态参数 | 静态属性
const DELETEMany=(id,manyid)=>{
    return http.delete(`categories/${id}/attributes/${manyid}`)
}


export {
    goodsList,
    removeGood,
    getCategories,
    getCategoriesMany,
    getCategoriesOnly,
    CreateGood,
    GoodDetail,
    UpdateGood,
    upDateGoodMany,
    AddMany,
    DELETEMany,
    CreatMany
}