const FashionSneakers = () => {
    return (
      <section className="text-center p-6  text-black">
        <h2 className="text-3xl font-bold uppercase  mb-6">Timeless styles for everyday wear</h2>
        <p className="text-lg mb-12">High-performance footwear for sports and workouts</p>
        
    <div className="flex justify-center">
    <div className="grid grid-cols-1 max-w-7xl   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/premium-photo/man-wearing-black-blue-sneakers-sitting-wooden-surface_782515-19155.jpg?ga=GA1.1.461821295.1727706582&semt=ais_hybrid" // replace with actual image URL
              alt="Comfort Meets Fashion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
            <div className="text-white">
              <h3 className="text-xl font-bold">Comfort Meets Fashion</h3>
              <p className="mb-4">Discover shoes that look great</p>
              <a href="products" className="bg-red-500 text-white py-2 px-4 rounded-md">SHOP NOW</a>
            </div>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="relative rounded-lg overflow-hidden">
          <img
            src="https://img.freepik.com/premium-photo/lady-streets-trendy-urban-loock-white-sneakers_161568-404.jpg?ga=GA1.1.461821295.1727706582&semt=ais_hybrid" // replace with actual image URL
            alt="Elevate Your Look"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
            <div className="text-white">
              <h3 className="text-xl font-bold">Elevate Your Look</h3>
              <p className="mb-4">Find the perfect pair of shoes</p>
              <a href="products" className="bg-red-500 text-white py-2 px-4 rounded-md">SHOP NOW</a>
            </div>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="relative rounded-lg overflow-hidden">
          <img src="https://img.freepik.com/free-photo/canvas-sneakers-green-model-tying-shoelaces-apparel-ad_53876-101198.jpg?ga=GA1.1.461821295.1727706582&semt=ais_hybrid" // replace with actual image URL
            alt="Step Into Style"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
            <div className="text-white">
              <h3 className="text-xl font-bold">Step Into Style</h3>
              <p className="mb-4">The latest trends in footwear</p>
              <a href="products" className="bg-red-500 text-white py-2 px-4 rounded-md">SHOP NOW</a>
            </div>
          </div>
        </div>
        
        {/* Card 4 */}
       
  
      </div>
      
    </div>
 <div className="mt-5 space-y-2 lg:flex justify-center">
 <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://img.freepik.com/premium-photo/man-wearing-black-blue-sneakers-sitting-wooden-surface_782515-19155.jpg?ga=GA1.1.461821295.1727706582&semt=ais_hybrid" // replace with actual image URL
            alt="Sale and Clearance"
            className="w-[90%] rounded-xl  object-cover"
          />
          <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center text-center">
            <div className="text-white">
              <h3 className="text-xl font-bold">Sale and Clearance</h3>
              <p className="mb-4">Shop our latest deals and discounts</p>
              <a href="/products" className="bg-red-500 text-white py-2 px-4 rounded-md">SHOP NOW</a>
              </div>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://img.freepik.com/premium-photo/mens-comfortable-shoes-with-natural-material-mens-sneakers-style-casual-every-day-made_173815-128.jpg?ga=GA1.1.461821295.1727706582&semt=ais_hybrid" // replace with actual image URL
            alt="Sale and Clearance"
            className="w-[90%] rounded-xl  object-cover"
          />
          <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center text-center">
            <div className="text-white">
              <h3 className="text-xl font-bold uppercase">Shop by brand</h3>
              <p className="mb-4">Find your favorite brands and styles</p>
              <a href="/products" className="bg-red-500 text-white py-2 px-4 rounded-md">SHOP NOW</a>
              </div>
          </div>
        </div>
 </div>
    </section>
  );
};

export default FashionSneakers;