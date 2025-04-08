import { useEffect, useState } from "react";

const OrderOverview = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/all-orders");
      const data = await response.json();



      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.data)) {
        setOrders(data.data);
      } else {
        console.error("Expected array but got:", typeof data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order Overview (Admin)</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-md">
              <div className="mb-3">
                <p className="text-sm text-gray-500">Buyer Email:</p>
                <p className="text-base font-semibold">
                  {order.BuyerEmail || "N/A"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-500">Total Price:</p>
                <p className="text-base text-green-600 font-bold">
                  ${order.totalPrice || 0}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-500">Seller:</p>
                <p className="text-base text-purple-600">
                  {order.sellerEmail || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Ordered Products:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <li key={index}>
                        {item.title || "Unnamed"} — $
                        {item.price || 0}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No products found</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderOverview;
