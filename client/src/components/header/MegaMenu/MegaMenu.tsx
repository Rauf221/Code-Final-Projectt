import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ComputerDesktopSubcategories from "./SubCatagories/ComputerDekstopSubcatacories";
import LaptopIpadSubcategories from "./SubCatagories/LaptopIpadSubcategories";
import CamerasPhotosSubcategories from "./SubCatagories/CamerasPhotosSubcategories";
import SmartPhonesTablets from "./SubCatagories/SmartPhonesTablets";
import HomeKitchen from "./SubCatagories/HomeKitchen";



     

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null); 

  // Function to handle hover event
  const handleMouseEnter = (category: string) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <div className="relative z-20">
        {/* Sidebar */}
        <div className="w-[250px]  bg-white border-r inline-block ">
          <ul className="bg-white text-black rounded-md shadow-lg  text-xs">
            <li
              className="py-[0.567rem] px-4 border-b border-gray-200  flex justify-between items-center relative "
              onMouseEnter={() => handleMouseEnter("Computer & Desktop")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="hover:text-cyan-400">Computer & Desktop</span>
              <MdOutlineKeyboardArrowRight size={20} />
              {/* Show the subcategories component on hover */}
              <ComputerDesktopSubcategories
                isVisible={activeCategory === "Computer & Desktop"}
              />
            </li>

            <li
              className="py-[0.567rem] px-4 border-b border-gray-200  flex justify-between items-center"
              onMouseEnter={() => handleMouseEnter("Laptop & Ipad")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="hover:text-cyan-400">Laptop & Ipad</span>
              <MdOutlineKeyboardArrowRight size={20} />
              <LaptopIpadSubcategories
                isVisible={activeCategory === "Laptop & Ipad"}
              />
            </li>

            {/* Other categories without subcomponents */}
            <li className="py-[0.567rem] px-4 border-b border-gray-200  flex justify-between items-center"
              onMouseEnter={() => handleMouseEnter("Cameras & Photos")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="hover:text-cyan-400">Cameras & Photos</span>
              <MdOutlineKeyboardArrowRight size={20} />
              <CamerasPhotosSubcategories
                isVisible={activeCategory === "Cameras & Photos"}
              />
            </li>
            <li className="py-[0.567rem] px-4 border-b border-gray-200  flex justify-between items-center"
              onMouseEnter={() => handleMouseEnter("Smart Phones & Tablets")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="hover:text-cyan-400">Smart Phones & Tablets </span>
              <MdOutlineKeyboardArrowRight size={20} />
              <SmartPhonesTablets
                isVisible={activeCategory === "Smart Phones & Tablets"}
              />
            </li>
            <li className="py-[0.567rem] px-4 border-b border-gray-200  flex justify-between items-center"
              onMouseEnter={() => handleMouseEnter("Home & Kitchen")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="hover:text-cyan-400">Home & Kitchen </span>
              <MdOutlineKeyboardArrowRight size={20} />
              <HomeKitchen
                isVisible={activeCategory === "Home & Kitchen"}
              />
            </li>
            <li className="py-[0.567rem] px-4 border-b border-gray-200 hover:text-cyan-400 flex justify-between items-center">
              <span className="">TV & Audios</span>
            </li>
            <li className="py-[0.567rem] px-4 border-b border-gray-200 hover:text-cyan-400 flex justify-between items-center">
              <span className="">Health & Beauty</span>
            </li>
            <li className="py-[0.567rem] px-4 border-b border-gray-200 hover:text-cyan-400 flex justify-between items-center">
              <span className="">Watches & Eyewear</span>
            </li>
            <li className="py-[0.567rem] px-4 border-b border-gray-200 hover:text-cyan-400 flex justify-between items-center">
              <span className="">Top Deals</span>
            </li>
            <li className="py-[0.567rem] px-4 border-b border-gray-200 hover:text-cyan-400 flex justify-between items-center">
              <span className="">Top Selling Products</span>
            </li>
            <li className="py-[0.567rem] px-4  flex justify-between items-center hover:text-cyan-400">
              <span className="">Top Featured Products</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;
