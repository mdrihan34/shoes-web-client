import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCreditCard, FaUser, FaAddressCard, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Carts = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      console.error("User not found or email is missing.");
      return;
    }

    const fetchUserProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/carts?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setCarts(data.products);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchUserProducts();
  }, [user]);

  const total = carts.reduce((acc, cart) => acc + Number(cart.price), 0);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/carts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== id));
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleBuy = () => setIsPopupOpen(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const BuyerEmail = user.email;

    const groupedBySeller = carts.reduce((acc, item) => {
      if (!acc[item.sellerEmail]) {
        acc[item.sellerEmail] = [];
      }
      acc[item.sellerEmail].push(item);
      return acc;
    }, {});

    try {
      for (const sellerEmail in groupedBySeller) {
        const sellerCarts = groupedBySeller[sellerEmail];

        const totalPrice = sellerCarts.reduce((sum, item) => sum + item.price, 0);

        const orderData = {
          BuyerEmail,
          name: data.name,
          address: data.address,
          OrderEmail: data.email,
          sellerEmail,
          OrderName: data.name,
          phone: data.phone,
          zip: data.zip,
          totalPrice,
          Status: "pending",
          items: sellerCarts.map((item) => ({
            title: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        };

        const response = await axios.post("http://localhost:5000/orders", orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.insertedId) {
          const ids = sellerCarts.map((cart) => cart._id);
          ids.forEach((id) => handleDelete(id));
        }
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your orders were successfully placed",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard/my-order");
    } catch (error) {
      console.error("Order submission error:", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {carts.length === 0 ? (
        <div className="font-sans my-[17%] max-w-4xl max-md:max-w-xl mx-auto p-4 text-center">
          <h1 className="text-2xl font-extrabold text-gray-800">Your Cart is Empty</h1>
          <p className="text-gray-600 mt-2">You haven’t added any items to your cart yet.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="md:col-span-2 space-y-4">
              {carts.map((cart) => (
                <div key={cart._id} className="flex gap-4 bg-white px-4 py-6 rounded-md shadow">
                  <div className="flex gap-4">
                    <div className="w-28 h-28 shrink-0">
                      <img
                        src={`http://localhost:5000${cart.productImage}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-base font-bold text-gray-800">{cart.name}</h3>
                      <div className="mt-auto flex items-center gap-3">
                        {/* Quantity buttons can be implemented here later if needed */}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end justify-between">
                    <button onClick={() => handleDelete(cart._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 cursor-pointer fill-gray-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Z" />
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                      </svg>
                    </button>
                    <h3 className="text-base font-bold text-gray-800">${cart.price}.00</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-md px-4 py-6 shadow h-max">
              <ul className="text-gray-800 space-y-4">
                <li className="flex justify-between text-sm">Subtotal <span className="font-bold">${total}.00</span></li>
                <hr className="border-gray-300" />
                <li className="flex justify-between text-sm font-bold">Total <span>${total}.00</span></li>
              </ul>

              <div className="mt-8 space-y-2">
                <button
                  onClick={handleBuy}
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold bg-gray-800 hover:bg-gray-900 text-white rounded-md"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => navigate("/shop")}
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-semibold bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
                >
                  Continue Shopping
                </button>
              </div>

              {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      &times;
                    </button>

                    <h2 className="text-2xl font-bold mb-4 text-center">Payment Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Name */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <FaUser className="ml-2 text-gray-500" />
                          <input
                            type="text"
                            className="w-full p-2 outline-none"
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <FaEnvelope className="ml-2 text-gray-500" />
                          <input
                            type="email"
                            className="w-full p-2 outline-none"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                      </div>

                      {/* Phone */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md outline-none"
                          placeholder="Enter your phone number"
                          {...register("phone", { required: "Phone number is required" })}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                      </div>

                      {/* Address */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Address</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <FaAddressCard className="ml-2 text-gray-500" />
                          <input
                            type="text"
                            className="w-full p-2 outline-none"
                            placeholder="Enter your address"
                            {...register("address", { required: "Address is required" })}
                          />
                        </div>
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                      </div>

                      {/* Zip */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Zip Code</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md outline-none"
                          placeholder="Enter your zip code"
                          {...register("zip", { required: "Zip code is required" })}
                        />
                        {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
                      </div>

                      {/* Card */}
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Card Number</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <FaCreditCard className="ml-2 text-gray-500" />
                          <input
                            type="text"
                            className="w-full p-2 outline-none"
                            placeholder="Card number"
                            {...register("card", { required: "Card number is required" })}
                          />
                        </div>
                        {errors.card && <p className="text-red-500 text-sm">{errors.card.message}</p>}
                      </div>

                      {/* Expiry and CVV */}
                      <div className="flex gap-2">
                        <div className="mb-4 w-full">
                          <label className="block text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md outline-none"
                            placeholder="MM/YY"
                            {...register("expiry", { required: "Expiry date is required" })}
                          />
                          {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
                        </div>
                        <div className="mb-4 w-full">
                          <label className="block text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md outline-none"
                            placeholder="CVV"
                            {...register("cvv", { required: "CVV is required" })}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                      >
                        Submit Payment
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-center gap-4">
                <img src="https://readymadeui.com/images/master.webp" alt="Mastercard" className="w-10" />
                <img src="https://readymadeui.com/images/visa.webp" alt="Visa" className="w-10" />
                <img src="https://readymadeui.com/images/american-express.webp" alt="Amex" className="w-10" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Carts;
