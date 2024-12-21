import { createBrowserRouter } from "react-router-dom";
import Mains from "../Mains";
import Home from "../Componets/home/Home";
import Login from "../loginRegister/Login";
import Register from "../loginRegister/Register";
import Dashboard from "../dashboard/Dashboard";
import BuyerDash from "../dashboard/buyerComponets/BuyerDash";
import MyOrderDash from "../dashboard/buyerComponets/MyOrderDash";
import Wishlist from "../dashboard/buyerComponets/Wishlist";
import SellerDash from "../dashboard/seller/SellerDash";
import AddProducts from "../dashboard/seller/AddProducts";
import ManageProducts from "../dashboard/seller/ManageProducts";
import ManageOrders from "../dashboard/seller/ManageOrders";
import AdminDashboard from "../dashboard/admin/AdminDashboard";

// import Mains from "../Mains";
// // import Home from "../Componets/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Mains></Mains>,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
   children: [
    {
      path: "/dashboard/buyer",
      element: <BuyerDash></BuyerDash>
    },
    {
      path: "/dashboard/my-order",
      element: <MyOrderDash></MyOrderDash>
    },
    {
      path: "/dashboard/Wishlist",
      element: <Wishlist></Wishlist>
    },
    {
      path: "/dashboard/seller",
      element: <SellerDash></SellerDash>
    },
    {
      path: "/dashboard/add-product",
      element: <AddProducts></AddProducts>
    },
    {
      path: "/dashboard/ManageProducts",
      element: <ManageProducts></ManageProducts>
    },
    {
      path: "/dashboard/ManageOrders",
      element: <ManageOrders></ManageOrders>
    },
    {
      path: "/dashboard/AdminDashboard",
      element: <AdminDashboard></AdminDashboard>
    }

   ]

  },
]);
