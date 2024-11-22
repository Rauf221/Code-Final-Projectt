"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Edit, PlusCircle } from 'lucide-react';
import { useDarkMode } from '@/DarkMode/Darkmode';


export default function RecommendedProductManagementTable() {
    const { darkMode, toggleDarkMode } = useDarkMode();
  interface Product {
    _id: string;
    title: string;
    price: string;
    oldPrice: string;
    discount: number;
    image: string;
    hoverImage: string;
    slug: string;
    reviews: number;
    rating: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    oldPrice: '',
    discount: 0,
    image: '',
    hoverImage: '',
    slug: '',
    reviews: 0,
    rating: 0
  });

   // Add this effect to sync dark mode state across the app



  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/recommendedproducts');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      alert('Failed to load products');
    }
  };

  // Delete Product
  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:2000/api/recommendedproducts/${_id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchProducts();
        alert('Product deleted successfully');
      }
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  // Create Product
  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/recommendedproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        fetchProducts();
        setIsCreateModalOpen(false);
        alert('Product created successfully');
      }
    } catch (error) {
      alert('Failed to create product');
    }
  };

  // Update Product
  const handleUpdate = async () => {
    try {
      if (!selectedProduct) {
        alert('No product selected');
        return;
      }
      const response = await fetch(`http://localhost:2000/api/recommendedproducts/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedProduct)
      });

      if (response.ok) {
        fetchProducts();
        setIsEditModalOpen(false);
        alert('Product updated successfully');
      }
    } catch (error) {
      alert('Failed to update product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className={`
            flex items-center px-4 py-2 rounded hover:opacity-90 transition
            ${darkMode 
              ? 'bg-green-700 text-white' 
              : 'bg-green-500 text-white'
            }
          `}
        >
          <PlusCircle className="mr-2" /> Add New Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className={`
          w-full shadow-md rounded-lg overflow-hidden
          ${darkMode 
            ? 'bg-gray-800 text-gray-200 border-gray-700' 
            : 'bg-white text-gray-800'
          }
        `}>
          <thead className={`
            ${darkMode 
              ? 'bg-gray-700 text-gray-200' 
              : 'bg-gray-100 text-gray-700'
            }
          `}>
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Hover Image</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Old Price</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Discount</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr 
                key={product._id} 
                className={`
                  border-b
                  ${darkMode 
                    ? 'hover:bg-gray-700 border-gray-700' 
                    : 'hover:bg-gray-50 border-gray-200'
                  }
                `}
              >
                <td className="px-4 py-3 w-[300px]">{product.title}</td>
                <td className="px-4 py-3"><img src={product.image} className='w-16' alt="" /></td>
                <td className="px-4 py-3"><img src={product.hoverImage} className='w-16' alt="" /></td>
                <td className="px-4 py-3">{product.oldPrice}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">{product.slug}%</td>
                <td className="px-4 py-3">{product.discount}%</td>
                
                <td className="px-4 py-3 flex justify-center space-x-2">
                  <button 
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsEditModalOpen(true);
                    }}
                    className={`
                      ${darkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-500 hover:text-blue-700'
                      }
                    `}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className={`
                      ${darkMode 
                        ? 'text-red-400 hover:text-red-300' 
                        : 'text-red-500 hover:text-red-700'
                      }
                    `}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`
            rounded-lg p-6 w-[800px]
            ${darkMode 
              ? 'bg-gray-800 text-gray-200' 
              : 'bg-white text-gray-800'
            }
          `}>
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>
            {(Object.keys(newProduct) as (keyof typeof newProduct)[]).map((key) => (
              <div key={key} className="mb-2 flex items-center ">
                <label className={`
                  block text-sm font-medium mb-1 w-[150px]
                  ${darkMode ? 'text-gray-300' : 'text-gray-700'}
                `}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  value={newProduct[key] as string | number}
                  onChange={(e) => setNewProduct({
                    ...newProduct, 
                    [key]: e.target.value
                  })}
                  className={`
                    w-full px-3 py-2 rounded-md
                    ${darkMode 
                      ? 'bg-gray-700 text-gray-200 border-gray-600' 
                      : 'border text-gray-800'
                    }
                  `}
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className={`
                  px-4 py-2 rounded
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700'
                  }
                `}
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                className={`
                  px-4 py-2 rounded hover:opacity-90
                  ${darkMode 
                    ? 'bg-green-700 text-white' 
                    : 'bg-green-500 text-white'
                  }
                `}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`
            rounded-lg p-6  w-[800px]    
            ${darkMode 
              ? 'bg-gray-800 text-gray-200' 
              : 'bg-white text-gray-800'
            }
          `}>
            <h2 className="text-xl font-bold  mb-4">Edit Product</h2>
            {Object.keys(selectedProduct).map((key) => (
              key !== '_id' && key !== '__v' && (
                <div key={key} className="mb-1 flex justify-center items-center ">
                  <label className={`
                    block text-sm font-medium mb-1 w-[150px] 
                    ${darkMode ? 'text-gray-300' : 'text-gray-700'}
                  `}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={selectedProduct[key as keyof Product]}
                    onChange={(e) => setSelectedProduct({
                      ...selectedProduct, 
                      [key]: e.target.value
                    })}
                    className={`
                      w-full px-3 py-2 rounded-md 
                      ${darkMode 
                        ? 'bg-gray-700 text-gray-200 border-gray-600' 
                        : 'border text-gray-800'
                      }
                    `}
                  />
                </div>
              )
            ))}
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className={`
                  px-4 py-2 rounded
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700'
                  }
                `}
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className={`
                  px-4 py-2 rounded hover:opacity-90
                  ${darkMode 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-blue-500 text-white'
                  }
                `}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}