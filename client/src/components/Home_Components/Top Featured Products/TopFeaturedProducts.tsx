"use client";

import { useCart } from "@/components/Header/HeaderTop/CardContext";
import { Star, ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react";
import React, { useState } from "react";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

type Product2 = {
  id: number;
  name: string;
  rating: number;
  reviews?: number;
  price: number;
  oldPrice?: string;
  discount?: string;
  image: string;
  hoverImage?: string;
  features?: string[];
};

const FeaturedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const handleAddToCart = (product: Product2) => {
    addToCart(product2);
  };
  const mainProducts = [
    {
      id: 1,
      name: "Apple iPad Air 4 10.9-inch Wi-Fi 256GB",
      rating: 4.5,
      reviews: 4,
      price: 49.0,
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_2_1.jpg?v=1697644616&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_2_2.jpg?v=1697644616&width=533",
      features: [
        "Bass and Stereo Sound.",
        "Display with 3088 x 1440 pixels resolution.",
        "Memory, Storage & SIM: 12GB RAM, 256GB.",
      ],
    },
    {
      id: 2,
      name: "MacBook Pro 16-inch",
      rating: 5,
      reviews: 6,
      price: 1299.0,
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_3_1.jpg?v=1697644630&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_3_2.jpg?v=1697644630&width=533",
      features: [
        "M1 Pro chip with 10‑core CPU",
        "16GB unified memory",
        "1TB SSD storage",
      ],
    },
    {
      id: 3,
      name: "iMac 24-inch",
      rating: 4.8,
      reviews: 5,
      price: 1499.0,
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_4_1.jpg?v=1697644644&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_4_2.jpg?v=1697644644&width=533",
      features: [
        "Apple M1 chip with 8‑core CPU",
        "4.5K Retina display",
        "512GB SSD storage",
      ],
    },
  ];

  const otherProducts = [
    {
      id: 4,
      name: "Apple iPhone 11 Pro 256GB Space Gray",
      rating: 5,
      price: "210.00",
      oldPrice: "220.00",
      discount: "-5%",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_5_1.jpg?v=1697644653&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_5_2.jpg?v=1697644653&width=533",
    },
    {
      id: 5,
      name: "Apple iPhone 13 Pro 128GB",
      rating: 5,
      price: "120.00",
      oldPrice: "150.00",
      discount: "-20%",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_7_1.jpg?v=1697644677&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_7_4.jpg?v=1697644677&width=533",
    },
    {
      id: 6,
      name: "Apple Watch Aluminum Case with Sport Loop",
      rating: 5,
      price: "49.00",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_30_1.jpg?v=1697644834&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_30_2.jpg?v=1697644834&width=533",
    },
    {
      id: 7,
      name: "Apple iPhone 13 Mini 128GB Pink - Unlocked",
      rating: 5,
      price: "150.00",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_34_1.jpg?v=1697644904&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_34_2.jpg?v=1697644904&width=533",
    },
    {
      id: 8,
      name: "Apple Watch Aluminum Case - Pride Edition",
      rating: 5,
      price: "100.00",
      oldPrice: "128.00",
      discount: "-22%",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_32_1.jpg?v=1697644893&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_32_2.jpg?v=1697644893&width=533",
    },
    {
      id: 8,
      name: "Apple Watch Magnetic Fast Charger to USB-A",
      rating: 5,
      price: "100.00",
      oldPrice: "128.00",
      discount: "-22%",
      image:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_22_1.jpg?v=1697644765&width=533",
      hoverImage:
        "https://demo-morata.myshopify.com/cdn/shop/products/products_22_2.jpg?v=1697644766&width=533",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === mainProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? mainProducts.length - 1 : prev - 1
    );
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-8 rubik ">
      <h2 className="text-2xl font-medium mb-6 relative inline-block">
        Top Featured Products
        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#16BCDC]"></div>
      </h2>

      <div className="flex  w-full gap-5 group/buttons ">
        <div className="w-[1300px] h-[280px] bg-white rounded-lg  px-6  relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full  opacity-0 group-hover/buttons:opacity-100 text-white bg-black bg-opacity-20 hover:bg-gray-100 transition-all duration-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
            <button
              onClick={nextSlide}
              className="p-2 rounded-full  opacity-0 group-hover/buttons:opacity-100  text-white bg-black bg-opacity-20 hover:bg-gray-100 transition-all duration-500"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {mainProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white flex  rounded-2xl sha  "
                >
                  <div className="relative group   ">
                    <img
                      src={product.image}
                      className=" w-[400px] h-64 object-cover mx-auto mb-4 pr-3 transition-all opacity-100 duration-700 ease-in-out group-hover:scale-105"
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        className="w-[265px]  h-64  object-cover mb-4 pr-3 transition-all absolute top-0 left-0 opacity-0 group-hover:opacity-100 duration-700 ease-in-out group-hover:scale-105"
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

                  <div className="mt-4 w-[550px]">
                    <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {renderRatingStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews} review
                        {product.reviews !== 1 ? "s" : ""})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-md font-bold text black-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {product.features.map((features, index) => (
                        <li key={index} className="text-gray-600 text-xs">
                          • {features}
                        </li>
                      ))}
                    </ul>

                    <button className="w-full bg-black text-white py-2 mt-5 rounded-3xl hover:bg-[#16BCDC] duration-300 transition-colors"
                     onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {mainProducts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex  flex-wrap gap-3">
          {otherProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl flex  p-4 relative group flex-1 min-w-[245px] h-[130px] max-w-[300px]"
            >
              {product.discount && (
                <span className="absolute top-2 left-2 bg-[#5AAB19] text-white px-2 text-sm  z-10">
                  {product.discount}
                </span>
              )}

              <div className="mb-4 w-[40%] ">
                <img
                  src={product.image}
                  alt={product.name}
                  className=" w-[100px] mt-1 object-cover mb-4 pr-3 transition-all opacity-100 duration-700 ease-in-out group-hover:scale-105"
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={`${product.name}`}
                    className="w-[100px] mt-1 object-cover mb-4 pr-3 transition-all absolute top-3 left-3 opacity-0 group-hover:opacity-100 duration-700 ease-in-out group-hover:scale-105"
                  />
                )}
              </div>

              <div className="w-[50%] flex flex-col    ">
                <h3 className="text-blue-600 text-xs font-bold mb-2 line-clamp-2  ">
                  {product.name}
                </h3>

                <div className=" w-[80px]">
                  {renderRatingStars(product.rating)}
                </div>

                <div className="flex items-center gap-2 text-[0.85rem]">
                  <span className="text-[#CC1414] font-medium">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 font-normal line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
