import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login.jsx";
import Home from "../components/Home.jsx";
import UserList from "../components/power/UserList.jsx";
import PermissionList from "../components/power/PermissionList.jsx";
import GoodList from "../components/goods/GoodList.jsx";
import GoodUpdate from "../components/goods/GoodUpdate.jsx";
import GoodAdd from "../components/goods/GoodAdd.jsx";
import WelCome from "../components/power/WelCome.jsx"
import GoodParam from "../components/goods/GoodParam.jsx";
import TableTags from "../components/goods/TableTags.jsx";
import GoodCategories from "../components/goods/GoodCategories.jsx";
import { element } from "prop-types";
import Orders from '../views/Order/Order.jsx'
import UserLists from "../views/UserList/UserList.jsx";
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
          },
          {
            path: "goods/edit",
            element: <GoodUpdate></GoodUpdate>,
          },
          {
            path: "params",
            element: <GoodParam></GoodParam>,
          },
          {
            path: "categories",
            element: <GoodCategories></GoodCategories>,
          },
          {
        path: "users",
        element: <UserLists></UserLists>,
      },
      {
        path: "orders",
        element: <Orders></Orders>,
      },
      {
            path: "test",
            element: <TableTags></TableTags>,
          },
        ]
    },
    {
        path:'/login',
        element: <Login/>
    },   
]
const router = createBrowserRouter(routes);
export default router;
