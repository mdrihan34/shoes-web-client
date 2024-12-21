

const BuyerDash = () => {
  return (
    <div className="">
      <div>

      </div>
      <div className="p-6 bg-gray-100 w-full min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back, John Doe! 👋</h1>
        <p className="text-gray-600 mt-2">Here’s what’s happening in your account today.</p>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-500">120</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-3xl font-bold text-orange-500">5</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Completed Orders</h2>
          <p className="text-3xl font-bold text-green-500">100</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Cancelled Orders</h2>
          <p className="text-3xl font-bold text-red-500">15</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 shadow rounded-lg mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Order #12345</span>
            <span className="text-sm text-gray-500">Pending</span>
            <button className="text-blue-500">View Details</button>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>Order #12346</span>
            <span className="text-sm text-gray-500">Completed</span>
            <button className="text-blue-500">View Details</button>
          </div>
        </div>
      </div>
</div>
    </div>
  )
}

export default BuyerDash
