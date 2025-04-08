import { Button } from "@material-tailwind/react"
// import ProductCard from '../../../src/page/ProductCard'
import ProductCard from "../../pages/ProductCard"
import { HiArrowNarrowRight } from "react-icons/hi"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const ProductSection = () => {
const [products, setProduct] = useState([])
useEffect(()=>{
  fetch('https://shoes-web-server.vercel.app/featured-products')
  .then((res) => res.json())
  .then((data) => setProduct(data));
},[])

  return (
    <div className=" lg:my-20">
        <h3 className="text-3xl text-center font-bold mt-10 lg:mt-20 uppercase">Featured products</h3>
       
        <div  className="mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 container md:grid-cols-2 my-10 ">
        
        {
          products.map(product => (<ProductCard  key={product._id} product={product}></ProductCard>))
        }
       
           

        </div>
<Link to='/products'>
<Button className="flex bg-white uppercase text-black shadow-xl border-t-2 border-cyan-400 mx-auto items-center gap-3">
View more products
        <HiArrowNarrowRight />
      </Button>
</Link>       
       
    </div>
  )
}

export default ProductSection
