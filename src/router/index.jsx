import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login.jsx'
import Home from '../components/Home.jsx'

export const routes=[
    {
        path:'/',
        element: <Home></Home>
    },
    {
        path:'/login',
        element: <Login/>
    }
]
const router=createBrowserRouter(routes)
export default router