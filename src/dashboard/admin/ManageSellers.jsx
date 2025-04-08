import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [pendingSellers, setPendingSellers] = useState([]);
  const axiosPublic = useAxiosPublic();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPublic.get("/users"); 
        const users = response.data;

    
        const filteredSellers = users.filter((user) => user.role === "Seller");
        const filteredPending = users.filter((user) => user.role === "Pending");

        setSellers(filteredSellers);
        setPendingSellers(filteredPending);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [axiosPublic]);


  const updateUserRole = async (id, email) => {
    try {
      await axiosPublic.put(`/users/${id}`, { role: "Seller" }); 


      const updatedUser = pendingSellers.find((user) => user._id === id);
      setSellers((prev) => [...prev, updatedUser]);
      setPendingSellers((prev) => prev.filter((user) => user._id !== id));


      toast.success(`${email} has been approved as a Seller!`, {
        position: "top-right",
      });
    } catch (error) {
      console.error(`Error updating role for user ${id}:`, error);
    }
  };


  const deleteUser = async (id, email) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this action for ${email}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axiosPublic.delete(`/users/${id}`); 

        setSellers((prev) => prev.filter((user) => user._id !== id));
        setPendingSellers((prev) => prev.filter((user) => user._id !== id));

       
        Swal.fire("Deleted!", `${email} has been removed.`, "success");
      } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
      }
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Sellers</h1>

      {/* Pending Sellers */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Pending Sellers</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
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
                  <td className="border px-4 py-2 flex space-x-4">
               
                    <button
                      onClick={() => updateUserRole(seller._id, seller.email)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Approve
                    </button>

               
                    <button
                      onClick={() => deleteUser(seller._id, seller.email)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div>
        <h2 className="text-2xl font-semibold mb-4">Sellers List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
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
                      onClick={() => deleteUser(seller._id, seller.email)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSellers;
