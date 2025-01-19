import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ManageSellers = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [pendingSellers, setPendingSellers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!user?.email) {
        console.error("No logged-in user found");
        return;
      }

      try {
        const response = await axiosPublic.get("/current-user", {
          params: { email: user.email },
        });
        setCurrentUser(response.data); // Save the current user's data
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    if (user?.email) {
      fetchCurrentUser();
    }
  }, [user, axiosPublic]);

  useEffect(() => {
    const fetchSellers = async () => {
      if (!currentUser || currentUser.role !== "Admin") {
        console.error("Unauthorized access");
        return;
      }

      try {
        const response = await axiosPublic.get("/api/users");
        setSellers(response.data.filter((u) => u.role === "Seller"));
        setPendingSellers(response.data.filter((u) => u.role === "Pending"));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (currentUser?.role === "Admin") {
      fetchSellers();
    }
  }, [currentUser, axiosPublic]);

  const updateSellerRole = async (id, role) => {
    try {
      await axiosPublic.put(`/api/users/${id}`, { role });
      setSellers((prev) =>
        prev.filter((seller) => seller._id !== id) // Remove from sellers list
      );
      setPendingSellers((prev) =>
        prev.filter((seller) => seller._id !== id) // Remove from pending list
      );
    } catch (error) {
      console.error(`Error updating seller role to ${role}:`, error);
    }
  };

  const deleteSeller = async (id) => {
    try {
      await axiosPublic.delete(`/api/users/${id}`);
      setSellers((prev) => prev.filter((seller) => seller._id !== id)); // Remove from sellers
      setPendingSellers((prev) =>
        prev.filter((seller) => seller._id !== id) // Remove from pending list
      );
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Sellers</h1>

      {currentUser?.role === "Admin" ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Pending Sellers</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSellers.map((seller) => (
                  <tr key={seller._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{seller.name}</td>
                    <td className="border px-4 py-2">{seller.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                        onClick={() => updateSellerRole(seller._id, "Seller")}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sellers List</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{seller.name}</td>
                    <td className="border px-4 py-2">{seller.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => deleteSeller(seller._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-red-500">Unauthorized Access</p>
      )}
    </div>
  );
};

export default ManageSellers;
