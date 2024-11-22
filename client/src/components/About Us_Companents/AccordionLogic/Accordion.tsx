"use client";
import { useState } from "react";

const AccordionSection = () => {
  const items = [
    {
      id: 1,
      title: "Problems sending or receiving messages?",
      content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      id: 2,
      title: "Problems sending or receiving messages?",
      content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      id: 3,
      title: "Problems sending or receiving messages?",
      content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      id: 4,
      title: "Problems sending or receiving messages?",
      content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      id: 5,
      title: "Problems sending or receiving messages?",
      content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
   
    
  ];
  const items1 = [
    {
        id: 6,
        title: "Problems sending or receiving messages?",
        content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      },
      {
        id: 7,
        title: "Problems sending or receiving messages?",
        content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      },
      {
        id: 8,
        title: "Problems sending or receiving messages?",
        content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      },
      {
        id: 9,
        title: "Problems sending or receiving messages?",
        content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      },
      {
        id: 10,
        title: "Problems sending or receiving messages?",
        content: "Curabitur lacinia purus vitae lorem porttitor fermentum. In in mattis erat mattis libero. Donec volutpat faucibus elit cursus interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      },
    ];


  const [openStates, setOpenStates] = useState<{[key: number]: boolean}>({});

  const toggleAccordion = (id: number) => {
    setOpenStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-gray-100 py-10 w-full rubik">
      {/* Section Header */}
      <div className="text-center mb-8 px-6">
        <h2 className="text-md font-medium mb-2 text-[#16BCDC] uppercase">
          Why Choose Us
        </h2>
        <h1 className="text-3xl font-medium uppercase text-gray-900">
        Text column with image
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos vel pretium
        lectus qua. Nunc id cursus metus ididunt ut labore metus episcing.
        </p>
      </div>

      {/* Accordion Items */}
      <div className="flex ">
      <ul className="mx-auto pl-4 pr-2 w-[50%]">
        {items.map((item) => (
          <li 
            key={item.id} 
            className="mb-5 bg-white  rounded-lg  overflow-hidden"
          >
            <div
              onClick={() => toggleAccordion(item.id)}
              className="flex justify-between items-center px-8 py-4 cursor-pointer  transition-colors"
            >
              <h3 className="text-md font-medium text-gray-800 hover:text-[#16BCDC] transition-color duration-500">
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
              className={`px-4 transition-all duration-300 ease-in-out overflow-hidden ${
                openStates[item.id] ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
              }`}
            >
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className="mx-auto pr-4 pl-2 w-[50%]">
        {items1.map((item) => (
          <li 
            key={item.id} 
            className="mb-5 bg-white  rounded-lg  overflow-hidden"
          >
            <div
              onClick={() => toggleAccordion(item.id)}
              className="flex justify-between items-center px-8 py-4  cursor-pointer  transition-colors"
            >
              <h3 className="text-md font-medium text-gray-800 hover:text-[#16BCDC] transition-color duration-500">
                {item.title}
              </h3>
              <button
                className="text-gray-500  text-2xl hover:text-gray-700 focus:outline-none"
                aria-label="Toggle"
              >
                {openStates[item.id] ? "-" : "+"}
              </button>
            </div>

            <div
              className={`px-4 transition-all duration-300 ease-in-out overflow-hidden ${
                openStates[item.id] ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
              }`}
            >
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default AccordionSection;