import { useContext, useEffect, useState } from 'react';
import { FiCheck, FiX, FiEye } from 'react-icons/fi';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const ManageOrders = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    if (!user || !user.email) {
      console.error("User not found or email is missing.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/order?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Error fetching orders:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleUpdates = async (orderToUpdate) => {
    if (orderToUpdate.Status === "confam") {
      alert("Order is already confirmed.");
      return;
    }

    try {
      const updatedOrder = { ...orderToUpdate, Status: "Confirmed" };
      const response = await fetch(`http://localhost:5000/order/${orderToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      const data = await response.json();
      if (response.ok && data.modifiedCount > 0) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderToUpdate._id ? updatedOrder : order
          )
        );
        alert("Order status updated to Confirmed!");
        setIsPopupOpen(false);
      } else {
        alert("No changes made.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  const handleViewDetails = (order) => {
    setCurrentOrder(order);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setCurrentOrder(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Orders</h2>
      <div className="bg-white mt-4 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4">Customer Email</th>
                <th className="border-b p-4">Status</th>
                <th className="border-b p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{order.OrderEmail}</td>
                  <td className="p-4 border-b">{order.Status}</td>
                  <td className="p-4 border-b flex space-x-3">
                    <button
                      onClick={() => handleUpdates(order)}
                      className="text-green-500 hover:text-green-700 flex items-center space-x-1"
                    >
                      <FiCheck /> <span>Confirm</span>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                    >
                      <FiX /> <span>Cancel</span>
                    </button>
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <FiEye /> <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isPopupOpen && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button onClick={handlePopupClose} className="text-gray-600 hover:text-gray-800">
                <FiX size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Email:</strong> {currentOrder.OrderEmail}</p>
              <p><strong>Address:</strong> {currentOrder.address}</p>
              <p><strong>Contact Number:</strong> {currentOrder.phone}</p>
              <p><strong>Status:</strong> {currentOrder.Status}</p>
            </div>
            <button
              onClick={handlePopupClose}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
