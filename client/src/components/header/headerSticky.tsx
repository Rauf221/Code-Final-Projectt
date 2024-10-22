"use client";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiSealPercentFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import MegaMenu from "./MegaMenu/MegaMenu";

import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false); // Manage MegaMenu visibility
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const toggleMegaMenu = () => {
    setMegaMenuOpen(!isMegaMenuOpen);
  };

  // Close MegaMenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    if (isMegaMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isMegaMenuOpen]);



  return (
 <div className=" z-50">
   <nav className="bg-[#263c97] text-white  w-full rubik relative z-[50]   ">
      <div className=" flex justify-start gap-[20px] items-center ">
        {/* Left Menu */}
        <div className="flex items-center  group space-x-1 text-sm font-bold relative    ">
          <button className="flex items-center text-start py-4 w-[300px]  justify-start  space-x-2 "  onClick={toggleMegaMenu}>
          <span className="absolute top-0 left-1/2 w-0 transition-all opacity-0  h-0.5 duration-700 bg-cyan-400 group-hover:w-3/6 group-hover:opacity-100"></span>
          <span className="absolute top-0 right-1/2 w-0 transition-all opacity-0 h-0.5 duration-700  bg-cyan-400 group-hover:w-3/6 group-hover:opacity-100"></span>
            <span className="text-white text-xl group font-bold">
              <RxHamburgerMenu />
            </span>
            <span className="text-sm font-medium">SHOP BY DEPARTMENT</span>
            
          </button>
          <span className="font-thin">|</span>
        </div>
         
        {/* Center Links */}
        <ul className="flex items-center space-x-4 relative  ">
          <li className="group ">
            <button className="flex items-center space-x-1">
              <a href="#"  className="text-sm font-medium">HOME</a>
              <MdOutlineKeyboardArrowDown />
            </button>
            {/* Dropdown */}
            <ul className="absolute -left-[20px] invisible text-sm w-[500px]  pt-5 group-hover:visible   text-black py-2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4">
              <div className="bg-white  w-[500px] flex-wrap flex">
              {Array.from({ length: 28 }, (_, index) => (
                <li
                  key={index}
                  className="w-1/2 px-4 py-1 font-normal text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                >
                  <a href="#">Home {index + 1}</a>
                </li>
              ))}
              </div>
            </ul>
          </li>

          <li className="group  ">
            <button className="flex items-center space-x-1">
              <a href="#"  className="text-sm font-medium">SHOP</a>
              <MdOutlineKeyboardArrowDown />
            </button>

            {/* Dropdown on hover */}
            <ul className="absolute -left-[200px] invisible text-sm w-[1220px] group-hover:visible flex flex-wrap pt-5  text-black py-2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4">
              <div className="flex items-start justify-between  space-x-8 w-full p-5  bg-white">
                {/* First Category: Shop Layout */}
                <div className="group relative">
                  <span className="flex items-center px-3  hover:text-cyan-400   transition-colors duration-300 space-x-1 text-lg font-bold">
                    Shop Layout
                  </span>
                  <ul className="absolute top-full left-0 text-sm w-[200px] bg-white text-black py-2 ">
                    {[
                      "Shop Default",
                      "Filter On The Left",
                      "Filter On The Right",
                      "Filter On Top",
                      "Popup Filter",
                      "Top Banner",
                      "Load More Button",
                      "Infinite Scrolling",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 font-normal text-[#888888] hover:text-cyan-400  hover:translate-x-2 transition-transform duration-300"
                      >
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Second Category: Product Type */}
                <div className="group relative">
                  <span className="flex items-center px-3  hover:text-cyan-400 transition-colors duration-300 space-x-1 text-lg font-bold">
                    Product Type
                  </span>
                  <ul className="absolute top-full left-0 text-sm w-[200px] bg-white text-black py-2 ">
                    {[
                      "Product Default",
                      "Product Variable",
                      "Product Grouped",
                      "Product External",
                      "Product Downloadable",
                      "Product Swatch Images",
                      "Product 3D",
                      "Product With Video",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 font-normal text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                      >
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Third Category: Collection Layout */}
                <div className="group relative">
                  <span className="flex items-center   hover:text-cyan-400 transition-colors duration-300 px-3 space-x-1 text-lg font-bold">
                    Collection Layout
                  </span>
                  <ul className="absolute top-full left-0 text-sm w-[200px] bg-white text-black py-2 ">
                    {[
                      "Product 3 Column",
                      "Product 4 Column",
                      "Product 5 Column",
                      "Product List",
                      "Thumbnail On The Left",
                      "Thumbnail On The Right",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 font-normal text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                      >
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image and Text */}
                <div className="flex-shrink-0 relative ">
                  <img
                    src="https://demo-morata.myshopify.com/cdn/shop/products/products_4_7.jpg?v=1697644644&width=3840"
                
                    alt="Laptop & Ipad"
                    className="w-[280px] h-[280px] object-cover rounded-sm"
                  />
                  <button className="mt-2 text-center font-bold absolute bottom-[17px] bg-white left-7 rounded-md px-16 py-2">
                    Laptop & Ipad
                  </button>
                </div>
              </div>
            </ul>
          </li>

          <li className=" group">
            <button className="flex items-center space-x-1">
              <a href="#" className="text-sm font-medium">PRODUCT</a>
              <MdOutlineKeyboardArrowDown />
            </button>

            <ul className="absolute -left-[200px] invisible text-sm w-[1220px] group-hover:visible flex flex-wrap pt-5  text-black py-2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4">
              <div className="flex items-start justify-between gap- space-x-8 w-full p-5  bg-white">
                {/* First Category: Shop Layout */}
                <div className="group relative">
                  <ul className="absolute top-full left-0 text-sm w-[200px] bg-white text-black py-2 ">
                    {[
                      "Product Default",
                      "Product Variable",
                      "Product Grouped",
                      "Product External",
                      "Product Downloadable",
                      "Product Swatch images",
                      "Product 3D",
                      "Product With Video",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 font-normal text-[#888888] hover:text-cyan-400  hover:translate-x-2 transition-transform duration-300"
                      >
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Third Category: Collection Layout */}
                <div className="group relative">
                  <ul className="absolute top-full left-0 text-sm w-[200px] bg-white text-black py-2 ">
                    {[
                      "Thumbnail on the bottom",
                      "Turn off thumbnails",
                      "Product - zoom Basic",
                      "Product - Inner zoom",
                      "Product - Lens Zoom",
                      "Product - Mousewheel Zoom",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 font-normal text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                      >
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image and Text */}
                <div className=" flex gap-5">
                  <div className="flex-shrink-0 relative ">
                    <img
                      src="https://demo-morata.myshopify.com/cdn/shop/products/products_2_4.jpg?v=1697644616&width=3840"
                      alt="Laptop & Ipad"
                      className="w-[280px] h-[280px] object-cover rounded-sm"
                    />
                    <button className="mt-2 text-center font-normal absolute bottom-[17px] text-[#888888] bg-white left-7 rounded-md px-11 py-2">
                      Collection's name #{" "}
                    </button>
                  </div>
                  <div className="flex-shrink-0 relative ">
                    <img
                      src="https://demo-morata.myshopify.com/cdn/shop/products/products_4_7.jpg?v=1697644644&width=3840"
                      alt="Laptop & Ipad"
                      className="w-[280px] h-[280px] object-cover rounded-sm"
                    />
                    <button className="mt-2 text-center text-[#888888] font-normal absolute bottom-[17px] bg-white left-7 rounded-md px-11 py-2">
                      Collection's name #{" "}
                    </button>
                  </div>
                </div>
              </div>
            </ul>
          </li>

          <li className="relative group">
            <button className="flex items-center space-x-1">
              <a href="#" className="text-sm font-medium">PAGES</a>
              <MdOutlineKeyboardArrowDown />
            </button>
            <ul className="absolute left-0 invisible group-hover:visible block  text-black pt-5  transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-3">
            <div className="group  ">
                  <ul className="absolute top-full  -translate-x-4 text-sm w-[200px] bg-white text-black py-2 ">
                    {[
                      "About us",
                      "Comeing Soon",
                      "FAQs",
                      "Our Team",
                      "Payment Plans",
                      "Page 404",
                      "Gift Cards",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 font-normal text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                      >
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
             </div>
            </ul>
          </li>

          <li className=" relative group">
           <button className="flex items-center text-sm font-medium">
           <a href="#">BLOG</a>
           <MdOutlineKeyboardArrowDown />
           </button>
           <ul className="absolute left-0 invisible group-hover:visible block  text-black pt-5  transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-3">
            <div className="group  ">
                  <ul className="absolute top-full  -translate-x-4 text-sm w-[200px] bg-white text-black py-2 ">
                    {[
                      "Blog Image",
                      "Blog Grid",
                      "Blog Grid 2 Column",
                      "Blog Grid 3 Column",
                      "Blog List",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-1 font-normal text-[#888888] hover:text-cyan-400 hover:translate-x-2 transition-transform duration-300"
                      >
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
             </div>
            </ul>
          </li>
          <li className="text-sm font-medium">
            <a href="#">CONTACT US</a>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center justify-center pl-[410px]">
          <span className="text-cyan-400 text-2xl">
            <PiSealPercentFill />
          </span>
          <span className="px-2 py-1 text-sm font-bold">
            Sale $20 Off Your First Order
          </span>
        </div>
      
      </div>
    </nav>
    {isMegaMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-40 z-10"
          ></div>
            
          {/* MegaMenu */}
          <div ref={megaMenuRef} className="absolute top-[180px] left-0 w-full px-2 z-50">
            <MegaMenu />
          </div>
        </>
      )}
 </div>
  );
};

export default NavBar;
