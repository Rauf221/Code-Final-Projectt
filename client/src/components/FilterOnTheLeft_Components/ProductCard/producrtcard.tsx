import ProductDetailModal from '@/components/Home_Components/Hot Trending Products/Modal/modal';
import { Eye, Heart, Star } from 'lucide-react';
import React, { useState } from 'react';
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

interface Product {
  id?: string;
  _id?: string;
  image?: string;
  hoverImage?: string;
  name?: string;
  title?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  originalPrice?: number;
  discount?: number;
  actionButtonText?: string;
}

interface Props {
  product: Product;
  onQuickView?: (id: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, onQuickView }) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleQuickView = (productId: string) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={16} />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden  pb-4">
       <div className='w-full flex justify-center'>
      <div 
        key={product.id}
        className="px-2 w-[220px]"
      >
        <div className="bg-white py-3 px-3  relative">
          {(product.discount ?? 0) > 0 && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
              -{product.discount}%
            </span>
          )}

                  <div className="relative group">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-cover mb-4 pr-3 transition-all opacity-100 duration-700 ease-in-out group-hover:scale-105"
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        alt={`${product.title} hover`}
                        className="w-full h-40 object-cover mb-4 pr-3 transition-all absolute top-0 left-0 opacity-0 group-hover:opacity-100 duration-700 ease-in-out group-hover:scale-105"
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

                  <h3 className="text-sm font-medium text-[#2880D1] hover:text-[#EA0D42] transition-colors duration-300 mb-2 h-11 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-2 ">
                    <div className="flex mr-2">
                      {renderStars(product.rating ?? 0)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                    
        
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold text-lg">
            ${product.price?.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}  
        
        </div>
        
        
        <button className="w-full bg-zinc-800 hover:bg-zinc-900 text-white font-medium py-2.5 rounded text-sm transition-colors">
          {product.actionButtonText || 'Select Options'}
        </button>
      </div>
      
   </div>
   
   </div>
  </div>
  );
};

export default ProductCard;