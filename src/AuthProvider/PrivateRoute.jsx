import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosPublic.get("/current-user", {
          params: { email: user.email },
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [user, axiosPublic]);


  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }


  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    console.log("Allowed Roles:", allowedRoles);
    console.log("Current User Role:", currentUser?.role); 
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
          <p className="text-lg text-gray-600 mt-2">This page is not for you.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return children || <Outlet />;
};

export default PrivateRoute;
