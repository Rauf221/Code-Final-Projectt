import React from 'react';
import Image from 'next/image';

const OfficeFeatures = () => {
  const features = [
    {
      id: 1,
      title: "PERFECT SPACE",
      image: "https://demo-morata.myshopify.com/cdn/shop/files/img_about_2.jpg?v=1700017733&width=3840",
      description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos vel pretium lectus qua. Nunc id cursus metus ididunt ut labore metus episcing."
    },
    {
      id: 2,
      title: "SPECIAL PERSON",
      image: "https://demo-morata.myshopify.com/cdn/shop/files/img_about_3.jpg?v=1700017733&width=3840",
      description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos vel pretium lectus qua. Nunc id cursus metus ididunt ut labore metus episcing."
    },
    {
      id: 3,
      title: "MODERN OFFICE",
      image: "https://demo-morata.myshopify.com/cdn/shop/files/img_about_4.jpg?v=1700017733&width=3840",
      description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos vel pretium lectus qua. Nunc id cursus metus ididunt ut labore metus episcing."
    }
  ];

  return (
    <div className="py-20 bg-white rubik ">
      <div className="w-full   sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col group">
              {/* Image Container */}
              <div className="relative   object-cover  overflow-hidden rounded-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  
                  className="object-cover h-[600px] transition-transform duration-300 overflow-hidden group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="flex items-start mt-5 w-full flex-col">
                <span className="text-md font-bold flex gap-1 ">
                  {feature.id}.
                  <h3 className="text-md font-semibold text-gray-900 mb-3 ">
                    {feature.title}
                  </h3>
                </span>
                <div className='w-full'>
                  <p className="text-[#777789] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficeFeatures;