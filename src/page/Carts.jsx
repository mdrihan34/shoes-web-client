import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { FaCreditCard, FaUser, FaAddressCard, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { div } from "motion/react-client";
import Swal from "sweetalert2";


const Carts = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // const axiosPublic = useAxiosPublic()
    const {user} = useContext(AuthContext)
    const [carts , setCarts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        if (!user || !user.email) {
            console.error("User not found or email is missing.");
            // setLoading(false);
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
            } finally {
            //   setLoading(false);
            }
          };
      
          fetchUserProducts();
      
    })
  
    const total = carts.reduce((accumulator, cart) => {
        const price = Number(cart.price);
        return accumulator + price;
      }, 0); 
    //   const ids = carts.reduce((accumulator, cart) => {
    //     accumulator.push(cart._id);
    //     return accumulator;
    //   }, []);
    
     
    
     
      const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/carts/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            // Update the local state to remove the deleted item
            setCarts(carts.filter((cart) => cart._id !== id));
            console.log("Product deleted successfully");
          
          } else {
            console.error("Failed to delete product");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };
    
      const handleBuy = () => {
    
        setIsPopupOpen(true);
      };
    //   const handleClose = () =>{
    //     setIsPopupOpen(false)
    //   }
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        const BuyerEmail = user.email;
    
        const orderData = {
            BuyerEmail: BuyerEmail,
            name: data.name,
            address: data.address,
            OrderEmail: data.email,
            sellerEmail: carts[0]?.sellerEmail,
            OrderName: data.name,
            phone: data.phone,
            zip: data.zip,
            totalPrice: total,
            Status: 'padding'
        };
    
        try {
            // Make the POST request
            const response = await axios.post(
                "http://localhost:5000/orders", // Corrected endpoint name to match the server-side changes
                orderData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            // Show success message
            // alert(response.data.message);
           console.log(response)
           if (response.data.insertedId) {
          
            
            // Collect IDs and delete each cart item
            const ids = carts.map(cart => cart._id);
            ids.forEach(id => {
                handleDelete(id);
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your order successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/my-order')
        }
        } catch (error) {
            console.error(
                "Error:",
                error.response?.data?.message || "Something went wrong"
            );
           
        }
    
       
    };
    
    
  return (
<>
{
  carts.length === 0 ?  
  <div className="font-sans  my-[17%] max-w-4xl max-md:max-w-xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-extrabold text-gray-800">Your Cart is Empty</h1>
        <p className="text-gray-600 mt-2">You haven’t added any items to your cart yet.</p>
        <button
          onClick={() => navigate('/shop')} // Redirect to shop or product listing
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Start Shopping
        </button>
      </div>
: 



<div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
<h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
<div className="grid md:grid-cols-3 gap-4 mt-8">
    <div className="md:col-span-2 space-y-4">

        {
        carts.map( cart =>(
            <div key={cart._id} className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
            <div className="flex gap-4">
                <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                    <img src={`http://localhost:5000${cart.productImage}`} className="w-full h-full object-contain" />
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-base font-bold text-gray-800">{cart.name}</h3>
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                        <button type="button"
                            className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 124 124">
                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                            </svg>
                        </button>
                        {/* <span className="font-bold text-sm leading-[18px]">2</span> */}
                        <button type="button" 
                            className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 42 42">
                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="ml-auto flex flex-col">
                <div className="flex items-start gap-4 justify-end">
                   

                  <button onClick={() => handleDelete(cart._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 cursor-pointer fill-gray-400 inline-block" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                    </svg>
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-800 mt-auto">${cart.price}.00</h3>
            </div>
        </div>
        ))
        }

       

      
    </div>

    <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
        <ul className="text-gray-800 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">${total}.00</span></li>

            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">${total}.00</span></li>
        </ul>

        <div className="mt-8 space-y-2">
            <button onClick={handleBuy} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">Buy Now</button>
            <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
        </div>
        {isPopupOpen && (
<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
<div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg relative">
  {/* Close Button */}
  <button
    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    onClick={() => setIsPopupOpen(false)}
  >
    &times;
  </button>
  
  <h2 className="text-2xl font-bold mb-4 text-center">Payment Details</h2>
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* Buyer Name */}
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

    {/* Buyer Email */}
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

    {/* Phone Number */}
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

    {/* Zip Code */}
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

    {/* Card Details */}
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

    {/* Expiry Date */}
<div className="flex gap-2">
<div className="mb-4">
      <label className="block text-gray-700 mb-2">Expiry Date</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md outline-none"
        placeholder="MM/YY"
        {...register("expiry", { required: "Expiry date is required" })}
      />
      {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
    </div>

    {/* CVV */}
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">CVV</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md outline-none"
        placeholder="CVV"
        {...register("cvv", { required: "CVV is required" })}
      />
      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
    </div></div> 

    {/* Submit Button */}
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

        <div className="mt-4 flex flex-wrap justify-center gap-4">
            <img src='https://readymadeui.com/images/master.webp' alt="card1" className="w-10 object-contain" />
            <img src='https://readymadeui.com/images/visa.webp' alt="card2" className="w-10 object-contain" />
            <img src='https://readymadeui.com/images/american-express.webp' alt="card3" className="w-10 object-contain" />
        </div>
    </div>
</div>
</div>


}</>
  )
}

export default Carts
