import ProductCard from "../../page/productCard"

const ProductSection = () => {
  return (
    <div>
        <h3 className="text-3xl text-center font-bold mt-10 lg:mt-20">Featured products</h3>
        <div className="mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 container md:grid-cols-2 my-10 ">
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>

        </div>
    </div>
  )
}

export default ProductSection
