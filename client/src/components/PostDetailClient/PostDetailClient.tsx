"use client";

import React, { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTelegram,
  FaTumblr,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface Post {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  slug: string;
}

interface PostDetailClientProps {
  post: Post;
}

const PostDetailClient: React.FC<PostDetailClientProps> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:2000/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...commentData, postSlug: post.slug }),
      });

      if (response.ok) {
        alert("Comment submitted successfully!");
        setCommentData({ name: "", email: "", comment: "" });
      } else {
        alert("Failed to submit the comment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
      
      <div className=" mx-auto px-4 py-10 rubik">
          <div className="  flex flex-col justify-center text-gray-700">
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover rounded-lg mb-6"
            />

            <div className="container flex justify-center">
              <div className="w-[1100px] flex flex-col ">
                {/* Category and Title */}
                <h3 className="uppercase text-sm text-cyan-500 mb-2">
                  {post.category}
                </h3>
                <h1 className="text-3xl font-medium mb-4">{post.title}</h1>

                {/* Meta Information */}
                <div className="text-xs font-medium text-gray-500 mb-6">
                  <span className="mr-4">POST DATE: {post.date}</span>
                  <span>POST BY {post.author}</span>
                </div>
                {/* Description */}
                <p className="text-lg leading-relaxed  w-[1100px] mt-10 text-[#777777]">
                  iPad Pro is the fastest device of its kind. It’s designed to
                  take full advantage of next‑level performance and custom
                  technologies like the advanced image signal processor and
                  unified memory architecture of M1. And with the incredible
                  power efficiency of M1.
                </p>
                <p className=" text-lg leading-relaxed  w-[1100px] mt-20 text-[#777777]">
                  Faster performance and graphics. The 8‑core CPU of M1 delivers
                  up to 50 percent faster performance. And M1 has an 8‑core GPU
                  in a class of its own, providing up to 40 percent faster
                  graphics performance to iPad Pro. So you can build intricate
                  AR models, play games with console quality graphics at high
                  frame rates, and more. Unika is a mouth blown an series of
                  small, glass pendant lamps, originally designed for the
                  restaurant. Best and brightest. Liquid Retina XDR display.
                </p>
              </div>
            </div>
          </div>
          <div className=" container flex justify-center  ">
            {/* Inspirational Quote */}
            <div className="bg-[#F1F5F6] p-7 mt-20 rounded-2xl flex flex-col items-center  w-[600px] border ">
              <blockquote className="text-xl text-center text-[#777777] leading-normal font-medium">
                “ We are content to rest in peace, when the whole universe is
                changing every second. Take the opportunity because
                opportunities don't come twice ”
              </blockquote>
              <p className="block text-right mt-5 font-medium text-xl   text-gray-500 ">
                MICHAEL ANTHONY
              </p>
            </div>
          </div>
          <div className=" container flex justify-center ">
            <div className=" w-[1100px] ">
              <p className=" text-lg leading-relaxed  w-[1100px] mt-20 text-[#777777]">
                iPad has always been uniquely portable with superfast Wi‑Fi and
                cellular options. Now with 5G capabilities, you can connect to
                the fastest wireless networks when you need to download files,
                stream movies, collaborate with colleagues, and upload content
                on the go. And iPad Pro has the most 5G bands of any device of
                its kind — so it can get 5G in more places. Form is an armless
                modern with a minimalistic expression. With a simple and
                contemporary design form Foody has a soft and welcoming
                silhouette and a distinctly residential look. The legs appear
                almost as if they are growing out of the shell.
              </p>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Left Image */}
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://cdn.shopify.com/s/files/1/0687/1177/6541/files/blog_1.jpg?v=1675850948"
                  alt="Left Image"
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Right Image */}
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://cdn.shopify.com/s/files/1/0687/1177/6541/files/blog_2.jpg?v=1675850948"
                  alt="Right Image"
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
          <div className=" container flex justify-center ">
            <div className=" w-[1100px] ">
              <p className=" text-lg leading-relaxed  w-[1100px] mt-20 text-[#777777]">
                The Magic Keyboard is an amazing companion for iPad Pro and iPad
                Air. It features a great typing experience, a trackpad that
                opens up new ways to work with iPadOS, a USB‑C port for
                pass‑through charging, and front and back protection. The Magic
                Keyboard features a floating cantilever design, allowing you to
                attach it magnetically and smoothly adjust it to the perfect
                viewing angle for you.
              </p>
            </div>
          </div>
          <div className=" container flex justify-center ">
            <div className=" w-[1100px] ">
              <p className=" text-lg leading-relaxed  w-[1100px] mt-20 text-[#777777]">
                Magic Keyboard. Apple Pencil. Endless possibilities. Pro
                accessories. Apple Pencil, Magic Keyboard, and the Smart
                Keyboard Folio open up even more ways to use iPad Pro. Draw a
                masterpiece, take notes, or knock out a business plan. These
                versatile accessories are designed to take your work and
                creativity to the next level. Apple Pencil. With the power of
                Apple Pencil, iPad Pro transforms into an immersive drawing
                canvas and the world’s best note‑taking device. It sets the
                standard for how drawing, marking up documents, and even filling
                in text fields should feel — intuitive, precise, and magical.
              </p>
            </div>
          </div>
          <div className=" container flex justify-center ">
            <div className=" w-[1100px] flex justify-between mt-10 items-center py-4 border-b pb-8">
              {/* Tags Section */}
              <div className="flex space-x-2">
                <span className="px-3 py-2 hover:bg-[#16BCDC] hover:text-white border rounded-sm  tansition-colors duration-700 text-[#777777] text-sm">
                  airpods
                </span>
                <span className="px-3 py-2 hover:bg-[#16BCDC]   hover:text-white border rounded-sm tansition-colors duration-700 text-[#777777] text-sm">
                  amazing
                </span>
                <span className="px-3 py-2 hover:bg-[#16BCDC]  hover:text-white border rounded-sm  tansition-colors duration-700 text-[#777777] text-sm">
                  bootstrap
                </span>
                <span className="px-3 py-2 hover:bg-[#16BCDC]   hover:text-white border rounded-sm tansition-colors duration-700 text-[#777777] text-sm">
                  business
                </span>
              </div>

              {/* Social Icons Section */}
              <div className="flex space-x-2">
                <a href="#" className="bg-blue-700 h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75 ">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="bg-blue-600 h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75">
                  <FaFacebookF />
                </a>
                <a href="#" className="bg-blue-400  h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-red-600 h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75">
                  <MdEmail />
                </a>
                <a href="#" className="bg-red-500  h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75">
                  <FaPinterestP />
                </a>
                <a href="#" className="bg-blue-900 h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75">
                  <FaTumblr />
                </a>
                <a href="#" className="bg-blue-500 h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75">
                  <FaTelegram />
                </a>
                <a href="#" className="bg-green-500  h-10 w-10 flex items-center justify-center rounded-full text-white hover:opacity-75">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

      {/* Comment Form */}
      <div className="container mx-auto w-[1100px] py-8">
        <h2 className="text-xl font-bold mb-4">LEAVE A COMMENT</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={commentData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={commentData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none"
              required
            />
          </div>
          <textarea
            name="comment"
            value={commentData.comment}
            onChange={handleInputChange}
            placeholder="Comment"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className={`uppercase rounded-sm text-sm w-[200px] text-white px-6 py-3 transition-all duration-700 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-[#16BCDC]"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetailClient;
