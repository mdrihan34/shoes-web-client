
const Wishlist = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <p className="text-gray-600">Your favorite products saved for later</p>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Wishlist Item */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="Product"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Product Name</h3>
            <p className="text-gray-600">$29.99</p>
            <div className="mt-4 flex justify-between items-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add to Cart
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="Product"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Another Product</h3>
            <p className="text-gray-600">$49.99</p>
            <div className="mt-4 flex justify-between items-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add to Cart
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Add more items as needed */}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Previous</button>
        <span className="text-gray-600">Page 1 of 3</span>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Next</button>
      </div>
    </div>
  )
}

export default Wishlist
