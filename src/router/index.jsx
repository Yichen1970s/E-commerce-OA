import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login.jsx'
import Home from '../components/Home.jsx'
import UserList from "../views/UserList/UserList.jsx";

import Order from '../views/Order/Order'

export const routes=[
    {
        path:'/',
        element: <Home></Home>,
        children: [
            {
                path: 'order',
                element: <Order />
            },
            {
                path:'/user/list',
                 element: <UserList/>
             } 
            ]
    },
    {
        path:'/login',
        element: <Login/>
    },
   
]
const router=createBrowserRouter(routes)
export default router