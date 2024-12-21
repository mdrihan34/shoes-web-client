
const MyOrderDash = () => {
  return (
    <div className="pt-5">
          <div className="min-h-screen  bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <p className="text-gray-600">Track your orders and their status</p>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Order Row */}
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">#12345</td>
              <td className="px-4 py-3">T-shirt</td>
              <td className="px-4 py-3">12 Dec 2024</td>
              <td className="px-4 py-3">
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                  Delivered
                </span>
              </td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:text-blue-900">View Details</button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">#12346</td>
              <td className="px-4 py-3">Hoodie</td>
              <td className="px-4 py-3">15 Dec 2024</td>
              <td className="px-4 py-3">
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full">
                  In Progress
                </span>
              </td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:text-blue-900">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Previous</button>
        <span className="text-gray-600">Page 1 of 5</span>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Next</button>
      </div>
    </div>
    </div>
  )
}

export default MyOrderDash
