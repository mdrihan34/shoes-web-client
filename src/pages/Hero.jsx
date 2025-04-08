import { useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { shoes, statistics } from "../constants";
import Button from "../Componets/Button.jsx";
import ShoeCard from "../Componets/ShoeCard.jsx";
import { bigShoe1 } from "../assets/images";
import { arrowRight } from "../assets/icons";

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);
  gsap.registerPlugin(useGSAP)
  useGSAP(() => {
    // gsap code here...
    gsap.from('.box', { 
      x: 700,  
      delay: 0.2,

      rotate: 100
    
      // repeat: -1,
      // yoyo: true
    }); // <-- automatically reverted
    gsap.from('.box1', { 
      y: 1000,  
      delay: 0.2,
    
      rotate: 100
      // repeat: -1,
      // yoyo: true
    }); //
    // gsap.from('.box1', { 
    //   y: 1400,  
    //   delay: 0.2,
    //   rotate: 30
    //   // repeat: -1,
    //   // yoyo: true
    // }); //
},);
  return (
    <section
    id='home'
    className='w-full box1 flex xl:flex-row flex-col justify-center items-center  gap-10 px-6 sm:px-12 max-container'
  >
    <div className='relative xl:w-2/5 w-full flex flex-col justify-center items-start pt-28 space-y-8'>
      <p className='text-xl font-montserrat text-coral-red'>
        Exclusive Shoe Collection
      </p>
  
      <h1 className='font-palanquin text-6xl sm:text-7xl xl:text-8xl max-sm:text-[64px] max-sm:leading-[72px] font-bold'>
        <span className='bg-white  xl:whitespace-nowrap relative z-10 pr-4 sm:pr-8'>
          Step into Comfort
        </span>
        <br />
        <span className='text-coral-red inline-block mt-2 sm:mt-3'>Trendy</span> Footwear
      </h1>
  
      <p className='font-montserrat text-slate-gray text-base sm:text-lg leading-7 sm:leading-8 mt-4 sm:mt-6 max-w-md'>
        Find the perfect blend of comfort, quality, and design for every occasion.
      </p>
  
     
  
      <div className='flex flex-wrap justify-start items-start border-2 p-4 rounded-xl gap-10 mt-12'>
        {statistics.map((stat, index) => (
          <div key={index} className='text-center sm:text-left'>
            <p className='text-3xl sm:text-4xl font-palanquin font-bold'>{stat.value}</p>
            <p className='font-montserrat text-slate-gray text-sm sm:text-base leading-6'>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  
    <div className='relative flex-1 flex justify-center items-center box  xl:min-h-screen py-20 sm:py-32 bg-orange-400 bg-hero bg-cover bg-center'>
      <img
        src={bigShoeImg}
        alt='Shoe Collection'
        width={610}
        height={502}
        className='object-contain relative z-10'
      />
  
      <div className='flex gap-4 sm:gap-6 absolute -bottom-8 sm:bottom-10 px-4 sm:px-12'>
        {shoes.map((image, index) => (
          <div key={index} className='cursor-pointer'>
            <ShoeCard
              index={index}
              imgURL={image}
              changeBigShoeImage={setBigShoeImg}
              bigShoeImg={bigShoeImg}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default Hero;
