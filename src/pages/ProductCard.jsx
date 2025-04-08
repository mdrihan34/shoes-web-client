import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,

} from "@material-tailwind/react";
import axios from "axios";
import { motion } from "motion/react"
import { useContext, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import useAxiosPublic from "../hooks/useAxiosPublic";
const ProductCard = ({product}) => {
  const axiosPublic = useAxiosPublic()
  const [current , setCurrentUser] = useState({})
   const {user} = useContext(AuthContext)
   const notify = (message) => toast(message);
   const handleAddToCart = async () => {
    if (!user) {
      notify("Please logIn to add items to the cart.");
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
      await axios.post("https://shoes-web-server.vercel.app/addToCart", cartData, {
        headers: { "Content-Type": "application/json" },
      });
      notify("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      notify("Failed to add item to cart. Please try again.");
    }
  };

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
  return (
  <motion.div>
      <ToastContainer />
  <Card className="lg:96 ">
    <CardHeader shadow={false} floated={false} className="h-72">
      <img
        src={`https://shoes-web-server.vercel.app/${product.productImage}`}
        alt="card-image"
        className="h-[70%] w-full "
      />
    </CardHeader>
    <CardBody>
      <div className="mb-2  flex gap-2 justify-between">
        <Typography color="blue-gray" className="font-medium">
         {product.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium">
        ${product.price}
        </Typography>
      </div>
      <Typography
        variant="small"
        color="gray"
        className="font-normal  opacity-75"
        
      >
     {product.description.length > 80 
    ? product.description.substring(0, 80) + "....." 
    : product.description}
      </Typography>
    </CardBody>
    <CardFooter className="pt-0 flex justify-between w-full">
    { 
  current?.role === 'Buyer' && (
    <Button 
      onClick={handleAddToCart}
      className="bg-blue-gray-900/10 border-2 border-green-400 text-black items-center gap-1 text-sm flex shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
    >
      <MdAddShoppingCart />
      Add to Cart
    </Button>
  )
}
      <Link to={`/view-product/${product._id}`}>
      <Button 
      
        className="bg-blue-gray-900/10 border-2 text-blue-500  border-blue-600 items-center gap-1 text-sm flex  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
      >
       <IoEyeOutline />
    view
      </Button></Link>
    </CardFooter>
  
  </Card>
  </motion.div>
  )
}

export default ProductCard
