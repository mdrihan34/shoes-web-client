import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePic = async () => {
     

      try {
        const response = await axios.get('http://localhost:5000/getUserProfile', {
          headers: {
            'email': user.email
          }
        });
        // console.log(response.data.profilePicture); 
        setProfilePic(response.data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile picture", error);
      }
    };

    fetchProfilePic();
  }, [user]);

  const links = (
    <>
      <div className="navbar-profile">
       
      </div>
      <li className="font-bold md:mr-12">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-bold md:mr-12">
        <NavLink to="/products">Products</NavLink>
      </li>
      <li className="font-bold md:mr-12">
        <NavLink to="/about">About</NavLink>
      </li>
      <li className="font-bold md:mr-12">
        <NavLink to="/wishlist">Wishlist</NavLink>
      </li>
      
      <li className="rounded-full font-bold md:mr-12 lg:hidden border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
        <NavLink to="/wishlist">Dashboard</NavLink>
      </li>
 <li>
 {user ? <div>
 <div className="flex lg:hidden justify-center rounded-full items-center gap-2 mb-10 border-2 border-green-500 h-10  text-green-600 transition-colors">
 <li className=" lg:hidden md:mr-12 ">
  <img className="rounded-full w-10" src={`http://localhost:5000${profilePic}`}  />
  </li>
  <li className="rounded-full  font-bold lg:hidden md:mr-12  hover:bg-green-500 hover:text-white"><Link onClick={logOut}>LogOut</Link></li>
 </div>
  <li className="rounded-full font-bold md:mr-12 lg:hidden border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
        <NavLink to="/wishlist">Dashboard</NavLink>
      </li>
 </div> : <div>
  <li className="rounded-full border-2 font-bold lg:hidden md:mr-12 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
        <NavLink to="/login">Login</NavLink>
      </li>
  </div>}
 </li>
    </>
  );

  return (
    <div className="lg:flex justify-center items-center lg:mt-2 lg:mb-6">
      <header className="relative w-full z-20 flex flex-col items-center px-4 py-2 text-slate-700 md:mx-auto md:flex-row md:items-center max-w-screen-xl">
        <h1 className="text-2xl font-black whitespace-nowrap cursor-pointer flex items-center">
          Quick<span className="text-orange-900">Mart</span>
        </h1>
        <input type="checkbox" className="sm:hidden peer hidden" id="navbar-open" />
        <label htmlFor="navbar-open" className="absolute top-5 right-7 cursor-pointer md:hidden">
          <span className="sr-only">Toggle Navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <nav aria-label="Header Navigation" className="flex flex-col items-center w-full max-h-0 overflow-hidden transition-all peer-checked:max-h-56 peer-checked:mt-8 md:max-h-full md:ml-24 md:flex-row">
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            {links}
          </ul>
        </nav>
      </header>
      <div className="invisible lg:visible absolute top-2 lg:right-[15%] w-10">
        {user ? (
          <div className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className=" m-1">
            <div className="avatar">
  <div className="ring-primary  w-16 rounded-full ring ring-offset-2">
    <img src={`http://localhost:5000${profilePic}`}  />
  </div>
</div>
            </div>
            {/* <div className="relative"> */}
    <ul
        tabIndex={0}
        className="absolute space-y-2 ml-2 rounded-box dropdown-content bg-base-100 w-52 p-4 z-50 shadow-lg"
    >
        <li>
            <Link
                className="btn w-full h-full btn-outline btn-primary py-2 hover:bg-primary hover:text-white"
                to='/dashboard'
            >
                Dashboard
            </Link>
        </li>
        <li>
            <button
                className="btn w-full btn-outline btn-secondary py-2 hover:bg-secondary hover:text-white"
                onClick={logOut}
            >
                LogOut
            </button>
        </li>
    </ul>
{/* </div> */}

          </div>
        ) : (
          <div className="md:mr-12">
            <Link to="/login">
              <button className="rounded-full border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
