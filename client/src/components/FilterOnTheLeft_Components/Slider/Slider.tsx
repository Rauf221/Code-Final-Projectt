"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  title: string;
}

const FilterOnTheLeftSlider = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1));
        setProducts([
          { id: 1, image: "https://demo-morata.myshopify.com/cdn/shop/products/products_34_4.jpg?v=1697644904&width=3840", title: "Smarphone" },
          { id: 2, image: "https://demo-morata.myshopify.com/cdn/shop/products/products_31_1_9617e01f-65e8-464c-8e92-1f17c1002192.jpg?v=1697644886&width=3840", title: "Smartwatch" },
          { id: 3, image: "https://demo-morata.myshopify.com/cdn/shop/products/products_4_4.jpg?v=1697644644&width=3840", title: "Ipad Pro" },
          { id: 4, image: "https://demo-morata.myshopify.com/cdn/shop/products/products_23_3.jpg?v=1697644775&width=3840", title: "AirPods" },
          { id: 5, image: "https://demo-morata.myshopify.com/cdn/shop/products/products_13_1.jpg?v=1697644732&width=3840", title: "Speaker" },
          { id: 6, image: "https://demo-morata.myshopify.com/cdn/shop/files/products_28_3.jpg?v=1699516526&width=3840", title: "Gamepad" },
          { id: 7, image: "https://demo-morata.myshopify.com/cdn/shop/files/products_3_6_8b177e91-c23c-478c-837f-141f57a7e41b.jpg?v=1699516596&width=3840", title: "Hard Drives" },
          { id: 8, image: "https://lacountystentorians.org/cdn/shop/products/Donate_580x.png?v=1605293290", title: "All collection" },
        ]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1536) setSlidesToShow(8);
      else if (width >= 1280) setSlidesToShow(7);
      else if (width >= 1024) setSlidesToShow(4);
      else if (width >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlidesToShow();

    window.addEventListener("resize", updateSlidesToShow);

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const maxIndex = Math.max(0, products.length - slidesToShow);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  if (loading) {
    return (
      <div className="w-full grid grid-cols-7 gap-6 py-6">
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white py-3 px-3 rounded-2xl shadow-sm animate-pulse"
            >
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-8 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
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
    <>
    <nav className="py-2 flex items-center justify-between border-b mb-5 ">
        <div className="flex items-center space-x-8">
          <div className="flex  text-gray-600">
            <Link href="/home" className="px-3 py-2 hover:text-[#16BCDC]">
              Home
            </Link>
            <span className="px-1 py-2">/</span>
            <Link href="/filterontheleft" className="px-3 py-2 hover:text-[#16BCDC]">
              Products
            </Link>
          </div>
        </div>
      </nav>

    <div className="w-full py-6 rubik ">
      <div className="flex justify-between items-center px-6 mb-6">
        <div className="">
          <h2 className="text-2xl font-medium text-gray-800">Products</h2>
          <div className="relative h-[2px] w-full bg-black">
            <div className="absolute h-[2px] w-full bg-[#16BCDC]"></div>
          </div>
        </div>
      </div>

      <div className="relative px-4">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="mx-2">
                  <div className="bg-white p-3 shadow-sm h-full">
                    <div className="relative group overflow-hidden flex flex-col items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-40 object-cover mb-4 transition-transform duration-300 group-hover:scale-105"
                      />
                      <h3 className="text-sm font-medium text-[black] hover:text-[#16BCDC] transition-colors duration-300 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="absolute left-10 top-1/2 -translate-y-1/2 z-10  shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10  shadow-md rounded-full p-2 hover:bg-gray-100 disabled:opacity-50  disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
    </>
  );
};

export default FilterOnTheLeftSlider;