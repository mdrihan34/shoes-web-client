import { createBrowserRouter } from "react-router-dom";
import Mains from "../Mains";
import Home from "../Componets/home/Home";
import Login from "../loginRegister/Login";
import Register from "../loginRegister/Register";
import Dashboard from "../dashboard/Dashboard";
import BuyerDash from "../dashboard/buyerComponets/BuyerDash";
import MyOrderDash from "../dashboard/buyerComponets/MyOrderDash";

import SellerDash from "../dashboard/seller/SellerDash";
import AddProducts from "../dashboard/seller/AddProducts";
import ManageProducts from "../dashboard/seller/ManageProducts";
import ManageOrders from "../dashboard/seller/ManageOrders";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import ViewProduct from "../pages/ViewProduct";
import Carts from "../pages/Carts";
import Products from "../pages/Products";
import AboutSection from "../pages/AboutSection";
import PrivateRoute from "../AuthProvider/PrivateRoute";
import ManageSellers from "../dashboard/admin/ManageSellers";
import PendingApproval from "../pages/PendingApproval";
import OrderOverview from "../dashboard/admin/OrderOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mains></Mains>,
    children: [
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
      },
      {
        path: '/view-product/:id',
        element: <ViewProduct></ViewProduct>,
      },
      {
        path: '/products',
        element: <Products></Products>,
      },
      {
        path: '/about',
        element: <AboutSection></AboutSection>,
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/Buyer",
        element: (
          <PrivateRoute allowedRoles={["Buyer"]}>
            <BuyerDash />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-order",
        element: (
          <PrivateRoute allowedRoles={["Buyer"]}>
            <MyOrderDash />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/Seller",
        element: (
          <PrivateRoute allowedRoles={["Seller"]}>
            <SellerDash />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <PrivateRoute allowedRoles={["Seller"]}>
            <AddProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/ManageProducts",
        element: (
          <PrivateRoute allowedRoles={["Seller"]}>
            <ManageProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/ManageOrders",
        element: (
          <PrivateRoute allowedRoles={["Seller"]}>
            <ManageOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/orders-overview",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <OrderOverview />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/Pending",
        element: (
          <PrivateRoute allowedRoles={["Pending"]}>
            <PendingApproval />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/carts",
        element: (
          <PrivateRoute allowedRoles={["Buyer"]}>
            <Carts />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageSeller",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <ManageSellers />
          </PrivateRoute>
        ),
      },
    ]
  },
]);
