import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  title: string;
  productCount: number;
  image: string;
  slug: string;
  bgColor: string;
}

const categories: Category[] = [
  {
    id: '1',
    title: 'Decor & Furniture',
    productCount: 11,
    image: 'https://demo-morata.myshopify.com/cdn/shop/files/cate_1_1.png?v=1698113463&width=3840',
    slug: 'decor-furniture',
    bgColor: 'bg-[#A68A4C]'
  },
  {
    id: '2',
    title: 'Smart Phones',
    productCount: 21,
    image: 'https://demo-morata.myshopify.com/cdn/shop/files/cate_1_2.png?v=1698113463&width=3840',
    slug: 'smart-phones',
    bgColor: 'bg-[#A1516B]'
  },
  {
    id: '3',
    title: 'Fashion & Clothing',
    productCount: 8,
    image: 'https://demo-morata.myshopify.com/cdn/shop/files/cate_1_3.png?v=1698113463&width=3840',
    slug: 'fashion-clothing',
    bgColor: 'bg-[#19A5A5]'
  },
  {
    id: '4',
    title: 'Home Kitchen',
    productCount: 10,
    image: 'https://demo-morata.myshopify.com/cdn/shop/files/cate_1_4.png?v=1698113464&width=3840',
    slug: 'home-kitchen',
    bgColor: 'bg-[#E32636]'
  },
  {
    id: '5',
    title: 'Camera & Photo',
    productCount: 0,
    image: 'https://demo-morata.myshopify.com/cdn/shop/files/cate_1_5.png?v=1698113463&width=3840',
    slug: 'camera-photo',
    bgColor: 'bg-[#151B3B]'
  },
  {
    id: '6',
    title: 'Speaker & Audio',
    productCount: 6,
    image: 'https://demo-morata.myshopify.com/cdn/shop/files/cate_1_6.png?v=1698113463&width=3840',
    slug: 'speaker-audio',
    bgColor: 'bg-[#6B4E9B]'
  }
];

const PopularCategories = () => {
  return (
    <section className="py-12 px-4 continer mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Popular Categories</h2>
        <div className="w-52 h-[2px] bg-[#16BCDC] mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.id}
            className={`${category.bgColor} rounded-3xl overflow-hidden  group relative`}
          >
            <div className="aspect-[6/3] relative ">
              <img 
                src={category.image}
                alt={category.title}
                className=" object-cover  transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="absolute bottom-5 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-lg">{category.title}</h3>
                <p className="text-sm opacity-90">
                  ({category.productCount} Product{category.productCount !== 1 ? 's' : ''})
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;