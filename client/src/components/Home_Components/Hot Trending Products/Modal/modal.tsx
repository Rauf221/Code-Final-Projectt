import React, { useEffect, useState } from 'react';
import { X, Heart, Share, Loader, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full w-full min-h-[200px]">
    <Loader className="w-8 h-8 animate-spin text-blue-600" />
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-full w-full min-h-[200px] text-red-500">
    <p>{message}</p>
  </div>
);

interface Product {
  _id: string;
  title: string;
  image: string;
  hoverImage: string;
}

interface ProductDetailModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product ? [product.image, product.hoverImage] : ["/api/placeholder/400/400"];

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Rest of your fetch and handlers remain the same
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId || !isOpen) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`http://localhost:2000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, isOpen]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      alert('Product added to cart successfully');
      onClose();
    } catch (err) {
      alert('Failed to add item to cart');
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        {loading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}
        
        {product && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left side - Simple Manual Slider */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right side content remains the same */}
            <div className="flex flex-col">
              {/* ... rest of your      {/* Right side - Product Details */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.title || "Apple iPad Pro M1 11-inch 2021 Wi-Fi 128GB"}</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(3)}</div>
                <span className="text-sm text-gray-500">(3 reviews)</span>
                <div className="flex items-center gap-1 ml-4">
                  <span className="text-red-500">9</span>
                  <span className="text-sm text-gray-500">sold in last 24 hours</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold">$56.00</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Availability:</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">SKU:</span>
                  <span>{product._id || "SKU123"}</span>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-6">
                <div className="flex items-center border rounded-full">
                  <button 
                    className="w-12 h-12 flex items-center justify-center text-xl"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity.toString().padStart(2, '0')}</span>
                  <button 
                    className="w-12 h-12 flex items-center justify-center text-xl"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="flex-1 h-12 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>

              <div className="flex gap-3 mb-8">
                <button className="flex items-center gap-2 px-6 h-12 border rounded-full hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                  <span>Add wishlist</span>
                </button>
                <button className="flex items-center gap-2 px-6 h-12 border rounded-full hover:bg-gray-50">
                  <LayoutGrid className="w-5 h-5" />
                  <span>Add compare</span>
                </button>
                <button className="flex items-center gap-2 px-6 h-12 border rounded-full hover:bg-gray-50">
                  <Share className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Product Details:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Bass and Stereo Sound.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Display with 3088 x 1440 pixels resolution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>Memory, Storage & SIM: 12GB RAM, 256GB.</span>
                  </li>
                </ul>
              </div>
            </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal;