"use client";

import { useState } from "react";

export default function FAQS() {
  const items = [
    {
      id: 1,
      title: "How do I know if my order was successful?",
      content:
        "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 2,
      title: "How do I know if my order was successful??",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      title: "Vestibulum a lorem placerat, porttitor urna vel?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 4,
      title: "Pellentesque habitant morbi tristique senectus et netus?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 5,
      title: "Nam pellentesque aliquam metus?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  const items2 = [
    {
      id: 6,
      title: "How do I know if my order was successful?",
      content:
        "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 7,
      title: "How much is shipping and how long will it take?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 8,
      title: "Pellentesque habitant morbi tristique senectus et netus?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 9,
      title: "How long will it take to get my package?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 10,
      title: "Branding is simply a more efficient way to sell things?",
      content:
      "The perfect  to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  const items3 = [
    {
      id: 11,
      title: "How do I know if my order was successful?",
      content:
        "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 12,
      title: "How much is shipping and how long will it take?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 13,
      title: "Pellentesque habitant morbi tristique senectus et netus?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    
  ];
  const items4 = [
    {
      id: 14,
      title: "How do I know if my order was successful?",
      content:
        "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 15,
      title: "How much is shipping and how long will it take?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 16,
      title: "Pellentesque habitant morbi tristique senectus et netus?",
      content:
      "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    
    {
        id: 17,
        title: "Nam pellentesque aliquam metus?",
        content:
        "The perfect way to enjoy brewing tea on low hanging fruit to identify. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. For me, the most important part of improving at photography has been sharing it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      
  ];


  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  const toggleAccordion = (id: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      <div className="flex flex-col items-center space-y-2  rubik pb-10">
        <h1 className="text-3xl font-semibold">FAQs</h1>
        <nav className="text-sm text-gray-600">
          <a href="/home" className="hover:underline cursor-pointer">
            Home
          </a>{" "}
          <span className="mx-2">/</span> FAQs
        </nav>
      </div>
      <div className="flex justify-center relative  ">
        <div className="container mx-auto max-w-[1500px] px-4">
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1 sticky top-[40px] h-screen self-start overflow-y-auto">
              <div className="space-y-1 border rounded-2xl px-6 py-2 font-semibold">
                <button className="w-full py-2 border-b rounded text-left">
                  Shipping Information
                </button>
                <button className="w-full py-2 border-b rounded  text-left">
                  Payment Information
                </button>
                <button className="w-full py-2 border-b rounded  text-left">
                  Order and Returns
                </button>
                <button className="w-full py-2 rounded  text-left">
                  Ordering from Orfarm
                </button>
              </div>
            </div>

            <div className="pl-10 col-span-3  border-l">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  HOW CAN WE HELP YOU?
                </h2>
                <p className="mb-4 text-[#777777]">
                  Returns are free for orders shipped within the U.S. We include
                  a UPS return label in every package which is at no cost to
                  use.
                </p>
                <p className="mb-4 text-[#777777]">
                  Follow the steps below for a seamless returns process:
                </p>
                <ul className=" ml-6 mb-4 text-[#777777]">
                  <li>
                  - Please indicate a reason for return using one of the Return
                    Codes listed on the order form included in your package.
                  </li>
                  <li>
                  - Attach your UPS return label to the outside of the package.
                    There is no cost to use this label.
                  </li>
                  <li>
                  - Please make note of your tracking number so that you are
                    able to track it on its way back to us.
                  </li>
                </ul>
                <p className="mb-4 text-[#777777]">
                  You will receive an email once your return has been processed.
                  Please allow 06 - 12 business days from the time your package
                  arrives back to us for a refund to be issued.
                </p>
              </div>
              <div className="h-[1px] w-full bg-gray-200 mb-8 mt-8"></div>
              <div>
                 <div>
                <h2 className="text-xl font-bold mb-4 uppercase">
                  Shopping information
                </h2>
                 </div>
                <div className="flex ">
                  <ul className=" pr-2 w-[100%]">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="mb-5 bg-white  rounded-lg  overflow-hidden"
                      >
                        <div
                          onClick={() => toggleAccordion(item.id)}
                          className="flex justify-between items-center  border-b py-2 cursor-pointer  transition-colors"
                        >
                          <h3 className="text-md  font-medium text-[#777777] hover:text-[#16BCDC] transition-color duration-500">
                            {item.title}
                          </h3>
                          <button
                            className="text-gray-500 text-2xl hover:text-gray-700 focus:outline-none"
                            aria-label="Toggle"
                          >
                            {openStates[item.id] ? "-" : "+"}
                          </button>
                        </div>

                        <div
                          className={`px-1 transition-all duration-300 ease-in-out overflow-hidden ${
                            openStates[item.id]
                              ? "max-h-40 opacity-100 py-4"
                              : "max-h-0 opacity-0 py-0"
                          }`}
                        >
                          <p className="text-gray-600 text-base">
                            {item.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-200 mb-8 mt-4"></div>
              <div>
                 <div>
                <h2 className="text-xl font-bold mb-4 uppercase">
                Payment information
                </h2>
                 </div>
                <div className="flex ">
                  <ul className=" pr-2 w-[100%]">
                    {items2.map((item) => (
                      <li
                        key={item.id}
                        className="mb-5 bg-white  rounded-lg  overflow-hidden"
                      >
                        <div
                          onClick={() => toggleAccordion(item.id)}
                          className="flex justify-between items-center  border-b py-2  cursor-pointer  transition-colors"
                        >
                          <h3 className="text-md font-medium text-[#777777] hover:text-[#16BCDC] transition-color duration-500">
                            {item.title}
                          </h3>
                          <button
                            className="text-gray-500 text-2xl hover:text-gray-700 focus:outline-none"
                            aria-label="Toggle"
                          >
                            {openStates[item.id] ? "-" : "+"}
                          </button>
                        </div>

                        <div
                          className={`px-1 transition-all duration-300 ease-in-out overflow-hidden ${
                            openStates[item.id]
                              ? "max-h-40 opacity-100 py-4"
                              : "max-h-0 opacity-0 py-0"
                          }`}
                        >
                          <p className="text-gray-600 text-base">
                            {item.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-200 mb-8 mt-4"></div>
              <div>
                 <div>
                <h2 className="text-xl font-bold mb-4 uppercase">
                Order & Returns
                </h2>
                 </div>
                <div className="flex ">
                  <ul className=" pr-2 w-[100%]">
                    {items3.map((item) => (
                      <li
                        key={item.id}
                        className="mb-5 bg-white  rounded-lg  overflow-hidden"
                      >
                        <div
                          onClick={() => toggleAccordion(item.id)}
                          className="flex justify-between items-center  border-b py-2  cursor-pointer  transition-colors"
                        >
                          <h3 className="text-md font-medium text-[#777777] hover:text-[#16BCDC] transition-color duration-500">
                            {item.title}
                          </h3>
                          <button
                            className="text-gray-500 text-2xl hover:text-gray-700 focus:outline-none"
                            aria-label="Toggle"
                          >
                            {openStates[item.id] ? "-" : "+"}
                          </button>
                        </div>

                        <div
                          className={`px-1 transition-all duration-300 ease-in-out overflow-hidden ${
                            openStates[item.id]
                              ? "max-h-40 opacity-100 py-4"
                              : "max-h-0 opacity-0 py-0"
                          }`}
                        >
                          <p className="text-gray-600 text-base">
                            {item.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="h-[1px] w-full bg-gray-200 mb-8 mt-4"></div>
              <div>
                 <div>
                <h2 className="text-xl font-bold mb-4 uppercase">
                Ordering from Gosto
                </h2>
                 </div>
                <div className="flex ">
                  <ul className=" pr-2 w-[100%]">
                    {items4.map((item) => (
                      <li
                        key={item.id}
                        className="mb-5 bg-white  rounded-lg  overflow-hidden"
                      >
                        <div
                          onClick={() => toggleAccordion(item.id)}
                          className="flex justify-between items-center  border-b py-2  cursor-pointer  transition-colors"
                        >
                          <h3 className="text-md font-medium text-[#777777] hover:text-[#16BCDC] transition-color duration-500">
                            {item.title}
                          </h3>
                          <button
                            className="text-gray-500 text-2xl hover:text-gray-700 focus:outline-none"
                            aria-label="Toggle"
                          >
                            {openStates[item.id] ? "-" : "+"}
                          </button>
                        </div>

                        <div
                          className={`px-1 transition-all duration-300 ease-in-out overflow-hidden ${
                            openStates[item.id]
                              ? "max-h-40 opacity-100 py-4"
                              : "max-h-0 opacity-0 py-0"
                          }`}
                        >
                          <p className="text-gray-600 text-base">
                            {item.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
