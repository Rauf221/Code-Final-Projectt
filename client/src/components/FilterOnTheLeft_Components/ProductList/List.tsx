import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Grid2x2, Grid3x3, LayoutGrid, Table, LayoutList } from 'lucide-react';
import ProductCard from '../ProductCard/producrtcard';
import ProductListView from '../ProductCard/Profuctview';

interface Product {
  _id: string;
  image: string;
  name: string;
  specialTag?: string;
  brand: string;
  color: string;
  size: string;
  price: number;
  originalPrice?: number;
  actionButtonText: string;
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

const ProductListWithFilters: React.FC<ProductListWithFiltersProps> = ({ filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
  
      // Filtre parametreleri ekleniyor
      if (filters.availability.inStock) queryParams.append('availability', 'inStock');
      if (filters.availability.outOfStock) queryParams.append('availability', 'outOfStock');
      if (filters.price.min) queryParams.append('priceMin', String(filters.price.min));
      if (filters.price.max) queryParams.append('priceMax', String(filters.price.max));
      if (filters.color.length) queryParams.append('color', filters.color.join(','));
      if (filters.brands.length) queryParams.append('brand', filters.brands.join(','));
      if (filters.sizes.length) queryParams.append('size', filters.sizes.join(','));
      if (filters.productTypes.length) queryParams.append('productType', filters.productTypes.join(','));
      if (filters.tags.length) queryParams.append('tags', filters.tags.join(','));
  
      // Sayfalama parametreleri ekleniyor
      queryParams.append('page', String(page));
      queryParams.append('limit', '12');
  
      // Sıralama parametreleri ekleniyor
      if (sortOrder) {
        const [sortBy, order] = sortOrder.split('-');
        queryParams.append('sortBy', sortBy);
        queryParams.append('sortOrder', order);
      }
  
      // API çağrısı yapılıyor
      const response = await axios.get(`http://localhost:2000/api/filter-products/?${queryParams}`);
  
      // Filtrelenen ürünleri güncelle
      if (response.data && Array.isArray(response.data.products)) {
        if (response.data.products.length < 12) {
          setHasMore(false); // Daha fazla ürün yoksa, "Load More" butonunu gizle
        }
        setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
      } else {
        console.error('Expected an array of products, but received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [page, filters]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const [activeView, setActiveView] = useState('grid-4');
  const [sortOrder, setSortOrder] = useState('alphabetically-az');

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
    <div className="w-[100%] border-b h-screen border-gray-200">
      <div className="container mx-auto px-4 py-3 bg-white">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">113 products</div>
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

      <div className={`container mx-auto px-4 py-6 grid gap-4 ${viewOptions.find(v => v.id === activeView)?.cols || 'grid-cols-4'}`}>
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="p-4">
                <Skeleton height={250} />
                <Skeleton width="80%" className="mt-2" />
                <Skeleton width="60%" className="mt-2" />
              </div>
            ))
          : products.map((product) => (
            <div key={product._id} className={activeView === 'list' ? 'col-span-full' : ''}>
              {activeView === 'list' ? (
                <ProductListView product={product} />
              ) : (
                <ProductCard product={product} />
              )}
            </div>
          ))}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-blue-600 transition"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListWithFilters;