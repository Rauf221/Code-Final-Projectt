import React from 'react';

const BrandLogos = () => {
  const logos = [
    { src: 'https://demo-morata.myshopify.com/cdn/shop/files/brand_1_1.png?v=1698223763&width=3840', alt: 'Leads Green' },
    { src: 'https://demo-morata.myshopify.com/cdn/shop/files/brand_1_2.png?v=1698223763&width=3840', alt: 'IQVIA' },
    { src: 'https://demo-morata.myshopify.com/cdn/shop/files/brand_1_3.png?v=1698223762&width=3840', alt: 'PMI Impact' },
    { src: 'https://demo-morata.myshopify.com/cdn/shop/files/brand_1_4.png?v=1698223763&width=3840', alt: 'Creative' },
    { src: 'https://demo-morata.myshopify.com/cdn/shop/files/brand_1_5.png?v=1698223763&width=3840', alt: 'Car Rentals' },
    { src: 'https://demo-morata.myshopify.com/cdn/shop/files/brand_1_6.png?v=1698223762&width=3840', alt: 'Car Voodoo' },
    { src: 'https://demo-morata.myshopify.com/cdn/shop/files/brand_1_1.png?v=1698223763&width=3840', alt: 'Leads Green' },
  ];

  return (
    <div className="max-w-[1500px] bg-white py-8 rounded-3xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 rounded-3xl">
        <div className="flex  justify-center items-center bg-white  rounded-3xl ">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-[77px] w-auto "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogos;
