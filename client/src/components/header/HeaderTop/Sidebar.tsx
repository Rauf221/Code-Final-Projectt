"use client";   

import React, { useState } from "react";
import { RiShoppingCartLine, RiDeleteBinLine } from "react-icons/ri";
import { useCart } from '../../Header/HeaderTop/CardContext';

const ShoppingCartSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getTotalItems } = useCart();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Shopping Cart Trigger */}
      <div 
        className="flex items-center relative gap-3 cursor-pointer" 
        onClick={toggleSidebar}
      >
        <RiShoppingCartLine className="text-4xl" />
        <div className="flex flex-col text-xs">
          <span className="ml-1 font-normal text-gray-400">Your Cart</span>
          <span className="ml-1 font-bold">${getCartTotal().toFixed(2)}</span>
        </div>
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 left-5 bg-[#22D3EE] text-white text-xs rounded-full px-2">
            {getTotalItems()}
          </span>
        )}
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[999]" 
          onClick={toggleSidebar}
        >
          {/* Cart Sidebar */}
          <div
            className="fixed top-0 right-0 w-[400px] bg-white h-full shadow-xl z-[1000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">SHOPPING CART</h2>
              <button 
                onClick={toggleSidebar}
                className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Cart Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-250px)]">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 border-b border-gray-200 pb-6 mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[90px] h-[90px] object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <a href="#" className="text-sm text-black hover:text-gray-600">
                          {item.title}
                        </a>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <RiDeleteBinLine size={20} />
                        </button>
                      </div>
                      <p className="text-lg font-bold mt-2 text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-3">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 
                                   text-black hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <div className="mx-2 w-16">
                          <input
                            type="text"
                            value={item.quantity.toString().padStart(2, '0')}
                            className="w-full h-8 text-center border border-gray-200 text-black"
                            readOnly
                          />
                        </div>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-200 
                                   text-black hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <div className="mt-6 flex items-center gap-2 bg-gray-50 p-4 rounded">
                  <span className="text-black">🚚</span>
                  <p className="text-black">
                    Congratulations! You've got <span className="font-medium">Free Shipping!</span>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">SUBTOTAL:</span>
                  <span className="text-xl font-bold text-black">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <button className="w-full mb-2 px-4 py-3 bg-white border border-gray-200 text-black 
                                 font-medium transition-colors hover:bg-gray-50">
                  VIEW CART
                </button>
                <button className="w-full px-4 py-3 bg-black text-white font-medium 
                                 transition-colors hover:bg-gray-900">
                  CHECK OUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ShoppingCartSidebar;