"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown, MdSearch } from "react-icons/md";
import { PiUser } from "react-icons/pi";
import { RiShoppingCartLine } from "react-icons/ri";
import LanguageDropdown from "../language";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import ShoppingCartSidebar from "./Sidebar";



interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const toggleCartSidebar = () => {
    setIsCartSidebarOpen(!isCartSidebarOpen);
  };
  
  useEffect(() => {
    const cookies = parseCookies();
    const userCookie = cookies.user;
    if (userCookie) {
      const userData: User = JSON.parse(userCookie);
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAuthError(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:2000/auth/logout', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setUser(null);
        destroyCookie(null, 'user');
        router.push('/auth/login');
      } else {
        const errorData = await response.json();
        setAuthError(errorData.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      setAuthError('Logout failed');
    } finally {
      setIsLoading(false);
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
          <div className="relative" ref={dropdownRef}>
            {isLoading ? (
              <div className="text-gray-400">Loading...</div>
            ) : user ? (
              <div className="flex items-center group">
                <PiUser className="text-4xl" />
                <div className="flex flex-col text-xs">
                  <span className="ml-1 font-normal text-gray-400">
                    {user.isAdmin ? 'Admin' : 'Welcome'}
                  </span>
                  <span className="ml-1 font-bold">{user.username}</span>
                </div>
                {/* Dropdown menu */}
                <div className="absolute hidden group-hover:block top-full right-0 w-48 bg-white rounded-md shadow-lg py-1 text-black z-[100]">
                  {user.isAdmin && (
                    <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100" onClick={() => router.push('/admin')}>
                      Admin Panel
                    </button>
                  )}
                  <button className="block w-full px-4 py-2 text-sm hover:bg-gray-100" onClick={handleLogout} disabled={isLoading}>
                    {isLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => router.push("/auth/login")} className="flex items-center" disabled={isLoading}>
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
         
          
        </div>
        <ShoppingCartSidebar  isOpen={isCartSidebarOpen} onClose={toggleCartSidebar} />
      </div>
    </header>
  );
};

export default Header;
