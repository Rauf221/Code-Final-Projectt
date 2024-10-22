interface SubcategoriesProps {
    isVisible: boolean;
  }

const SmartPhonesTablets: React.FC<SubcategoriesProps> = ({ isVisible }) => {
 
    const subcategories = [
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
        title: 'Prime Videos',
        items: ['Unlocked Phones', 'Phone & Cellphone', 'Cellphone Charges', 'Printers & Supplies'],
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
        title: 'Cameras',
        items: [
          'Digital Cameras',
          'Professional & SLR Cameras',
          'Camcorders & Video Cameras',
          'Camera Lenses & Accessories',
          'CCTV Cameras',
          'Other Accessories',
        ],
      },
    ];
  
  
    return (
      <div
        className={`absolute top-0 left-0 transition-all transform duration-500 ease-in-out ${
          isVisible ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4'
        }`}
      >
        <div className="absolute top-0 left-[250px] w-[500px] bg-white border border-r-0 border-gray-300 shadow-lg p-[15px] grid grid-cols-2 gap-3 text-xs">
          {subcategories.map((subcategory, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-2">{subcategory.title}</h4>
              <ul>
                {subcategory.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="py-1 text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-500"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-[750px] w-[225px] bg-white border-r-1 border-t-1 border-b-1 p-[14px] grid grid-cols-2 gap-3 text-xs">
          <div className="w-[199px]">
            <img
              src="https://demo-morata.myshopify.com/cdn/shop/files/menu_2.png?v=1698913928&width=3840"
              className="w-[300px]"
              alt="Subcategory visual"
            />
          </div>
        </div>
      </div>
    );
  };

export default SmartPhonesTablets;