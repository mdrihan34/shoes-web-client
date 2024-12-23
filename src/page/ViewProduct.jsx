import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useAxiosPublic from "../hooks/useAxiosPublic"


const ViewProduct = () => {
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const axiosPublic = useAxiosPublic()
    useEffect(()=>{
      axiosPublic.get(`/products/${id}`)
      .then(data => setProduct(data.data))
    })
 
  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 p-10 text-black ">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="lg:h-[460px] rounded-lg   ">
                    <img className="w-full h-[70%] p-5 " src={`http://localhost:5000${product.productImage}`} alt="Product Image"/>
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-200  text-black dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-black  mb-2">{product.name}</h2>
                <div className="flex my-2 items-center gap-2">
                <div className="avatar">
  <div className="w-14 rounded-full">
    <img src={`http://localhost:5000${product.userProfilePicture}`} />
  </div>
                </div>
                    <h3 className="font-bold text-lg">Seller Name:<span className="uppercase text-orange-400">{product.userName}</span></h3>
                 
                </div>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 ">Price:</span>
                        <span className="text-gray-600 ">${product.price}</span>
                    </div>
                    
                </div>
              
            
                <div>
                    <span className="font-bold text-gray-700 ">Product Description:</span>
                    <p className="text-gray-600  text-sm mt-2">
                        {product.description}
                    </p>
                </div>
                <div className=" p-6  text-center">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">We Accept</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
        {/* Visa */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            className="w-10 h-8"
          />
        </div>
        {/* MasterCard */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="MasterCard"
            className="w-10 h-10"
          />
        </div>
        {/* PayPal */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            className="w-10 h-8"
          />
        </div>
        {/* American Express */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <img
            src="https://www.svgrepo.com/show/266068/american-express.svg"
            alt="American Express"
            className="w-10 h-10"
          />
        </div>
      </div>
    </div>
            </div>
            
        </div>
    </div>
</div>

    </div>
  )
}

export default ViewProduct
