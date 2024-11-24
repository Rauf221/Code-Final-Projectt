import React from 'react';
import { Users, ShoppingBag, BookOpen, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      number: "21K",
      title: "Products For Sale",
      description: "Class aptent taciti sociosqu litora torquent per conubia.",
     
    },
    {
      number: "21K",
      title: "Products For Sale",
      description: "Class aptent taciti sociosqu litora torquent per conubia.",
    
    },
    {
      number: "21K",
      title: "Products For Sale",
      description: "Class aptent taciti sociosqu litora torquent per conubia.",
      
    },
    {
      number: "21K",
      title: "Products For Sale",
      description: "Class aptent taciti sociosqu litora torquent per conubia.",
     
    }
  ];

  return (
    <div className="py-20 bg-white w-full rubik">
      <div className=" mx-auto px-4 sm:px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <div key={index} className="text-center w-full">
           
              <h3 className="text-3xl font-semibold text-[#16BCDC] mb-2">{stat.number}</h3>
              <h4 className="text-md font-medium text-gray-900 mb-3">{stat.title}</h4>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full h-[1px] bg-slate-200 mt-20'></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
        <h2 className="text-[#16BCDC] text-sm font-medium mb-4">WHY CHOOSE US</h2>
        <h3 className="text-3xl font-medium text-gray-900 mb-3">
          OVER 20 YEARS OF EXPERIENCE
        </h3>
        <p className="text-gray-600 text-md leading-relaxed max-w-3xl mx-auto">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos vel pretium 
          lectus qua. Nunc id cursus metus ididunt ut labore metus episcing.
        </p>
      </div>
     
    </div>
  );
};

export default StatsSection;