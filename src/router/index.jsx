import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login.jsx'
import Home from '../components/Home.jsx'
import UserList from '../components/RightsManagement/UserList.jsx'
import PermissionList from '../components/RightsManagement/PermissionList.jsx'
export const routes=[
    {
        path:'/',
        element: <Home></Home>,
        children: [
            {
                path: 'rights/userlist',
                element: <UserList />
            },
            {
                path: 'rights/permissionlist',
                element: <PermissionList />
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