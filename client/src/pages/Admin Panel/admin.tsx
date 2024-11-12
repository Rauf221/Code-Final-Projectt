"use client";

import React, { useState } from 'react';
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
} from 'lucide-react';

import { ReactNode } from 'react';

const CustomAdminLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Kontrol Paneli', href: '/admin/dashboard' },
    { icon: Package, label: 'Ürünler', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Siparişler', href: '/admin/orders' },
    { icon: Users, label: 'Müşteriler', href: '/admin/customers' },
    { icon: GitBranch, label: 'Kategoriler', href: '/admin/categories' },
    { icon: FileText, label: 'Raporlar', href: '/admin/reports' },
    { icon: Settings, label: 'Ayarlar', href: '/admin/settings' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
          border-r w-64 p-4
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-8 px-2">
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Admin Panel
          </span>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg hover:bg-opacity-20 ${
              darkMode ? 'hover:bg-gray-600 text-white' : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                ${darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`
          ${sidebarOpen ? 'md:ml-64' : ''}
          flex flex-col min-h-screen transition-all duration-300
        `}
      >
        {/* Header */}
        <header
          className={`
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
            border-b h-16 fixed top-0 right-0 left-0 md:left-64 z-30
          `}
        >
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`
                md:hidden p-2 rounded-lg transition-colors duration-200
                ${darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
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
                  ${darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
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
                    ${darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}
                    `}
                  >
                    <Users size={20} />
                  </div>
                  <span>Admin</span>
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className={`
                      absolute right-0 mt-2 w-48 py-2 rounded-lg shadow-xl
                      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                      border
                    `}
                  >
                    <a
                      href="#profile"
                      className={`
                        block px-4 py-2 text-sm transition-colors duration-200
                        ${darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      Profil
                    </a>
                    <a
                      href="#settings"
                      className={`
                        block px-4 py-2 text-sm transition-colors duration-200
                        ${darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      Tercihler
                    </a>
                    <div
                      className={`
                        my-1 border-t
                        ${darkMode ? 'border-gray-700' : 'border-gray-200'}
                      `}
                    />
                    <a
                      href="#logout"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        <span>Çıkış Yap</span>
                      </div>
                    </a>
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
            ${darkMode ? 'text-gray-100' : 'text-gray-800'}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomAdminLayout;