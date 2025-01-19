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
import ViewProduct from "../page/ViewProduct";
import Carts from "../page/Carts";
import Products from "../page/Products";
import AboutSection from "../page/AboutSection";
import PrivateRoute from "../AuthProvider/PrivateRoute";
import ManageSellers from "../dashboard/admin/ManageSellers";
import PendingApproval from "../page/PendingApproval";

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
      path: "/dashboard/Seller",
      element: <SellerDash></SellerDash>
    },
    {
      path: "/dashboard/add-product",
      element: <AddProducts></AddProducts>
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
      element: <ManageOrders></ManageOrders>
    },
    {
      path: "/dashboard/admin",
      element: <AdminDashboard></AdminDashboard>
    },
    {
      path: "/dashboard/Pending",
      element: <PendingApproval></PendingApproval>
    },
    {
      path: "/dashboard/carts",
      element: <Carts></Carts>
    },
    {
      path: "/dashboard/manageSeller",
      element: <ManageSellers></ManageSellers>
    },

   ]

  },
]);
