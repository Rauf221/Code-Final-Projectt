"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/HeaderTop/header";
import NavBar from "@/components/Header/headerSticky";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaSnapchatGhost,
  FaTiktok,
  FaTumblr,
  FaTwitter,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";


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

const BlogLayout = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/posts/");
        setPosts(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  const tags = [
    { id: 1, name: "airpods", count: 12 },
    { id: 2, name: "amazing", count: 8 },
    { id: 3, name: "bootstrap", count: 15 },
    { id: 4, name: "business", count: 10 },
    { id: 5, name: "clean design", count: 20 },
    { id: 6, name: "electronic", count: 18 },
    { id: 7, name: "Gamers", count: 25 },
    { id: 8, name: "iPad Pro", count: 14 },
  ];
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isChecked) {
      alert("Please agree to the terms & conditions.");
      return;
    }
    alert(`Subscribed successfully with email: ${email}`);
    setEmail("");
    setIsChecked(false);
  };

  return (
    <>
      <Header />
      <NavBar />
      <div className="py-10 flex rubik">
        <div className="container mx-auto flex gap-3">
          <div className="flex flex-col w-[23%] pt-4 border-r pr-10 ">
            <div className="relative w-full">
              <input
                type="text"
                className="border outline-none p-3 ml-3 pr-16 text-start"
                placeholder="Search..."
              />
              <IoSearch
                className="absolute text-thin right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            <div className="bg-white w-full p-4">
              <h3 className="font-medium text-xl mb-1">Social</h3>
              <div className="h-[2px] w-full bg-gray-300 mb-3">
                <div className="h-[2px] w-[30%] bg-[#16BCDC]"></div>
              </div>
              <div className="flex gap-3 pt-2 flex-wrap">
                <div className="text-white rounded-sm bg-cyan-500 h-10 w-10 flex items-center justify-center">
                  <FaTwitter size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#3C5B9B] h-10 w-10 flex items-center justify-center">
                  <FaFacebookF size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#E92E2E] h-10 w-10 flex items-center justify-center">
                  <FaPinterestP size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#203864] h-10 w-10 flex items-center justify-center">
                  <FaTumblr size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#F6EA3C] h-10 w-10 flex items-center justify-center">
                  <FaSnapchatGhost size={20} />
                </div>
                <div className="text-black border rounded-sm bg-white h-10 w-10 flex items-center justify-center">
                  <FaTiktok size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg mt-4">
              <h3 className="font-medium text-xl mb-1">Categories</h3>
              <div className="h-[2px] w-full bg-gray-300 mb-5">
                <div className="h-[2px] w-[30%] bg-[#16BCDC]"></div>
              </div>
              <ul className="space-y-2 text-xs font-medium">
                <li className="flex gap-3">
                  <span>Technology</span>
                  <span className="text-[#919BA1]">(06)</span>
                </li>
                <li className="flex gap-3 ">
                  <span>Furniture</span>
                  <span className="text-[#919BA1]">(10)</span>
                </li>
                <li className="flex gap-3">
                  <span>Makeup</span>
                  <span className="text-[#919BA1]">(06)</span>
                </li>
                <li className="flex gap-3">
                  <span>Tools</span>
                  <span className="text-[#919BA1]">(04)</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg mt-4">
              <h3 className="font-medium text-xl mb-1">Recent Posts</h3>
              <div className="h-[2px] w-full bg-gray-300 mb-5">
                <div className="h-[2px] w-[30%] bg-[#16BCDC]"></div>
              </div>
              <div className="space-y-10">
                {posts.slice(0, 4).map((post) => (
                  <div key={post.id} className="flex gap-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className=" flex flex-col justify-evenly">
                      <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
                      <p className="text-gray-400 text-xs mt-2">Oct 25 2023</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full max-w-md pt-6">
                <h2 className="text-xl font-medium mb-2 relative">
                  Tags Cloud
                </h2>
                <div className="h-[2px] w-full bg-gray-300 mb-5">
                  <div className="h-[2px] w-[30%] bg-[#16BCDC]"></div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      className="px-2 py-2  text-[#7B7777]  text-sm
                     hover:bg-[#16BCDC] transition-colors duration-500
                     border border-gray-200 hover:text-white hover:rounded-sm"
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className=" w-full bg-white mt-10">
                <h2 className="text-xl font-medium mb-2">Newsletter</h2>
                <div className="h-[2px] w-full bg-gray-300 mb-5">
                <div className="h-[2px] w-[30%] bg-[#16BCDC]"></div>
              </div>
                <p className=" text-xs font-medium mb-4 text-[#7B7777]">
                  Subscribe to our newsletter and get our newest updates right
                  in your inbox.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      className="mr-2"
                    />
                    <label htmlFor="terms" className=" text-sm font-medium text-[#7B7777]">
                      I agree to the terms & conditions
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black  text-white py-3 hover:bg-[#16BCDC] transition duration-300"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="w-[80%]">
            <div className="grid grid-cols-1  pl-14 p-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? [...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg overflow-hidden"
                    >
                      <Skeleton height={200} />
                      <div className="p-4">
                        <Skeleton count={3} height={20} />
                        <Skeleton width="50%" height={15} />
                      </div>
                    </div>
                  ))
                : posts.map((post) => (
                    <Link
                      legacyBehavior
                      key={post.id}
                      href={`/blog/${post.slug}`}
                    >
                      <a>
                        <div className="bg-white rounded-lg overflow-hidden">
                          <div className="relative">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-52 rounded-md object-cover"
                            />
                            <span className="absolute text-xs top-3 p-1 px-2 bg-[#16BCDC] rounded-sm left-3 text-white uppercase font-semibold">
                              {post.category}
                            </span>
                          </div>
                          <div className="p-4">
                            <h2 className="text-md font-medium mt-2">
                              {post.title}
                            </h2>
                            <p className="text-md text-gray-600 mt-5 line-clamp-4">
                              {post.description}
                            </p>
                            <div className="text-gray-400 text-xs mt-4 flex justify-between items-center">
                              <span>POST BY {post.author}</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogLayout;
