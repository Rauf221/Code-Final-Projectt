"use client";

import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    // Check if user has previously chosen not to show the modal
    const hideModal = localStorage.getItem('hideNewsletterModal');
    if (!hideModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 40); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (dontShow) {
      localStorage.setItem('hideNewsletterModal', 'true');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter signup logic here
    console.log('Submitting email:', email);
    handleClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalOverlay') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 rubik "
      onClick={handleOutsideClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl h-[450px] w-full overflow-hidden relative flex flex-col md:flex-row bg-[url('https://demo-morata.myshopify.com/cdn/shop/files/bg_newsletterpopup_1920x.jpg?v=1699260734')] bg-cover"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <IoClose size={24} />
        </button>

        {/* Image Section */}
        <div className=" md:w-1/2 "></div>
          

        {/* Content Section */}
        <div className="p-8 md:w-1/2  flex flex-col items-start justify-center">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-md font-semibold text-gray-600">
                SIGN UP FOR OUR NEWSLETTER & PROMOTIONS!
              </h2>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                OUR NEWSLETTER
              </h1>
              <p className="text-gray-600 mt-2">
                ON YOUR NEXT PURCHASE
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <IoMdMail 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={20} 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                SUBSCRIBE
              </button>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dontShow"
                  checked={dontShow}
                  onChange={(e) => setDontShow(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="dontShow" className="text-sm text-gray-600">
                  Don't show this popup again
                </label>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsletterModal;