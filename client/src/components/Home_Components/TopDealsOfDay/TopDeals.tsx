"use client";

import React, { useState, useEffect } from 'react';
import { Eye, Heart, Star } from 'lucide-react';
import { HiOutlineSquare3Stack3D } from 'react-icons/hi2';

interface Product {
  id: string;
  title: string;
  image: string;
  hoverImage?: string;  
  discountPercentage: number;
  currentPrice: number;
  originalPrice: number;
  reviews: number;
  rating: number;
  specs: string[];
  soldCount: number;
  totalStock: number;
}

const TopDealsOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 1,
    minutes: 55,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 };
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        
        const newDays = prev.days - 1;
        if (newDays >= 0) return { ...prev, days: newDays, hours: 23, minutes: 59, seconds: 59 };
        
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products: Product[] = [
    {
      id: '1',
      title: 'Apple iPhone 11 Pro 256GB Space Gray – Unlocked',
      image: 'https://demo-morata.myshopify.com/cdn/shop/products/products_5_1.jpg?v=1697644653&width=533',
      hoverImage : 'https://demo-morata.myshopify.com/cdn/shop/products/products_5_2.jpg?v=1697644653&width=533',
      discountPercentage: 5,
      currentPrice: 210.00,
      originalPrice: 220.00,
      reviews: 2,
      rating: 5,
      specs: [
        'Screen Size 10.9 inch',
        'Operating System iOS 14.0',
        'Product Length 9.74 inch'
      ],
      soldCount: 85,
      totalStock: 100
    },
    {
      id: '2',
      title: 'Apple iPhone 13 Pro Max 128GB – Unlocked ( with 3D, Video )',
      image: 'https://demo-morata.myshopify.com/cdn/shop/products/products_7_1.jpg?v=1697644677&width=533',
      hoverImage: 'https://demo-morata.myshopify.com/cdn/shop/products/products_7_4.jpg?v=1697644677&width=533',
      discountPercentage: 20,
      currentPrice: 120.00,
      originalPrice: 150.00,
      reviews: 1,
      rating: 5,
      specs: [
        'Bass and Stereo Sound.',
        'Display with 3088 x 1440 pixels resolution.',
        'Memory, Storage & SIM: 12GB RAM, 256GB.'
      ],
      soldCount: 50,
      totalStock: 100
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(null).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleQuickView = (productId: string) => {
    console.log(`Quick view for product ID: ${productId}`);
    // Add your quick view logic here
  };

  return (
    <div className="container mx-auto px-4 py-8 font-rubik ">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Top Deals Of The Day</h2>
          <div className="w-24 h-1 bg-blue-600 mt-2"></div>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-gray-700 font-medium">Hurry up! Offer ends in:</span>
          <div className="flex gap-1">
            <div className="bg-red-600 text-white px-2 py-1 rounded">
              <span className="font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-xs ml-1">DAYS</span>
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded">
              <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs ml-1">HRS</span>
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded">
              <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs ml-1">MINS</span>
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded">
              <span className="font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs ml-1">SECS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm  ">
            <div className="relative flex">
              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm px-2 py-1 rounded">
                  -{product.discountPercentage}%
                </div>
              )}
              <div className="relative group  ">
                    <img
                      src={product.image}
                      alt={product.title}
                      className=" w-[380px] h-80 object-cover mx-auto mb-4 pr-3 transition-all opacity-100 duration-700 ease-in-out group-hover:scale-105"
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        alt={`${product.title} hover`}
                        className="w-[380px] h-80 object-cover mb-4 pr-3 transition-all absolute top-0 left-0 opacity-0 group-hover:opacity-100 duration-700 ease-in-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex flex-col opacity-0 group-hover:opacity-100 duration-500 transition-opacity">
                      <button className="p-2 bg-white text-gray-600 rounded-full text-xs hover:text-white hover:bg-blue-500">
                        <Heart size={15} />
                      </button>
                      <button
                        className="p-2 bg-white text-gray-600 rounded-full text-xs hover:text-white hover:bg-blue-500"
                        onClick={() => handleQuickView(product.id)}
                      >
                        <Eye size={15} />
                      </button>
                      <button className="p-2 bg-white rounded-full text-xs text-gray-600 hover:text-white hover:bg-blue-500">
                        <HiOutlineSquare3Stack3D size={15} />
                      </button>
                    </div>
                  </div>
            
            <div className="mt-4 w-full">
              <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-500">
                  ({product.reviews} review{product.reviews !== 1 ? 's' : ''})
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-md font-bold text-red-600">
                  ${product.currentPrice.toFixed(2)}
                </span>
                {product.originalPrice > product.currentPrice && (
                  <span className="text-gray-500 text-sm line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <ul className="mt-4 space-y-2">
                {product.specs.map((spec, index) => (
                  <li key={index} className="text-gray-600 text-sm">
                    • {spec}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${(product.soldCount / product.totalStock) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Sold: {product.soldCount}/{product.totalStock} products
                </div>
              </div>

              <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default TopDealsOfTheDay;