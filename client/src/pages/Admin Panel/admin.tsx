"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  ChevronDown,
  Bell,
  Menu,
  X,
  ShoppingCart,
  LogOut,
  GitBranch,
  FileText,
} from "lucide-react";

import { ReactNode } from "react";
import { useDarkMode } from "@/DarkMode/Darkmode";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";

interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

const CustomAdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null); // Track expanded menus

  useEffect(() => {
    const cookies = parseCookies();
    const userCookie = cookies.user;
    if (userCookie) {
      const userData: User = JSON.parse(userCookie);
      // Ensure the user is an admin
      if (userData.isAdmin) {
        setUser(userData);
      } else {
        // Redirect non-admin users
        router.push("/home");
      }
    } else {
      // Redirect if no user is logged in
      router.push("/auth/login");
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:2000/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Destroy the user cookie
        destroyCookie(null, "user");
        // Clear user state
        setUser(null);
        // Redirect to login page
        router.push("/auth/login");
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    {
      icon: Package,
      label: "Products",
      href: "/admin/products",
      subItems: [
        { label: "Hot Trending Products", href: "/admin/products/hot-trending-products" },
        { label: "Recommended Products", href: "/admin/products/recommended-products" },
      ],
    },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: GitBranch, label: "Comments", href: "/admin/comments" },
    { icon: FileText, label: "Reports", href: "/admin/reports" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Spinner */}
        <div className="w-8 h-8 border-4 border-black  border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 
          ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} 
          border-r w-64 p-4
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-8 px-2">
          <span
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Admin Panel
          </span>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg hover:bg-opacity-20 ${
              darkMode
                ? "hover:bg-gray-600 text-white"
                : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault();
                    setExpandedMenu(expandedMenu === item.label ? null : item.label);
                  }
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {item.subItems && (
                  <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform  ${
                      expandedMenu === item.label ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </a>
              {/* Submenu */}
              {item.subItems && expandedMenu === item.label && (
                <div className="ml-6 space-y-1 font-medium">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        darkMode
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`
          ${sidebarOpen ? "md:ml-64" : ""}
          flex flex-col min-h-screen transition-all duration-300
        `}
      >
        {/* Header */}
        <header
          className={`
            ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} 
            border-b h-16 fixed top-0 right-0 left-0 md:left-64 z-30
          `}
        >
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`
                md:hidden p-2 rounded-lg transition-colors duration-200
                ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Notifications */}
              <button
                className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <Bell size={20} />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`
                    flex items-center gap-2 p-2 rounded-lg transition-colors duration-200
                    ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${darkMode ? "bg-gray-700" : "bg-gray-200"}
                    `}
                  >
                    <Users size={20} />
                  </div>
                  <span> {user.username}</span>
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className={`
                      absolute right-0 mt-2 w-48 py-2 rounded-lg shadow-xl
                      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                      border
                    `}
                  >
                    <a
                      href="#profile"
                      className={`
                        block px-4 py-2 text-sm transition-colors duration-200
                        ${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `}
                    >
                      Profile
                    </a>
                    <a
                      href="#settings"
                      className={`
                        block px-4 py-2 text-sm transition-colors duration-200
                        ${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `}
                    >
                      Preferences
                    </a>
                    <div
                      className={`
                        my-1 border-t
                        ${darkMode ? "border-gray-700" : "border-gray-200"}
                      `}
                    />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main
          className={`
            flex-1 p-6 mt-16
            ${darkMode ? "text-gray-100" : "text-gray-800"}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomAdminLayout;
