
import { useRef, useEffect } from "react";

const AboutSection = () => {
  const headingRef = useRef(null);
  const paragraphRefs = useRef([]);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

 
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
      
        {/* Image Section */}
        <div
          className="md:w-1/2 mb-8 md:mb-0 flex justify-center"
          ref={imageRef}
        >
          <img
            src="https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="About Us"
            className="rounded-lg shadow-2xl max-w-full"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left px-4">
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6"
          >
            Welcome to <span className="text-orange-500">ShoeStyle</span>
          </h1>
          <p
            ref={(el) => (paragraphRefs.current[0] = el)}
            className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed"
          >
            At <strong>ShoeStyle</strong>, we believe that footwear is more than just a necessity; it’s an expression of your style and comfort. 
            Our collection is designed to cater to every occasion – from casual sneakers to formal shoes that elevate your look.
          </p>
          <p
            ref={(el) => (paragraphRefs.current[1] = el)}
            className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed"
          >
            Our shoes are crafted with the utmost attention to detail, ensuring a perfect balance of style, comfort, and durability. Whether you’re
            running errands, attending a party, or heading to the office, we’ve got something for every step you take.
          </p>
          <p
            ref={(el) => (paragraphRefs.current[2] = el)}
            className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed"
          >
            As a trusted platform for footwear enthusiasts, <strong>ShoeStyle</strong> brings together the best brands and latest trends. Our mission 
            is to provide you with an unparalleled shopping experience, making sure your feet are always in style.
          </p>
          <p
            ref={(el) => (paragraphRefs.current[3] = el)}
            className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed"
          >
            Step into a world of comfort and fashion with our expertly curated collection. We’re here to help you find the perfect pair of shoes 
            that fit your style and lifestyle.
          </p>
          <button
            ref={buttonRef}
            className="bg-orange-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-orange-600 hover:scale-105 transition-all duration-300"
          >
            Explore Our Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
