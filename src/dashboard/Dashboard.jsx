import { Outlet } from "react-router-dom"
import DashSideBar from "./DashSideBar"


const Dashboard = () => {
  return (
    <div className="flex ">
     <DashSideBar></DashSideBar>
<div className="mt-7 w-full">
<Outlet></Outlet>
</div>
    </div>
  )
}

export default Dashboard
