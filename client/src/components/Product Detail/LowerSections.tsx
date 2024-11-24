
"use client";

import { useState } from "react";
import ProductSpecifications from "./Components/AdditionalInfo";
import ShippingReturn from "./Components/ShippingReturn";
import CustomerReviews from "./Components/reviews";

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { name: "DESCRIPTION", id: "description" },
    { name: "ADDITIONAL INFORMATION", id: "additionalInfo" },
    { name: "SHIPPING & RETURN", id: "shippingReturn" },
    { name: "REVIEWS", id: "reviews" },
  ];

  return (
    <div className= "bg-white rounded-3xl  ">
      <div className="container mx-auto py-10 px-6 rounded-3xl flex flex-col justify center items-center">
        <div className="border-b border-gray-200 w-full flex justify-center  ">
          <nav className="flex space-x-6   ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`pb-3 text-lg font-medium ${
                  activeTab === tab.id
                    ? "text-[#16BCDC] border-b-2 border-[#16BCDC]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <div className=" w-full">
              <p className="text-gray-700 text-sm">
                iPad Air with a vibrant 10.9-inch Liquid Retina display.
                Breakthrough Apple M1 chip for faster performance, making iPad
                Air super-powerful for creativity and mobile gaming. Get Touch
                ID, an advanced camera, lightning-fast 5G2 and Wi-Fi 6, a USB-C
                port, and support for the Magic Keyboard and Apple Pencil (2nd
                generation).
              </p>
              <img
                src="https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_1.jpg?v=1699289844"
                alt="iPad"
                className="mt-4 rounded-lg"
              />
             <div className="mt-10 mb-10 ml-2">
             <span className="font-medium uppercase pt-10 pb-10">
              Work wonders With ease
              </span>
             <p className=" leading-relaxed mt-10">
             Work wonders With ease
There are so many things you can do with iPad and all the amazing apps designed for it. Now App Library automatically organizes those apps for you. And new widgets let you see information at a glance, right on your Home Screen. iPad is the world’s best note-taking device. And now Notes goes system‑wide with Quick Note, a fast and easy way to get to a note no matter what you’re doing. Highlight text in Safari or add a link from an app, and you’ll see a Quick Note thumbnail next time you visit the site, taking you right to what you were viewing before. And if you make a Quick Note on your iPad, it will be on your iPhone and Mac.

             </p>
             </div>
             <div className=" flex w-full justify-center gap-2 ">
                <img src="https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_2.jpg?v=1699289845" className="w-[465px] h-[450px]" alt="" />
                <img src="https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_3.jpg?v=1699289844"  className="w-[465px] h-[450px]" alt="" />
                <img src="https://cdn.shopify.com/s/files/1/0836/9845/0750/files/img_content_4.jpg?v=1699289844"  className="w-[465px] h-[450px]" alt="" />
             </div>
             <div className="mt-10  ml-2">
                <span className="font-medium uppercase pt-10 pb-10">Product supreme quality</span>
                <p className="leading-relaxed mt-10"> 
                Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
             </div>
            </div>
          )}
          {activeTab === "additionalInfo" && (
            <ProductSpecifications/>
          )}
          {activeTab === "shippingReturn" && (
            <ShippingReturn/>
          )}
          {activeTab === "reviews" && (
          <CustomerReviews/>
          )}
        </div>
      </div>
    </div>
  );
}
