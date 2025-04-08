import axios from 'axios';
import  { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload, FiTag, FiDollarSign, FiFileText } from 'react-icons/fi';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AddProducts = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
    const {user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const [imagePreview, setImagePreview] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    };
    useEffect(() => {
      const fetchProfilePic = async () => {
       
  
        try {
          const response = await axios.get('https://shoes-web-server.vercel.app/getUserProfile', {
            headers: {
              'email': user.email
            }
          });
    
          setProfilePic(response.data.profilePicture);
        } catch (error) {
          console.error("Error fetching profile picture", error);
        }
      };
  
      fetchProfilePic();
    }, [user]);
    useEffect(() => {
      const fetchCurrentUser = async () => {
        if (!user?.email) {
          console.error("No logged-in user found");
          return;
        }
  
        try {
          const response = await axiosPublic.get('/current-user', {
            params: { email: user.email },
          });
          setCurrentUser(response.data); 
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };
  
      if (user?.email) {
        fetchCurrentUser(); 
      }
    }, [user, axiosPublic]);
  
    if (!setCurrentUser) {
      return <p>Loading...</p>; 
    }
 
   const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("Name", data.productName);
    formData.append("Price", data.productPrice);
    formData.append("description", data.productDescription);
    formData.append("productImage", data.productImage[0]); 
    formData.append("userName", currentUser.name);
    formData.append("userEmail", currentUser.email);
    formData.append("userProfile", currentUser.profilePicture);
  
    try {
      const response = await axios.post(
        "https://shoes-web-server.vercel.app/products-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Something went wrong");
      alert("Failed to upload product. Please try again.");
    }
  };
  
  return (
    <div className=''>
    <div className="mt-8 max-w-3xl mx-auto ">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Add New Product</h2>
      <div className="bg-white mt-4 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center space-x-3">
            <FiTag className="text-gray-500 text-xl" />
            <div className="w-full">
              <label htmlFor="productName" className="block text-gray-700 font-medium">Product Name</label>
              <input
                type="text"
                id="productName"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.productName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter product name"
                {...register('productName', { required: 'Product name is required' })}
              />
              {errors.productName && <span className="text-red-500 text-sm">{errors.productName.message}</span>}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FiDollarSign className="text-gray-500 text-xl" />
            <div className="w-full">
              <label htmlFor="productPrice" className="block text-gray-700 font-medium">Price</label>
              <input
                type="number"
                id="productPrice"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.productPrice ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter product price"
                {...register('productPrice', { required: 'Price is required', min: 1 })}
              />
              {errors.productPrice && <span className="text-red-500 text-sm">{errors.productPrice.message}</span>}
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FiFileText className="text-gray-500 text-xl mt-2" />
            <div className="w-full">
              <label htmlFor="productDescription" className="block text-gray-700 font-medium">Description</label>
              <textarea
                id="productDescription"
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.productDescription ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter product description"
                {...register('productDescription', { required: 'Description is required' })}
              ></textarea>
              {errors.productDescription && <span className="text-red-500 text-sm">{errors.productDescription.message}</span>}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FiUpload className="text-gray-500 text-xl" />
            <div className="w-full">
              <label htmlFor="productImage" className="block text-gray-700 font-medium">Product Image</label>
              <input
                type="file"
                id="productImage"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('productImage')}
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
          >
            <FiUpload />
            <span>Add Product</span>
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddProducts
