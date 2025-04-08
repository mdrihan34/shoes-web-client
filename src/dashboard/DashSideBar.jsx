import { useContext, useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdManageSearch, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaLuggageCart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import axios from "axios";
import { FiHome } from "react-icons/fi";

const DashSideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
  const axiosPublic = useAxiosPublic();
  const {user , logOut} = useContext(AuthContext)
  const [profilePic, setProfilePic] = useState("");
  const navigation = useNavigate()
  useEffect(() => {
    const fetchProfilePic = async () => {
     

      try {
        const response = await axios.get('http://localhost:5000/getUserProfile', {
          headers: {
            'email': user.email
          }
        });
       
        setProfilePic(response.data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile picture", error);
      }
    };

    fetchProfilePic();
  }, [user]);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user?.email) {
        console.error("No logged-in user found");
        return;
      }

      try {
        const response = await axiosPublic.get('/current-user', {
          params: { email: user.email },
        });
        setCurrentUser(response.data); 
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    if (user?.email) {
      fetchCurrentUser(); 
    }
  }, [user, axiosPublic]);

  if (!setCurrentUser) {
    return <p>Loading...</p>; 
  }
  

    const handleLogOut = ()=>{
    logOut()
    if(logOut){
     return navigation('/')
    }
    }
  return (
    <div className="flex">
    {/* Sidebar */}
    <aside
      className={`fixed lg:relative z-40 w-64  h-screen  pt-20 lg:pt-5 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="px-3 h-full overflow-y-auto ">
        

<div className="w-full max-w-sm  ">
    <div className="flex justify-end px-4 pt-4">
       
      
       
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-20 border border-red-200 h-20 mb-3 rounded-full shadow-lg" src={`http://localhost:5000${profilePic}`} alt="profile image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{currentUser.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Email: {currentUser.email}</span>
       
    </div>
</div>

      <ul className="space-y-2 font-medium">
      {currentUser.role === 'Seller' && (
      <div>
          <li>
          <NavLink
            to="/dashboard/Seller" 
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MdDashboard />
            <span>Seller Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/add-product" 
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Add Product:</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/ManageProducts" 
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Manage Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/ManageOrders" 
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Orders</span>
          </NavLink>
        </li>
      
        
      </div>
        
      )}

      {currentUser.role === 'Buyer' && (
      <div>
          <NavLink
            to="/dashboard/Buyer" 
            className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
              <MdDashboard />
            <span>Buyer Dashboard</span>
          </NavLink>
         <li>
         <NavLink
            to="/products" 
            className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MdManageSearch />
            <span>Browse Products</span>
          </NavLink>
         </li>
          <li>
          <NavLink
            to="/dashboard/my-order" 
            className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaLuggageCart />
            <span>My Orders</span>
          </NavLink>
          </li>
        <li>
        
        </li>
        <li>
        <NavLink
            to="/dashboard/carts" 
            className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <BsCart
             />
            <span>Carts</span>
          </NavLink>
        </li>
            </div>
      )}

      {currentUser.role === 'admin' && (
      <div>
          <li>
          <NavLink
            to="/dashboard/Admin"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Admin Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/manageSeller"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Manage Sellers</span>
          </NavLink>
        </li>
        
        
        <li>
          <NavLink
            to="/dashboard/orders-overview"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>Orders Overview</span>
          </NavLink>
        </li>
       
       
        
      </div>
      )}

      {/* Common Settings Link */}
      <li>
      <Link to='/'
                className="btn uppercase w-full btn-outline btn-secondary py-2 hover:bg-secondary hover:text-white"
               
            > <FiHome></FiHome>
                Home
            </Link>
      </li>
      <li>
      <button
                className="btn uppercase w-full btn-outline btn-primary  py-2 hover:bg-secondary hover:text-white"
                onClick={handleLogOut}
            >
                LogOut
            </button>
      </li>
    
    </ul>
      </div>
    </aside>

    {/* Main Content */}
    <div className="flex-1">
      {/* Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
        
            {/* Icon changes based on sidebar state */}
            {isSidebarOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
          
        </div>
      </nav>

      {/* Page Content */}
      
    </div>
  </div>


    
  )
}

export default DashSideBar
