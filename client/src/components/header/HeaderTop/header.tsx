"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown, MdSearch } from "react-icons/md";
import { PiUser } from "react-icons/pi";
import { RiShoppingCartLine } from "react-icons/ri";
import LanguageDropdown from "../language";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface AuthSuccessHandler {
  (token: string, userData: User): void;
}

const categories = [
  "All Categories",
  "Accessories",
  "Basketball",
  "Clothing",
  "Computer",
  "Computer & Desktop",
  "Cutting Machine",
  "Dining & Kitchen",
  "Drills",
  "Electronic",
  "Electronics",
  "Fresh Vegetables",
  "Furniture",
  "Garden",
  "Handheld Power Drills",
  "Health & Beauty",
  "Jewelry",
  "Laptop",
  "Logitech",
  "Makeup",
  "Sectional Sofas",
  "Smart Phones & Tablets",
  "Snack & Beverage",
  "T-Shirt",
  "Televisions",
  "Tools",
  "Watches",
  "Women's",
  "Watches & Eyewear",
];

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for user data in localStorage on component mount
    const checkAuth = () => {
      const token = localStorage.getItem("acces_token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          handleLogout();
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    // Add event listener for storage changes
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:2000/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("acces_token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-[#263c97] text-white rubik relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <div className="flex items-center space-x-2">
          <span className="flex">
            <LanguageDropdown />
          </span>
          <span className="flex items-center">
            <span>United States (USD $)</span>
            <MdOutlineKeyboardArrowDown />
          </span>
          <div>Need Help? +001 123 456 789</div>
        </div>
        <div className="flex">
          <ul className="flex gap-3">
            <li className="pr-3 border-r border-[#354bba]">About Us</li>
            <li className="pr-3 border-r border-[#354bba]">Order Tracking</li>
            <li className="pr-3 border-r border-[#354bba]">Contact Us</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-4 py-5 border-t-[#354bba] border-t border-b border-b-[#354bba]">
        {/* Logo */}
        <div className="w-[300px]">
          <img
            className="w-36 mr-20"
            src="https://demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938"
            alt="Logo"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-[700px] rounded-sm overflow-hidden border bg-white p-1">
          <select className="bg-white text-black text-sm px-3 py-3.5 overflow-hidden outline-none">
            {categories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
          <div className="h-7 w-[1px] ml-4 mr-4 flex items-center bg-white">
            <div className="h-7 w-[1px] bg-gray-300"></div>
          </div>
          <input
            type="text"
            placeholder="Search for products ..."
            className="flex-grow py-1.5 text-black outline-none"
          />
          <button className="bg-cyan-400 px-2 py-1.5 rounded-sm">
            <MdSearch size={28} />
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-8">
          {/* User Account */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center group relative">
                <PiUser className="text-4xl" />
                <div className="flex flex-col text-xs">
                  <span className="ml-1 font-normal text-gray-400">Welcome</span>
                  <span className="ml-1 font-bold">{user.username}</span>
                </div>
                {/* Dropdown menu */}
                <div className="absolute hidden group-hover:block top-full right-0  w-24 bg-white rounded-md shadow-lg py-1 text-black z-[100]">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth/login")}
                className="flex items-center"
              >
                <PiUser className="text-4xl" />
                <div className="flex flex-col text-xs">
                  <span className="ml-1 font-normal text-gray-400">Login</span>
                  <span className="ml-1 font-bold">Account</span>
                </div>
              </button>
            )}
          </div>

          {/* Wishlist */}
          <div className="flex items-center relative">
            <FiHeart className="text-4xl" />
            <div className="flex flex-col text-xs">
              <span className="ml-1 font-normal text-gray-400">Favorite</span>
              <span className="ml-1 font-bold">My Wishlist</span>
            </div>
            <span className="absolute top-0 left-5 bg-cyan-400 text-white text-xs rounded-full ml-1 px-2">
              0
            </span>
          </div>

          {/* Shopping Cart */}
          <div className="flex items-center relative gap-3">
            <RiShoppingCartLine className="text-4xl" />
            <div className="flex flex-col text-xs">
              <span className="ml-1 font-normal text-gray-400">Your Cart</span>
              <span className="ml-1 font-bold">$0.00</span>
            </div>
            <span className="absolute top-0 left-5 bg-cyan-400 text-white text-xs rounded-full ml-1 px-2">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
