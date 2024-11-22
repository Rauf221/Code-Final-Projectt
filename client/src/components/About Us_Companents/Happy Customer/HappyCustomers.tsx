"use client"

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, UserCircle, Quote } from "lucide-react";
import { IoStar } from "react-icons/io5";

const CustomSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<HTMLDivElement>(null);

  const customers = [
    {
      image: "https://demo-morata.myshopify.com/cdn/shop/files/img_our_team.png?v=1700020665&width=3840",
      name: "ALEXANDER BALL",
      position: "Founder/CEO At Uminex Store",
      quote: "The experience with Uminex has been nothing short of amazing. So much better than other themes I've used – wish I had seen this one first and saved my wasted time and money on other themes. I'd recommend this theme in a heartbeat!",
    },
    {
      image: "https://demo-morata.myshopify.com/cdn/shop/files/img_our_team_2.png?v=1700020666&width=3840",
      name: "JANE DOE", 
      position: "Marketing Manager at ABC Corp",
      quote: "This is by far the best product I've used for my business. The customization options are endless and the support team is top-notch. Highly recommend!",
    },
    {
      image: "https://demo-morata.myshopify.com/cdn/shop/files/img_our_team_3.png?v=1700020666&width=3840",
      name: "JOHN SMITH",
      position: "CEO at XYZ Inc", 
      quote: "Uminex has streamlined our operations and helped us save time and money. The user interface is intuitive and the features are exactly what we needed. Truly impressed!",
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === customers.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? customers.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-100 py-20 rubik">
      <div className="container mx-auto px-4 max-w-xl relative group">
      <div className="text-center mb-8 px-6">
        <h2 className="text-md font-medium mb-2 text-[#16BCDC] uppercase">
        Explore The Lookbook
        </h2>
        <h1 className="text-3xl font-medium uppercase text-gray-900">
        Happy Customers Say!
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas.
        </p>
      </div>

        <div 
          ref={swiperRef}
          className="overflow-hidden relative "
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${customers.length * 33}%`
            }}
          >
            {customers.map((customer, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 flex flex-col items-center "
              >
                <div className="rounded-full w-24 h-24 overflow-hidden mb-6">
                  {customer.image ? (
                    <img 
                      src={customer.image} 
                      alt={customer.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <UserCircle size={96} className="text-gray-400" />
                  )}
                </div>
               
                <div className="max-w-xl text-center relative px-4">
                 
                  <p className="text-gray-600 mb-4 text-lg">
                    "{customer.quote}"
                  </p>
                  
                  
                  <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="flex mb-4 text-yellow-400">
                   <IoStar />
                   <IoStar />
                   <IoStar />
                   <IoStar />
                   <IoStar />
                   </div>
                    <p className="font-semibold text-sm text-[#16BCDC]">
                      {customer.name}
                    </p>
                    
                    <p className="text-gray-600 text-sm">
                      {customer.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 px-[300px] left-0 right-0 flex justify-between transform -translate-y-1/2">
          <button 
            onClick={prevSlide}
            className="bg-black opacity-30  hover:bg-[#16BCDC] rounded-full p-3 shadow-md transition-all duration-500"
          >
            <ChevronLeft className="text-gray-800" />
          </button>
          <button 
            onClick={nextSlide}
            className="bg-black opacity-30  hover:bg-[#16BCDC] rounded-full p-3 shadow-md transition-all duration-500"
          >
            <ChevronRight className="text-gray-800" />
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default CustomSwiper;