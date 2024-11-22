import React from 'react';
import { Eye, Heart, Star } from 'lucide-react';
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

interface Product {
  discount: number;
  image: string;
  name: string;
  rating: number;
  reviewCount   : number;
  price: number;
  originalPrice?: number;
  hoverImage?: string;
  specs?: string[];
  description?: string;
  inStock: boolean;
  actionButtonText?: string;
}

const ProductListView: React.FC<{ product: Product }> = ({ product }) => {
interface RenderStarsProps {
    rating: number;
}

const renderStars = (rating: number) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`${
                        i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                    size={16}
                />
            ))}
        </div>
    );
};

  return (
    <div className="w-full max-w-full mx-auto  bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex gap-6">
        {/* Left side - Product Image */}
        <div className="relative  group ">
        <div className="bg-white py-3 px-3  relative flex">
          {(product.discount ?? 0) > 0 && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
              -{product.discount}%
            </span>
          )}

                  <div className="relative group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover mb-4 pr-3 transition-all opacity-100 duration-700 ease-in-out group-hover:scale-105"
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        alt={`${product.name} hover`}
                        className="w-full h-72 object-cover mb-4 pr-3 transition-all absolute top-0 left-0 opacity-0 group-hover:opacity-100 duration-700 ease-in-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex flex-col opacity-0 group-hover:opacity-100 duration-500 transition-opacity">
                      <button className="p-2 bg-white text-gray-600 rounded-full text-xs hover:text-white hover:bg-blue-500">
                        <Heart size={15} />
                      </button>
                      <button
                        className="p-2 bg-white text-gray-600 rounded-full text-xs hover:text-white hover:bg-blue-500"
                       
                      >
                        <Eye size={15} />
                      </button>
                      <button className="p-2 bg-white rounded-full text-xs text-gray-600 hover:text-white hover:bg-blue-500">
                        <HiOutlineSquare3Stack3D size={15} />
                      </button>
                    </div>
                  </div>


        {/* Right side - Product Info */}
        <div className="flex-1 flex flex-col justify-between rubik">
          <div>
            <h2 className="text-2xl font-medium text-blue-600 hover:text-red-600 transition-colors mb-3">
              {product.name}
            </h2>
            
            <div className="flex items-center gap-2 mb-4">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-500 font-bold text-2xl">
                ${product.price?.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-lg">
                  ${product.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
            <div>
                {product.description ? (<p className="text-gray-500">{product.description}</p>
             
                ) : (
                    <ul className='text-sm font-medium text-[#777777]'>
                    <li>
                    Screen Size 10.9 inch
                    </li>
                    <li>
                    Operating System iOS 14.0
                    </li>
                    <li>
                    Product Length 9.74 inch
                    </li>
                   </ul>
                )}

            </div>
            <div className="space-y-2 mb-4">
              {product.specs?.map((spec, index) => (
                <div key={index} className="text-gray-600">
                  • {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {product.inStock ? (
              <span className="text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                In stock
              </span>
            ) : (
              <span className="text-red-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Out of stock
              </span>
            )}
            
            
          </div>
          <button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-900 text-white rounded-md transition-colors">
              {product.actionButtonText || 'Add to cart'}
            </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductListView;