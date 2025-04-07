import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Componets/home/Navbar"
import Footer from "./Componets/home/Footer"

const Mains = () => {
  const location = useLocation();

  // Define the routes where the footer should be hidden
  const hideFooterRoutes = ["/login", "/register"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    <div className=''>
      <Navbar></Navbar>
      <Outlet>

      </Outlet>
      {!shouldHideFooter && <Footer />}

    </div>
  )
}

export default Mains
