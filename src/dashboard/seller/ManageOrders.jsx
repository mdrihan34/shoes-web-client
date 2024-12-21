import  { useState } from 'react';
import { FiCheck, FiX, FiEye } from 'react-icons/fi';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerEmail: 'customer1@example.com',
      status: 'Confirmed',
      address: '123 Main St, Cityville',
      contactNumber: '123-456-7890',
    },
    {
      id: 2,
      customerEmail: 'customer2@example.com',
      status: 'Shipped',
      address: '456 Elm St, Townsville',
      contactNumber: '987-654-3210',
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const handleViewDetails = (order) => {
    setCurrentOrder(order);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setCurrentOrder(null);
  };

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
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{order.customerEmail}</td>
                  <td className="p-4 border-b">{order.status}</td>
                  <td className="p-4 border-b flex space-x-3">
                    <button
                      onClick={() => handleStatusChange(order.id, 'Confirmed')}
                      className="text-green-500 hover:text-green-700 flex items-center space-x-1"
                    >
                      <FiCheck /> <span>Confirm</span>
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, 'Canceled')}
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
              <p><strong>Email:</strong> {currentOrder.customerEmail}</p>
              <p><strong>Address:</strong> {currentOrder.address}</p>
              <p><strong>Contact Number:</strong> {currentOrder.contactNumber}</p>
              <p><strong>Status:</strong> {currentOrder.status}</p>
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
