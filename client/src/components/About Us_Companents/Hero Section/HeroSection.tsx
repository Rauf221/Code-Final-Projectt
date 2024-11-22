import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="py-2 flex items-center justify-between border-b bg-[#F2F2F6]">
        <div className="flex items-center space-x-8">
          <div className="flex  text-gray-600">
            <Link href="/home" className="px-3 py-2 hover:text-[#16BCDC]">
              Home
            </Link>
            <span className="px-1 py-2">/</span>
            <Link href="/aboutus" className="px-3 py-2 hover:text-[#16BCDC]">
              About Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center rubik">
        <p className="text-[#16BCDC] font-medium mb-1">
          WELCOME TO UMINEX
        </p>
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
          OUR PERFECT STORE
        </h1>
        <p className="text-md text-gray-600 leading-relaxed">
          Over 20 years of experience, we have crafted thousands of strategic discovery process that 
          enables us to peel back the layers which enable us to understand, connect.
        </p>
      </div>
      <div className="w-[99%] h-[500px] mx-auto rounded-lg overflow-hidden">
          <img
            src="https://demo-morata.myshopify.com/cdn/shop/files/img_about.jpg?v=1700017734&width=2000" 
            alt="Two professional women collaborating"
            className="object-cover hover:scale-105  rounded-lg transition-transform duration-500"
          />
          {/* Overlay */}
          
        </div>
    </div>
  );
};

export default HeroSection;