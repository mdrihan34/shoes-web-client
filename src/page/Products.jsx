import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const notify = (message) => toast(message);
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalProducts, setTotalProducts] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products?page=${currentPage}&limit=${itemsPerPage}`
        );
        setProducts(data.products || []);
        setTotalProducts(data.totalProducts || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        notify("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, [currentPage]);

  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleAddToCart = async (product) => {
    if (!user) {
      notify("Please log in to add items to the cart.");
      return;
    }

    const cartData = {
      userEmail: user?.email,
      name: product.name,
      price: product.price,
      sellerEmail: product.userEmail,
      productImage: product.productImage,
    };

    try {
      await axios.post("http://localhost:5000/addToCart", cartData, {
        headers: { "Content-Type": "application/json" },
      });
      notify("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      notify("Failed to add item to cart. Please try again.");
    }
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className="container border-2 border-red-600 mt-20 mx-auto">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-2 sm:mb-0">All Products</h2>
        <select
          className="border p-2 rounded w-full sm:w-1/4"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {sortedProducts.map((product) => (
          <motion.div
            key={product._id}
            className="border p-4 rounded shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={`http://localhost:5000${product.productImage}`}
              alt={product.name || "Product Image"}
              className="w-full h-48 object-cover rounded mb-2"
              onError={(e) => (e.target.src = "/fallback-image.png")}
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <div className="flex mt-3 justify-between">
              <Button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-gray-900/10 border-2 border-green-400 text-black flex items-center gap-1 text-sm"
              >
                <MdAddShoppingCart />
                Add to Cart
              </Button>
              <Link to={`/view-product/${product._id}`}>
                <Button className="bg-blue-gray-900/10 border-2 text-blue-500 border-blue-600 flex items-center gap-1 text-sm">
                  <IoEyeOutline />
                  View
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
