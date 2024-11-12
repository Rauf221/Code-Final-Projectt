const ProductBanner = () => {
    const products = [
      {
        title: 'Microsoft Surface Laptop 14" ' ,
        subtitle: "Up To -30%",
        bgColor: "bg-[#F04054]",
        textColor: "text-white",
        image: "https://demo-morata.myshopify.com/cdn/shop/files/1_5.png?v=1698140421&width=3840"
      },
      {
        title: "Cameras Best Sport Edition",
        subtitle: "Up To -20%",
        bgColor: "bg-[#39AD75]",
        textColor: "text-white",
        image: "https://demo-morata.myshopify.com/cdn/shop/files/1_6.png?v=1698140421&width=3840"
      },
      {
        title: "Sneaker Nike Air Max 90",
        subtitle: "Up To -60%",
        bgColor: "bg-[#FA880D]",
        textColor: "text-white",
        image: "https://demo-morata.myshopify.com/cdn/shop/files/1_7.png?v=1698140421&width=3840"
      }
    ];
  
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className={`${product.bgColor} rounded-xl overflow-hidden  relative h-44 flex items-center justify-between p-8 group cursor-pointer transition-transform duration-300 hover:scale-98`}
            >
              <div className="z-10">
                <h3 className={`${product.textColor} text-xl w-44 text-wrap font-medium mb-2`}>
                  {product.title}
                </h3>
                <p className={`${product.textColor} text-md font-semibold`}>
                  {product.subtitle}
                </p>
              </div>
              
              <div className="absolute  transform transition-transform duration-1000 group-hover:scale-110">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductBanner;