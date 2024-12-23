import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,

} from "@material-tailwind/react";
import { motion } from "motion/react"
import { IoEyeOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {
  const viewProduct = ()=>{
    console.log('hellow world')
  }
  return (
  <motion.div animate={{ x: 100 }} transition={{ type: "spring" }}>
  <Card className="w-96">
    <CardHeader shadow={false} floated={false} className="h-72">
      <img
        src={`http://localhost:5000${product.productImage}`}
        alt="card-image"
        className="h-[70%] w-full "
      />
    </CardHeader>
    <CardBody>
      <div className="mb-2 flex gap-2 justify-between">
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
      <Button
      
        className="bg-blue-gray-900/10 border-2 border-green-400 text-black  items-center gap-1 text-sm flex  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
      >
        <MdAddShoppingCart />
        Add to Cart
      </Button>
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
