"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const LogoSlider = () => {
  const logos = [
    { name: "AMD", image: "https://demo-morata.myshopify.com/cdn/shop/files/brand2.jpg?v=1700020214&width=3840" },
    { name: "Facebook", image: "https://demo-morata.myshopify.com/cdn/shop/files/brand3.jpg?v=1700020214&width=3840" },
    { name: "Verizon", image: "https://demo-morata.myshopify.com/cdn/shop/files/brand5.jpg?v=1700020214&width=3840" },
    { name: "Nestle", image: "https://demo-morata.myshopify.com/cdn/shop/files/brand6.jpg?v=1700020214&width=3840" },
    { name: "Logitech", image: "https://demo-morata.myshopify.com/cdn/shop/files/brand1.png?v=1700020214&width=3840" },
    { name: "AMD", image: "https://demo-morata.myshopify.com/cdn/shop/files/brand2.jpg?v=1700020214&width=3840" },
    { name: "Logitech", image: "https://demo-morata.myshopify.com/cdn/shop/files/brand1.png?v=1700020214&width=3840" }
  ];

  return (
    <div className="bg-[#F1F5F6] py-12">
      <div className="container mx-auto px-4 bg-white">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="bg-white">
              <div className="h-28 rounded-lg w-[270px] flex items-center justify-center px-3">
                <img
                  src={logo.image}
                  alt={`${logo.name} logo`}
                  className="max-h-32 w-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LogoSlider;