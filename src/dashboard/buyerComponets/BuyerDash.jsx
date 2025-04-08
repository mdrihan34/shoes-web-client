import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const BuyerDash = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

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
      }
    };

    fetchOrders();
  }, [user]);

  
  const pendingOrders = orders.filter(order => order.Status === 'pending');
  const confirmedOrders = orders.filter(order => order.Status === 'Confirmed');
  const cancelledOrders = orders.filter(order => order.Status === 'Confirmed');

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen">
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-600 mt-2">Here’s what’s happening in your account today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-500">{orders.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-3xl font-bold text-orange-500">{pendingOrders.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Confirmed Orders</h2>
          <p className="text-3xl font-bold text-green-500">{confirmedOrders.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Cancelled Orders</h2>
          <p className="text-3xl font-bold text-red-500">{cancelledOrders.length}</p>
        </div>
      </div>
    </div>
  );
};

export default BuyerDash;
