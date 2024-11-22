import { ChevronRight } from 'lucide-react';
import React from 'react';

const BlogPostContainer = () => {
  const blogPosts = [
    {
      image: 'https://demo-morata.myshopify.com/cdn/shop/articles/10.png?v=1698222718&width=3840',
      category: 'TECHNOLOGY',
      title: 'Limited Edition Safari & Silver Summicron M-Lenses',
      content: 'iPad Pro is the fastest device of its kind. It\'s designed to...',
      readMoreLink: '#',
      author: 'ALO SUPPORT',
      date: 'OCT. 25 2023',
    },
    {
      image: 'https://demo-morata.myshopify.com/cdn/shop/articles/9.png?v=1698222644&width=3840',
      category: 'TECHNOLOGY',
      title: 'Limited Edition Safari & Silver Summicron M-Lenses',
      content: 'iPad Pro is the fastest device of its kind. It\'s designed to...',
      readMoreLink: '#',
      author: 'ALO SUPPORT',
      date: 'OCT. 25 2023',
    },
    {
      image: 'https://demo-morata.myshopify.com/cdn/shop/articles/8.png?v=1698222611&width=3840',
      category: 'TECHNOLOGY',
      title: 'Limited Edition Safari & Silver Summicron M-Lenses',
      content: 'iPad Pro is the fastest device of its kind. It\'s designed to...',
      readMoreLink: '#',
      author: 'ALO SUPPORT',
      date: 'OCT. 25 2023',
    },
    {
      image: 'https://demo-morata.myshopify.com/cdn/shop/articles/7.png?v=1698222575&width=3840',
      category: 'TECHNOLOGY',
      title: 'Limited Edition Safari & Silver Summicron M-Lenses',
      content: 'iPad Pro is the fastest device of its kind. It\'s designed to...',
      readMoreLink: '#',
      author: 'ALO SUPPORT',
      date: 'OCT. 25 2023',
    },
    {
      image: 'https://demo-morata.myshopify.com/cdn/shop/articles/5.png?v=1698222541&width=3840',
      category: 'TECHNOLOGY',
      title: 'Limited Edition Safari & Silver Summicron M-Lenses',
      content: 'iPad Pro is the fastest device of its kind. It\'s designed to...',
      readMoreLink: '#',
      author: 'ALO SUPPORT',
      date: 'OCT. 25 2023',
    },
    {
      image: 'https://demo-morata.myshopify.com/cdn/shop/articles/4.png?v=1698221875&width=3840',
      category: 'TECHNOLOGY',
      title: 'Limited Edition Safari & Silver Summicron M-Lenses',
      content: 'iPad Pro is the fastest device of its kind. It\'s designed to...',
      readMoreLink: '#',
      author: 'ALO SUPPORT',
      date: 'OCT. 25 2023',
    },
  ];

  return (
    <div className="max-w-[1500px] mx-auto  sm:px-6 lg: py-12">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-medium text-gray-800">
            From Our Blog
          </h2>
          <span className="h-[1px] mt-3 bg-black block">
            <span className="h-[2px] w-[160px] bg-[#16BCDC] absolute"></span>
          </span>
        </div>
        <button className="flex items-center  hover:text-[#16BCDC]">
          See All 
          <ChevronRight className="ml-1" size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover hover:scale-110 transition-all duration-1000"
              />
              <span className="absolute top-4 left-4 bg-[#16BCDC] text-white px-2 py-1 rounded text-xs font-semibold">
                {post.category}
              </span>
            </div>
            <div className="p-4 flex flex-col ">
              <h3 className="text-md line-clamp-2 leading-tight font-semibold mb-3 text-gray-800">{post.title}</h3>
              <a href="#" className="text-[0.65rem] font-medium hover: mb-2">
                   POSTED BY <span className='text-[#16BCDC]'>{post.author}</span>
                  </a>
              <p className="text-gray-600 text-sm mb-4">{post.content}</p>
              <div className="mt-auto flex items-center justify-between text-sm border-t boerder-1 boerder pt-4 text-gray-500">
                <a href={post.readMoreLink} className="text-xs font-bold hover:text-[#16BCDC] transition-colors duration-500">
                  READ MORE
                </a>
                <div className=" text-xs text-gray-400 font-medium">
                  <span>{post.date}</span>
                 
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BlogPostContainer;