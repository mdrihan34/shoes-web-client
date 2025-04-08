import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useLoader from "../../hooks/useLoader";

const MyOrderDash = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const Loader = useLoader();

  useEffect(() => {
    if (!user || !user.email) {
      console.error("User not found or email is missing.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://shoes-web-server.vercel.app/orders?email=${user.email}`);
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

  const handleViewDetails = (order) => {
    setSelectedOrder(order); 
  };

  const closeModal = () => {
    setSelectedOrder(null); 
  };

  return (
    <div>
      {loading ? (
        <div>{Loader}</div>
      ) : orders.length ? (
        <div className="pt-5">
          <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
              <p className="text-gray-600">Track your orders and their status</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-800 text-white text-left">
                    <th className="px-4 py-3">Seller Email</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Total Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{order.sellerEmail}</td>
                      <td className="px-4 py-3">
     
                        {order.items?.map((item, idx) => (
                          <div key={idx}>{item.title}</div>
                        )) || "No products found"}
                      </td>
                      <td className="px-4 py-3">${order.totalPrice}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${
                            order.Status === "Confirmed"
                              ? "bg-green-500 text-white"
                              : order.Status === "Pending"
                              ? "bg-yellow-500 text-black"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {order.Status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 animate-bounce">
              No orders yet! 🛒
            </h2>
            <p className="text-gray-600 mt-2">
              Please place an order. We are ready to provide you with the best service. 😊
            </p>
            <button
              className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-300"
              onClick={() => alert("Redirecting to the order page!")}
            >
              Place Order Now
            </button>
          </div>
        </div>
      )}

   
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                ✖️
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Buyer Name:</strong> {selectedOrder.OrderName}</p>
              <p><strong>Buyer Email:</strong> {selectedOrder.OrderEmail}</p>
              <p><strong>Buyer Contact:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}, ZIP: {selectedOrder.zip}</p>
              <p><strong>Seller Email:</strong> {selectedOrder.sellerEmail}</p>
              <p><strong>Status:</strong> {selectedOrder.Status}</p>
              <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
              <p><strong>Ordered At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

           
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Items:</h4>
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3 border rounded-md bg-gray-50 mb-2">
                    <p><strong>Title:</strong> {item.title}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                  </div>
                )) || <p>No items in this order.</p>}
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrderDash;
