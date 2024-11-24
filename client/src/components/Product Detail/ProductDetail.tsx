"use client";

import ProductPage from "./LowerSections";
import { loadStripe } from "@stripe/stripe-js";
import { Share, Heart, Eye, Truck, Mail } from "lucide-react";
import React, { useState } from "react";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { LuShip } from "react-icons/lu";
import { MdOutlineShield } from "react-icons/md";
import { TbVectorTriangle } from "react-icons/tb";
import { useCart } from "@/components/Header/HeaderTop/CardContext";


interface Product {
  id: number;
  image: string;
  hoverImage: string;
  title: string;
  category: string;
  description: string;
  price: number;
  brand: string;
  slug: string;
  reviews: number;
  rating: number;
  specifications: string[];
}

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleShopPayCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:2000/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: quantity,
            productId: product.id,
            price: product.price,
            name: product.title,
          }),
        }
      );
      const handleAddToCart = (product: Product) => {
        addToCart(product);
      };
      const session = await response.json();

      if (session.id) {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        await stripe?.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong with the checkout process.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="continer mx-auto p-4 mt-10 flex flex-col b gap-8 rubik relative ">

      <div className="flex lg:flex-row bg-white rounded-3xl  ">
      <div className="w-28 flex flex-col gap-4 pl-8 pt-10 ">
        {[
          product.image,
          product.hoverImage,
          "https://demo-morata.myshopify.com/cdn/shop/products/products_1_3.jpg?v=1697644606&width=1445",
          "https://demo-morata.myshopify.com/cdn/shop/products/products_1_5_1920x.jpg?v=1697644606",
          "https://demo-morata.myshopify.com/cdn/shop/products/products_1_4.jpg?v=1697644606&width=1445",
        ].map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(image)}
            className="w-20 h-20 border rounded-lg overflow-hidden bg-gray-50 cursor-pointer"
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex-1  ">
        <div className="aspect-square rounded-lg overflow-hidden bg-white relative">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h6v6M14 10l7-7M21 14v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full lg:w-[750px] p-10 ">
        <h1 className="text-2xl font-medium text-blue-600 mb-4">
          {product.title}
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex">
            {Array.from({
              length: Math.max(0, Math.min(5, product.rating || 0)),
            }).map((_, idx) => (
              <svg
                key={idx}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-500">({product.reviews} reviews)</span>
          <span className="flex items-center gap-1 text-red-500">
            <span className="flex items-center justify-center w-4 h-4 ">
              🔥
            </span>
            23 sold in the last 24 hours
          </span>
        </div>

        <div className="text-3xl font-bold mb-8">${product.price}</div>

        <div className="space-y-2 mb-8"></div>

        <div className="flex items-center gap-2 text-gray-600 mb-8">
          <Eye size={20} />
          <span>21 people are viewing this right now</span>
        </div>

        <div className="flex gap-4 items-center mb-4">
          <div className="flex border rounded-md">
            <button
              className="px-4 py-2 border-r"
              onClick={() => handleQuantityChange("decrease")}
            >
              -
            </button>
            <div className="px-4 py-2">{quantity}</div>
            <button
              className="px-4 py-2 border-l"
              onClick={() => handleQuantityChange("increase")}
            >
              +
            </button>
          </div>
          <button
            className=" ml-10 group shimmer-effect disabled:opacity-50 relative cursor-pointer overflow-hidden whitespace-nowrap px-40 py-4 text-white [background:var(--bg)] [border-radius:var(--radius)]  transition-all duration-300   flex justify-center"
            style={
              {
                "--spread": "90deg",
                "--shimmer-color": "#ffffff",
                "--radius": "100px",
                "--speed": "1.5s",
                "--cut": "0.1em",
                "--bg":
                  "radial-gradient(ellipse 80% 50% at 50% 120%,rgba(62, 61, 117),rgba(18, 18, 38))",
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-0 overflow-hidden" onClick={() => handleAddToCart(product)}>
              <div className="absolute inset-[-100%] rotate-gradient">
                <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))]"></div>
              </div>
            </div>
            <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"></div>
            <span className="z-10 w-48 whitespace-pre bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center text-sm font-semibold leading-none tracking-tight text-white"   >
            
              Add To CARD
            </span>
          </button>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>
              I agree with the{" "}
              <span className="underline">terms and conditions</span>
            </span>
          </label>
        </div>

        <button
          className="w-full bg-[#5F3BFF] text-white py-3 rounded-md mb-8 disabled:opacity-50"
          onClick={handleShopPayCheckout}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Buy with Shop Pay"}
        </button>

        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex gap-6">
            <button className="flex items-center gap-1">
              <Heart size={20} /> Add wishlist
            </button>
            <button className="flex items-center gap-1">
              <FaArrowsLeftRight size={20} /> Add compare
            </button>
          </div>
          <button className="flex items-center gap-1">
            <Share size={20} /> Share
          </button>
        </div>

        <div className="flex justify-between mt-8 ">
          <button className="flex items-center text-lg font-medium gap-2">
            <MdOutlineShield size={20} /> Shipping and Returns
          </button>
          <button className="flex items-center gap-2">
            <Mail size={20} /> Contact us
          </button>
        </div>
        <div className="flex flex-col mt-5">
          <div className="mt-2 text-sm text-gray-500 mb-4">
            <p className="flex gap-2 items-center ">
              <LuShip size={24} />
              <span className="font-medium text-base text-[#777777]">
                Estimated Delivery:
              </span>{" "}
              <span className="text-black font-medium">Nov 27 - Dec 01</span>
            </p>
            <p className="text-base text-[#777777] font-medium flex gap-1 mt-2">
              <span className="font-meidum text-[#777777] flex items-center gap-2 ">
                {" "}
                <TbVectorTriangle size={24} /> Return
              </span>{" "}
              within
              <span className=" text-black font medium ">30 days</span> of
              purchase. Taxes are non-refundable.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-1 text-base border-t pt-4">
              <div className="flex gap-[16px]  font-normal">
                <span className="text-[#777777]">Availability:</span>
                <span className="text-green-600">In Stock</span>
              </div>
              <div className="flex gap-[70px] font-normal">
                <span className="text-[#777777]">SKU:</span>
                <span className="text-[#424242]">N/A</span>
              </div>
              <div className="flex gap-[46px] font-normal">
                <span className="text-[#777777]">Vendor:</span>
                <span className="text-[#424242] hover:text-[#2CC0DD] transition-color duration-500">
                  Apple
                </span>
              </div>
              <div className="flex gap-[16px] font-normal">
                <span className="text-[#777777]">Categories:</span>
                <span className="text-[#424242]  ">
                  <span className="hover:text-[#2CC0DD] transition-color duration-500">
                    Best Selling
                  </span>
                  ,{" "}
                  <span className=" hover:text-[#2CC0DD] transition-color duration-500">
                    Featured Products
                  </span>
                </span>
              </div>
              <div className="flex gap-[64px] font-normal">
                <span className="text-[#777777]">Tags:</span>
                <span className="text-[#424242]">Smart Phones & Tablets</span>
              </div>
            </div>
          </div>

          <div className="px-6 bg-[#F7F7F9] text-center pb-16 pt-5 mt-8">
            <h2 className="text-lg font-medium text-gray-700">
              Guarantee safe & Secure checkout
            </h2>
            <div className="flex flex-wrap mt-4 gap-2">
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/amazon-92e856f82cae5a564cd0f70457f11af4d58fa037cf6e5ab7adf76f6fd3b9cafe.svg"
                alt="Visa"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/american_express-12858714bc10cdf384b62b8f41d20f56d8c32c1b8fed98b662f2bfc158dcbcf0.svg"
                alt="MasterCard"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/apple_pay-f6db0077dc7c325b436ecbdcf254239100b35b70b1663bc7523d7c424901fa09.svg"
                alt="PayPal"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/bitcoin-e41278677541fc32b8d2e7fa41e61aaab2935151a6048a1d8d341162f5b93a0a.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/dankort-a92b320b417b7c123265e1e4fe134935ac76ec7e297be9b02a5ef76b182a29cc.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/diners_club-16436b9fb6dd9060edb51f1c7c44e23941e544ad798282d6aef1604319562fba.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/discover-cc9808e50193c7496e7a5245eb86d5e06f02e2476c0fe70f2c40016707d35461.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/dogecoin-40c07eb6559d1c47a2ac893d14a4d27cdfad770df3413fb3e49ab51a18c8961d.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/dwolla-afe7aa3f31ed9f5aaf470e495448ee3f17a139aa8692a50d117571174726ce8d.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/forbrugsforeningen-99ffce51f2e166271aa285e1497d7feecec72a562c2b97298e6bc3504931f99d.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/google_pay-c66a29c63facf2053bf69352982c958e9675cabea4f2f7ccec08d169d1856b31.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/jcb-ab0f5a1739704f1ab039f19ac8c28895af5c39a3f54ee9b748ea051986b0bd36.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/klarna-389801c6056cb5600b4f05f72ebc2c58e4947688c6c4f5e6ccea41f7973d3a28.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/litecoin-06f10bf73578fe346f5b2817673102b77c19ea71ebe05b2839495975651657c0.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/maestro-d2055c6b416c46cf134f393e1df6e0ba31722b623870f954afd392092207889c.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/paypal-49e4c1e03244b6d2de0d270ca0d22dd15da6e92cc7266e93eb43762df5aa355d.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/shopify_pay-957a48d1202dc65a7890b292de764ee886f7e64cea486ae82e291e9dc824c914.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/sofort-1878a1e07e646284b3d37f2f7026f3b1e21c359a4f0a6af5a2186748fe8d2f0d.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
              <img
                src="https://demo-morata.myshopify.com/cdn/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg"
                alt="Apple Pay"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
       
      </div>
      </div>
      <ProductPage />
    </div>
  );
};

export default ProductDetailClient;
