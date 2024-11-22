import React from 'react';
import Image from 'next/image';
import { Minus } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Apple Airpods Pro MWP22A M/A Bluetooth 7.1',
      price: 428.00,
      originalPrice: 528.00,
      discount: 19,
      rating: 5,
      image: 'https://demo-morata.myshopify.com/cdn/shop/products/products_23_1.jpg?v=1697644775&width=533',
      hoverImage: 'https://demo-morata.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1697644775&width=533'
    },
    {
      id: 2,
      name: 'Apple Bluetooth AirPods Max MGYH3 wdaddadawd',
      price: 100.00,
      originalPrice: 120.00,
      discount: 17,
      rating: 5,
      image: 'https://demo-morata.myshopify.com/cdn/shop/products/products_29_1.jpg?v=1697644821&width=533',
      hoverImage: 'https://demo-morata.myshopify.com/cdn/shop/products/products_29_2.jpg?v=1697644821&width=533'
    },
    {
      id: 3,
      name: 'Apple iPad Air 4 10.9-inch Wi-Fi dwadawd dawdawd',
      price: 49.00,
      originalPrice: null,
      discount: null,
      rating: 5,
      image: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_1.jpg?v=1697644630&width=533',
      hoverImage: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_2.jpg?v=1697644630&width=533'
    },
    {
      id: 4,
      name: 'Apple iPad Mini 6 Wi-Fi Cellular dwadawd dwadawdawd ',
      price: 56.00,
      originalPrice: null,
      discount: null,
      rating: 5,
      image: 'https://demo-morata.myshopify.com/cdn/shop/products/products_4_1.jpg?v=1697644644&width=533',
      hoverImage: 'https://demo-morata.myshopify.com/cdn/shop/products/products_4_2.jpg?v=1697644644&width=533'
    }
  ];

  return (
    <div className=" max-w-md mt-10 p-6 bg-white ">
     <div className='flex'>
     <Minus size={24} className="text-blue-500" />
     <h2 className="text-sm font-bold mb-4">FEATURED PRODUCT</h2>
     </div>
      
      <div className=" w-full ">
        {products.map((product) => (
          <div key={product.id} className="group relative flex gap-3 bg-white py-4    transition-shadow duration-300">
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-2 left-2 z-10 bg-[#5AAB19] text-white px-3 py-1 rounded-sm text-sm">
                -{product.discount}%
              </div>
            )}
            
            {/* Product Images with Hover Effect */}
            <div className="  ">
                <img
                  src={product.image}
                  alt={product.name}
                  className=" w-[90px] h-[70px] mt-1 object-cover mb-4  transition-all opacity-100 duration-700 ease-in-out group-hover:scale-105"
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={`${product.name}`}
                    className="w-[90px] h-[70px] mt-1 object-cover mb-4  transition-all absolute top-4 left-0 opacity-0 group-hover:opacity-100 duration-700 ease-in-out group-hover:scale-105"
                  />
                )}
              </div>

            {/* Product Details */}
            <div className='w-[60%]'>
              <h3 className="text-blue-500 hover:text-blue-700 line-clamp-2 leading-tight font-medium  transition-colors duration-200">
                {product.name}
              </h3>
              
              {/* Rating Stars */}
              <div className="flex ">
                {[...Array(product.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;