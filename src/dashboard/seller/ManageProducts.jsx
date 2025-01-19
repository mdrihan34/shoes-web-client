import { useContext, useEffect, useState } from 'react';
import { FiEdit, FiTrash, FiX } from 'react-icons/fi';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.email) {
      console.error("User not found or email is missing.");
      setLoading(false);
      return;
    }

    const fetchUserProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-products?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data.products);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user-products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (product) => {
    setCurrentProduct(product);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setCurrentProduct({});
  };

  const handleUpdates = async (e) => {
    e.preventDefault();
    if (!currentProduct || !currentProduct.name || !currentProduct.price || !currentProduct.description) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user-products/${currentProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProduct),
      });
      const data = await response.json();
      if (response.ok && data.modifiedCount > 0) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === currentProduct._id ? currentProduct : product
          )
        );
        alert('Product updated successfully!');
        handlePopupClose();
      } else {
        alert('No changes made.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const truncateDescription = (text, wordLimit = 20) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? { truncated: words.slice(0, wordLimit).join(' ') + '...', full: text }
      : { truncated: text, full: text };
  };

  if (loading) {
    return <p>Loading...</p>;
  }
 console.log(user)
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
      <div className="bg-white mt-4 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b p-4">Image</th>
                <th className="border-b p-4">Name</th>
                <th className="border-b p-4">Price</th>
                <th className="border-b p-4">Description</th>
                <th className="border-b p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => {
                const { truncated, full } = truncateDescription(product.description);
                const isExpanded = expandedDescriptions[product._id];
                return (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="p-4 border-b w-[20%]">
                      <img
                        src={`http://localhost:5000${product.productImage}`}
                        alt={product.name}
                        className="w-full object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-4 border-b w-[20%]">{product.name}</td>
                    <td className="p-4 border-b">${product.price}</td>
                    <td className="p-4 border-b w-[30%]">
                      <span>{isExpanded ? full : truncated}</span>
                      <button
                        className="text-blue-500 ml-2 underline"
                        onClick={() => toggleDescription(product._id)}
                      >
                        {isExpanded ? 'See less' : 'See more'}
                      </button>
                    </td>
                    <td className="p-4 border-b">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(product)}
                          className="text-blue-500 btn btn-outline btn-primary hover:text-blue-700 flex items-center space-x-1"
                        >
                          <FiEdit /> <span>Update</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 btn btn-outline btn-secondary hover:text-red-700 flex items-center space-x-1"
                        >
                          <FiTrash /> <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {products.length > productsPerPage && (
          <div className="mt-4 flex justify-center space-x-2">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Previous
              </button>
            )}
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number + 1)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === number + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {number + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Product</h3>
              <button onClick={handlePopupClose} className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdates}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentProduct.name || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={currentProduct.price || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProduct.description || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Update Product
              </button>
            
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

