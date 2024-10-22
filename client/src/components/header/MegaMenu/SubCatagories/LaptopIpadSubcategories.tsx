
interface SubcategoriesProps {
    isVisible: boolean;
  }

const LaptopIpadSubcategories: React.FC<SubcategoriesProps> = ({ isVisible }) => {
    // Subcategory items array
    const items = [
      'Computers',
      'Desktops & Monitors',
      'Hard Drives & Memory Cards',
      'Printers & Ink',
      'Networking & Internet Devices',
      'Computer Accessories',
      'Software Computers',
    ];
  
    return (
      <div
        className={`absolute top-0 left-0 transition-all transform duration-500 ease-in-out ${
          isVisible ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4'
        }`}
      >
        <div className="absolute top-9 rounded-md left-[250px] w-[200px] bg-white border border-r-0 border-gray-300 shadow-lg p-[15px] gap-3 text-xs">
          <div className="inline-block">
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="py-1 text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-500"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  export default LaptopIpadSubcategories;