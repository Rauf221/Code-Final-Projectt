import React, { useEffect, useState } from 'react';
import { Grid2x2, Grid3x3, LayoutGrid, Table, LayoutList } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import ProductCard from '../ProductCard/producrtcard';
import ProductListView from '../ProductCard/Profuctview';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  brand: string;
  color: string;
  size: string | null;
  availability: string;
  image: string;
  hoverImage: string;
  discount: number;
  rating: number;
  reviewCount: number;
  specialTag: string;
  actionButtonText: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Filters {
  availability: { inStock: boolean; outOfStock: boolean };
  price: { min: number; max: number };
  color: string[];
  brands: string[];
  sizes: string[];
  productTypes: string[];
  tags: string[];
}

interface ProductListWithFiltersProps {
  filters: Filters;
}

const PRODUCTS_STORAGE_KEY = 'filteredProducts';
const PRODUCTS_PER_PAGE = 12;

const ProductListWithFilters: React.FC<ProductListWithFiltersProps> = ({ filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('grid-4');
  const [sortOrder, setSortOrder] = useState('alphabetically-az');
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(PRODUCTS_PER_PAGE),
      });

      if (filters.availability.inStock) {
        queryParams.append('availability', 'in-stock');
      }
      if (filters.availability.outOfStock) {
        queryParams.append('availability', 'out-of-stock');
      }
      if (filters.price.min > 0) {
        queryParams.append('priceMin', String(filters.price.min));
      }
      if (filters.price.max < 1300) {
        queryParams.append('priceMax', String(filters.price.max));
      }
      if (filters.color.length) {
        queryParams.append('colors', filters.color.join(','));
      }
      if (filters.brands.length) {
        queryParams.append('brands', filters.brands.join(','));
      }
      if (filters.sizes.length) {
        queryParams.append('sizes', filters.sizes.join(','));
      }
      if (filters.productTypes.length) {
        queryParams.append('categories', filters.productTypes.join(','));
      }

      const [sortBy, order] = sortOrder.split('-');
      queryParams.append('sortBy', sortBy);
      queryParams.append('sortOrder', order);

      const response = await axios.get<{ products: Product[]; total: number }>(
        `http://localhost:2000/api/filter-products/?${queryParams}`
      );

      const newProducts = response.data.products;
      setTotalProducts(response.data.total);
      
      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      setHasMore(newProducts.length === PRODUCTS_PER_PAGE);
      
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(newProducts));
      
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [filters, sortOrder]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [page, filters, sortOrder]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const viewOptions = [
    { id: 'grid-2', icon: Grid2x2, cols: 'grid-cols-2' },
    { id: 'grid-3', icon: Grid3x3, cols: 'grid-cols-3' },
    { id: 'grid-4', icon: LayoutGrid, cols: 'grid-cols-4' },
    { id: 'grid-5', icon: Table, cols: 'grid-cols-5' },
    { id: 'list', icon: LayoutList, cols: 'grid-cols-1' }
  ];

  const sortOptions = [
    { value: 'alphabetically-az', label: 'Alphabetically, A-Z' },
    { value: 'alphabetically-za', label: 'Alphabetically, Z-A' },
    { value: 'price-low', label: 'Price, low to high' },
    { value: 'price-high', label: 'Price, high to low' }
  ];

  return (
    <div className="w-full border-b min-h-screen border-gray-200 rubik">
      <div className="container mx-auto px-4 py-2 bg-white rounded-md">
        <div className="flex justify-between items-center ">
          <div className="text-gray-600">{totalProducts} products</div>
          <div className="flex items-center gap-64">
            <div className="flex items-center gap-1">
              {viewOptions.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${
                      activeView === view.id ? 'text-blue-600 bg-gray-100' : 'text-gray-400'
                    }`}
                    aria-label={`Switch to ${view.id} view`}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-none bg-transparent text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={`container mx-auto  py-6 grid gap-4 ${
        viewOptions.find(v => v.id === activeView)?.cols || 'grid-cols-4'
      }`}>
        {loading ? (
          Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
            <div key={index} className="p-4">
              <Skeleton height={250} />
              <Skeleton width="80%" className="mt-2" />
              <Skeleton width="60%" className="mt-2" />
            </div>
          ))
        ) : (
          products.map((product) => (
            <div key={product._id} className={activeView === 'list' ? 'col-span-full' : ''}>
              {activeView === 'list' ? (
                <ProductListView product={product} />
              ) : (
                <ProductCard product={product} />
              )}
            </div>
          ))
        )}
      </div>

      {hasMore && !loading && (
        <div className="text-center mb-8">
          <button
            onClick={handleLoadMore}
            className=" px-6 py-2 bg-black text-white rounded-md hover:bg-blue-600 transition"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListWithFilters;