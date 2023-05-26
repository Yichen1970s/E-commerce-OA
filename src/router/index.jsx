import { createBrowserRouter } from "react-router-dom";
import Login from '../components/Login.jsx'
import Home from '../components/Home.jsx'
import UserList from '../components/RightsManagement/UserList.jsx'
import PermissionList from '../components/RightsManagement/PermissionList.jsx'
import GoodList from "../components/goods/GoodList.jsx";
import GoodUpdate from "../components/goods/GoodUpdate.jsx";
import GoodAdd from "../components/goods/GoodAdd.jsx";
import WelCome from "../components/RightsManagement/WelCome.jsx";
import { element } from "prop-types";
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
          },
          {
            path: "good",
            element: <GoodList></GoodList>,
          },
          {
            path: "good/add",
            element: <GoodAdd></GoodAdd>,
          },
          {
            path: "good/update",
            element: <GoodUpdate></GoodUpdate>,
          },
          {
            path: 'welcome',
            element: <WelCome/>
          }
        ]
    },
    {
        path:'/login',
        element: <Login/>
    },   
]

const router = createBrowserRouter(routes);
export default router;

