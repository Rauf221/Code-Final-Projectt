"use client";
import React, { useState, useEffect } from "react";
import { Heart, Eye, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import RecommendedProductDetailModal from "./ModalForRecommended/modalForrecommended";
import { useCart } from "@/components/Header/HeaderTop/CardContext";


interface Product {
  _id: string;
  slug: string;
  discount: number;
  image: string;
  hoverImage?: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
}

const RecommendedProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1536
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:2000/api/recommendedproducts");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
    fetchProducts();
  }, []);

  const handleQuickView = (productId: string) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesToShow = () => {
    if (windowWidth >= 1536) return 8;
    if (windowWidth >= 1280) return 7;
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const slidesToShow = getSlidesToShow();
  const maxIndex = products.length
    ? Math.max(0, products.length - slidesToShow)
    : 0;

  const handlePrevious = () => {
    setCurrentIndex((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setCurrentIndex((current) => Math.min(maxIndex, current + 1));
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
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full  py-6 ">
      <div className="flex justify-between items-center px-6 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Hot Trending Products
          </h2>
          <span className="h-[1px] w- bg-black block">
            <span className="h-[1px] w-[245px] bg-blue-600 absolute"></span>
          </span>
        </div>
        <button className="flex items-center text-blue-600 hover:text-blue-700">
          View All Products
          <ChevronRight className="ml-1" size={20} />
        </button>
      </div>

      <div className="relative  ">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              width: `${(products.length * 100) / slidesToShow}%`,
            }}
          >
            {products.map((product) => (
              <div
                key={product._id || product.slug}
                className="px-2"
                style={{ width: `${100 / products.length}%` }}
              >
                <div className="bg-white py-3 px-3 rounded-2xl shadow-sm relative  ">
                  {product.discount > 0 && (
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
                        onClick={() => handleQuickView(product._id)}
                      >
                        <Eye size={15} />
                      </button>
                      <button className="p-2 bg-white rounded-full text-xs text-gray-600 hover:text-white hover:bg-blue-500">
                        <HiOutlineSquare3Stack3D size={15} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-[#2880D1] hover:text-[#EA0D42] transition-colors duration-300 mb-2 h-11 line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center mb-2 ">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>

                  <button className="w-full py-2  rounded-3xl text-white bg-black hover:bg-[#16BCDC] transition-colors duration-500"
                  onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <RecommendedProductDetailModal
        productId={selectedProduct || ""}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RecommendedProducts;
