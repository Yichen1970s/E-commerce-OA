import {configureStore} from '@reduxjs/toolkit'
import userReducer from './modules/user'
import {
    persistStore,
    persistReducer,//对模块持久化
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
//本地存储
import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    //白名单 只对指定的state进行持久化
    // whitelist:[]
  }

const store=configureStore({
    reducer:{
        // 这里也是命名空间 -》useSelector((state)=>state.counter)
        //持久化
        user:persistReducer(persistConfig,userReducer),
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})
export const persistor = persistStore(store)
export default store