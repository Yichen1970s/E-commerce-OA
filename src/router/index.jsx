import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login.jsx";
import Home from "../components/Home.jsx";
import GoodList from "../components/goods/GoodList.jsx";
import GoodUpdate from "../components/goods/GoodUpdate.jsx";
import GoodAdd from "../components/goods/GoodAdd.jsx";

export const routes = [
  {
    path: "/",
    element: <Home></Home>,
    children: [
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
const router = createBrowserRouter(routes);
export default router;
