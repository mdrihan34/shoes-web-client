import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useLoader from "../../hooks/useLoader";

const MyOrderDash = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrders] = useState([]);
  const Loader = useLoader();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.email) {
      console.error("User not found or email is missing.");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/orders?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    fetchOrder();
  }, [user]);

  return (
    <div>
      {loading ? (
        <div>{Loader}</div>
      ) : order.length ? (
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
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{order.sellerEmail}</td>
                      <td className="px-4 py-3">Shoes</td>
                      <td className="px-4 py-3">
                        <span className="bg-red-500 text-black text-sm font-medium px-2 py-1 rounded-full">
                          {order.Status}
                        </span>
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
    </div>
  );
};

export default MyOrderDash;
