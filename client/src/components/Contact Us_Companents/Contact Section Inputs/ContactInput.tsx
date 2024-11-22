"use client";

import axios from "axios";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaSnapchatGhost,
  FaTiktok,
  FaTumblr,
  FaTwitter,
} from "react-icons/fa";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        message: ""
      });
      const [loading, setLoading] = useState(false);
      const [status, setStatus] = useState({
        type: "",
        message: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });
    
        try {
          const response = await axios.post('http://localhost:2000/api/contacts', formData);
          
          setStatus({
            type: 'success',
            message: 'Message sent successfully!'
          });
          
          // Reset form after successful submission
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            message: ""
          });
        } catch (error) {
          setStatus({
            type: 'error',
            message: axios.isAxiosError(error) && error.response?.data?.message ? error.response.data.message : 'Something went wrong'
          });
        } finally {
          setLoading(false);
        }
      };
  return (
    <div className="container max-w-1500px py-10 rubik p-3">
    <div className=" grid grid-cols-1 md:grid-cols-2  gap-10">
      {/* Left Side - Form */}
      <div>
        <h2 className="text-2xl font-medium mb-4">Get In Touch</h2>
        <p className="text-gray-600 mb-6">
          Your email address will not be published. Required fields are marked
          *
        </p>
        {status.message && (
          <div className={`
            mb-4 p-3 rounded 
            ${status.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
            }
          `}>
            {status.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name *"
              className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:ring-[0.05rem] focus:ring-black"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:ring-[0.05rem] focus:ring-black"
              required
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number *"
              className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:ring-[0.05rem] focus:ring-black"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message *"
              rows={7}
              className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:ring-[0.05rem] focus:ring-black"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`
                uppercase rounded-sm text-sm w-[200px] text-white px-6 py-3 
                transition-all duration-700
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-[#16BCDC]'
                }
              `}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
        </div>
        {/* Right Side - Contact Info */}
        <div>
          <h2 className="text-2xl font-medium mb-4 rubik">Contact Information</h2>
          <p className="text-gray-600 mb-6">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra
            per inceptos pretium.
          </p>
          <ul className="space-y-2 ">
            <li className=" flex flex-col gap-2 text-sm text-[#505A67]">
              <p className=" text-black font-medium text- uppercase">Location Store:</p> 268 St, South New York/NY 98944,
              United States.
            </li>
            <li className=" flex flex-col gap-2 text-sm text-[#505A67] ">
              <p className=" text-black font-medium mt-2 uppercase">Work Time:</p> Monday - Friday: 9:00-20:00 <br />
              Saturday: 11:00 - 15:00
            </li>
            <li className="flex flex-col  text-sm ">
              <p className=" text-black font-medium  mt-2 uppercase">Phone Number:</p> <p className=" mt-2 hover:text-[#25C0DD] transition-all duration-500 text-base ">212 654 3322</p> <p className=" text-base hover:text-[#25C0DD] transition-all duration-500">
              (+100)
              666-456-7890
              </p>
            </li>
            <li className="flex flex-col  text-sm ">
              <p className=" text-black mt-4 font-medium text- uppercase">Email Address:</p> <p className="mt-2 text-base hover:text-[#25C0DD] transition-all duration-500  ">aloshopify@alothemes.com </p> <p className="text-base hover:text-[#25C0DD] transition-all duration-500  ">aloshopify@alothemes.com </p>
            </li>
          </ul>
          {/* Social Icons */}

          <div className=" pt-5 "> 
            <div className=" "> 
                <span className="uppercase font-medium">
                 Social Accounts:
                </span>
            </div>
            <div className="flex space-x-3 pt-2 ">
              <div className="text-white rounded-sm bg-cyan-500 h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaTwitter size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#3C5B9B] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaFacebookF size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#E92E2E] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaPinterestP size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#203864] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaTumblr size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#F6EA3C] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaSnapchatGhost size={20} />
              </div>
              <div className="text-black rounded-sm bg-white h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaTiktok size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
