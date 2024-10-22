interface SubcategoriesProps {
    isVisible: boolean;
  }
  

  const CamerasPhotosSubcategories: React.FC<SubcategoriesProps> = ({ isVisible }) => {
   
    const categories = [
      {
        title: 'Laptop & Computers',
        items: [
          'Computers',
          'Desktops & Monitors',
          'Hard Drives & Memory Cards',
          'Printers & Ink',
          'Networking & Internet Devices',
          'Computer Accessories',
          'Software Computers',
        ],
      },
      {
        title: 'Desktop and Monitors',
        items: [
          'Computers',
          'Desktops & Monitors',
          'Hard Drives & Memory Cards',
          'Printers & Ink',
          'Software Computers',
        ],
      },
      {
        title: 'Phones',
        items: [
          'Unlocked Phones',
          'Phone & Cellphone',
          'Cellphone Charges',
          'Printers & Supplies',
        ],
      },
    ];
  
    return (
      <div
        className={`absolute top-0 left-0 transition-all transform duration-500 ease-in-out ${
          isVisible ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4'
        }`}
      >
        <div className="absolute top-0 left-[250px] w-[500px] h-[404px] bg-white border border-r-0 border-gray-300 shadow-lg p-[15px] grid grid-cols-2 gap-3 text-xs bg-center bg-cover bg-no-repeat bg-[url('https://demo-morata.myshopify.com/cdn/shop/files/bg_menu_500x.png?v=1698913113')]">
          {categories.map((category, index) => (
            <div key={index} className="font-medium">
              <h4 className="font-bold mb-2">{category.title}</h4>
              <ul>
                {category.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-1 text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-500"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CamerasPhotosSubcategories;