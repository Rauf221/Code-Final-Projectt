"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Share, Heart, Eye, Truck, Mail } from "lucide-react";
import React, { useState } from "react";
import { FaArrowsLeftRight } from "react-icons/fa6";

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

      const session = await response.json();

      if (session.id) {
        // Redirect to Stripe Checkout
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
    <div className="continer mx-auto p-10 flex flex-col lg:flex-row gap-8 rubik">
      {/* Left side - Product Images */}
      <div className="w-24 flex flex-col gap-4">
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

      {/* Main Product Image */}
      <div className="flex-1">
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

      {/* Right side - Product Details */}
      <div className="w-full lg:w-[700px]">
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
            <span className="inline-block w-4 h-4">🔥</span>
            23 sold in the last 24 hours
          </span>
        </div>

        <div className="text-3xl font-bold mb-8">${product.price}</div>

        <div className="space-y-2 mb-8"></div>

        <div className="flex items-center gap-2 text-gray-600 mb-8">
          <Eye size={20} />
          <span>21 people are viewing this right now</span>
        </div>

        {/* Quantity and Add to Cart */}
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
          <button className="flex-1 bg-gray-900 text-white py-3 rounded-md">
            ADD TO CART
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

        {/* Additional Actions */}
        <div className="flex items-center justify-between border-t pt-4">
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

        {/* Footer Actions */}
        <div className="flex justify-between mt-8">
          <button className="flex items-center gap-2">
            <Truck size={20} /> Shipping and Returns
          </button>
          <button className="flex items-center gap-2">
            <Mail size={20} /> Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
