import { Button } from "@material-tailwind/react"
import ProductCard from "../../page/productCard"
import { HiArrowNarrowRight } from "react-icons/hi"
import { useEffect, useState } from "react"


const ProductSection = () => {
const [products, setProduct] = useState([])
useEffect(()=>{
  fetch('http://localhost:5000/featured-products')
  .then((res) => res.json())
  .then((data) => setProduct(data));
},[])
console.log(products)
  return (
    <div className="lg:my-20">
        <h3 className="text-3xl text-center font-bold mt-10 lg:mt-20">Featured products</h3>
       
        <div  className="mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 container md:grid-cols-2 my-10 ">
        
        {
          products.map(product => (<ProductCard  key={product._id} product={product}></ProductCard>))
        }
       
           

        </div>
        <Button className="flex uppercase text-black shadow-xl border-t-2 border-cyan-400 mx-auto items-center gap-3">
       
        View more products
        <HiArrowNarrowRight />
      </Button>
    </div>
  )
}

export default ProductSection
