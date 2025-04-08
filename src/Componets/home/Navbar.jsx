import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import WebLogo from './../../assets/icons/WebLogo.gif';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Navbar = () => {
  const [cartCount, setCartCount] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const axiosPublic = useAxiosPublic();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    if (!user?.email) {
   
      return;  
    }

    const fetchCurrentUser = async () => {
      try {
        const response = await axiosPublic.get('/current-user', {
          params: { email: user.email },
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchCurrentUser();
  }, [user, axiosPublic]);

  useEffect(() => {
    if (!user?.email) {
   
      return;
    }

    const fetchProfilePic = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getUserProfile', {
          headers: { 'email': user.email }
        });
        setProfilePic(response.data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile picture", error);
      }
    };

    fetchProfilePic();
  }, [user]);

 
  useEffect(() => {
    if (!user?.email) return;  

    const fetchUserProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/carts?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setCartCount(data.products);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchUserProducts();
  }, [user]);

  const links = (
    <>
      <li className="font-bold md:mr-12">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-bold md:mr-12">
        <NavLink to="/products">Products</NavLink>
      </li>
      <li className="font-bold md:mr-12">
        <NavLink to="/about">About</NavLink>
      </li>

      {/* Cart link, only visible for buyers */}
      {user && currentUser.role === "Buyer" && (
        <li className="lg:mr-6">
          <NavLink to="/dashboard/carts">
            <div className="relative flex items-center justify-center">
              <button className="relative p-2 hover:bg-gray-300">
                <MdAddShoppingCart className="w-10 text-blue-500 h-10" />
                {cartCount.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount.length}
                  </span>
                )}
              </button>
            </div>
          </NavLink>
        </li>
      )}

      {/* Dashboard links for Seller and Admin */}
      {user && currentUser.role === "Seller" && (
        <li className="font-bold flex md:mr-12">
          <NavLink className='flex items-center gap-2' to="/dashboard/seller">
            <FaBox className="text-orange-500" />
            Seller Dashboard
          </NavLink>
        </li>
      )}
       {user && currentUser.role === "Pending" && (
        <li className="font-bold flex md:mr-12">
          <NavLink className='flex items-center gap-2' to="/dashboard/Pending">
            <FaBox className="text-orange-500" />
            Seller Dashboard
          </NavLink>
        </li>
      )}

      {user && currentUser.role === "admin" && (
        <li className="font-bold md:mr-12">
          <NavLink className='flex items-center gap-2' to="/dashboard/admin">
            <FaBox className="text-green-500" />
            Admin Dashboard
          </NavLink>
        </li>
      )}

      {/* If user is not logged in, show login button */}
      {!user ? (
        <li className="rounded-full flex items-center gap-2 border-2 font-bold md:mr-12 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
          <IoLogIn />
          <NavLink to="/login">Login</NavLink>
        </li>
      ) : (
        <li>
          <div className="avatar lg:p-2">
            <div className="ring-primary w-16 rounded-full ring ring-offset-2">
              <img src={`http://localhost:5000${profilePic}`} alt="Profile" />
            </div>
          </div>
        </li>
      )}
    </>
  );

  return (
    <div className="lg:flex justify-center  w-full items-center lg:mt-2 lg:mb-6">
      <header className="relative w-full  z-30 flex flex-col items-center  py-2 text-slate-700 md:mx-auto md:flex-row md:items-center max-w-screen-[1899px]">
        <div className="flex items-center justify-center">
          <img
            src={WebLogo}
            alt="Website Logo"
            className="w-[48%] lg:w-[15%] absolute top-[-47px] lg:top-[-79px] left-[-4%] lg:left-[-50px]"
          />
        </div>
        <input type="checkbox" className="sm:hidden peer hidden" id="navbar-open" />
        <label htmlFor="navbar-open" className="absolute top-5 right-7 cursor-pointer md:hidden">
          <span className="sr-only">Toggle Navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <nav
          aria-label="Header border Navigation"
          className="flex flex-col mt-[-10px] items-center w-full max-h-0 overflow-hidden transition-all peer-checked:max-h-56 peer-checked:mt-8 md:max-h-full  md:flex-row"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            {links}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
