import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'
import store from './store'
import {Provider as StoreProvider} from 'react-redux'
//持久化 
import {persistor} from '../src/store'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router}></RouterProvider>
    </PersistGate>
  </StoreProvider>
)
