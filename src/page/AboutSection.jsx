import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AboutSection = () => {
  const headingRef = useRef(null);
  const paragraphRefs = useRef([]);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.from(imageRef.current, { x: -100, opacity: 0 })
      .from(headingRef.current, { y: 50, opacity: 0 }, "-=0.5")
      .from(paragraphRefs.current, { y: 50, opacity: 0, stagger: 0.3 }, "-=0.3")
      .from(buttonRef.current, { scale: 0, opacity: 0 }, "-=0.3");
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen bg-gray-100 flex items-center justify-center px-6"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div
          className="md:w-1/2 mb-8 md:mb-0 flex justify-center"
          ref={imageRef}
        >
          <img
            src="https://via.placeholder.com/600x500" // Replace with your image
            alt="About Us"
            className="rounded-lg shadow-2xl max-w-full"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1
            ref={headingRef}
            className="text-5xl font-extrabold text-gray-800 mb-6"
          >
            Welcome to <span className="text-orange-500">ShoeStyle</span>
          </h1>
          <p
            ref={(el) => (paragraphRefs.current[0] = el)}
            className="text-lg text-gray-600 mb-6 leading-relaxed"
          >
            Discover the finest collection of shoes tailored just for you. At{" "}
            <strong>ShoeStyle</strong>, we combine quality and elegance to offer
            you a seamless shopping experience. From trendy sneakers to classic
            formals, we’ve got it all!
          </p>
          <p
            ref={(el) => (paragraphRefs.current[1] = el)}
            className="text-lg text-gray-600 mb-6 leading-relaxed"
          >
            We ensure a secure platform where buyers and sellers connect for
            their footwear needs. Shop now and step into a world of comfort and
            style!
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
