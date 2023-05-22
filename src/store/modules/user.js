import { createSlice } from "@reduxjs/toolkit";
//创建一个PTk模块对象
const userSlice=createSlice({
  //防止不同模块 相同方法  dispatch的命名空间
  name:'user',
  initialState:{
    userInfo:{}
  },
  //同步方法
  reducers:{
    userInfoUpdate(state,action){
      console.log(action.payload);
      state.userInfo=action.payload
    },
    claerUserInfo(state,action){
      state.userInfo={}
    }
  }
})

export const {userInfoUpdate} =userSlice.actions
//吧counter模块的reducer方法提供出去
export default userSlice.reducer