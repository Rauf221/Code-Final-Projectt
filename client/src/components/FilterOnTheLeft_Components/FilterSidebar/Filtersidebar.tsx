import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';
import FeaturedProducts from '../Featured Products/Featuredproducts';
import AdImage from '../Ad on Bottom/addImage';
import ColorFilter from '../Color Filter/Color';

interface FilterState {
  categories: string[];
  availability: {
    inStock: boolean;
    outOfStock: boolean;
  };
  price: {
    min: number;
    max: number;
  };
  colors: string[];
  brands: string[];
  sizes: string[];
  productTypes: string[];
  tags: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

interface Category {
  name: string;
  count: number;
  isExpandable?: boolean;
}

interface Brand {
  name: string;
  count: number;
}

interface ColorOption {
  id: string;
  color: string;
}

const CustomRangeSlider = ({ 
  min, 
  max, 
  value, 
  onChange 
}: { 
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) => {
  const [activeThumb, setActiveThumb] = useState<null | 'min' | 'max'>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, thumb: 'min' | 'max') => {
    setActiveThumb(thumb);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!activeThumb || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newValue = Math.round(min + percent * (max - min));

      if (activeThumb === 'min') {
        onChange([Math.min(newValue, value[1] - 10), value[1]]);
      } else {
        onChange([value[0], Math.max(newValue, value[0] + 10)]);
      }
    };

    const handleMouseUp = () => {
      setActiveThumb(null);
    };

    if (activeThumb) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeThumb, min, max, value, onChange]);

  const minThumbPercent = ((value[0] - min) / (max - min)) * 100;
  const maxThumbPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="relative h-6 w-full">
      <div
        ref={trackRef}
        className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200 rounded"
      >
        <div
          className="absolute h-full bg-black"
          style={{
            left: `${minThumbPercent}%`,
            right: `${100 - maxThumbPercent}%`
          }}
        />
      </div>
      <div
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white border-2 border-black hover:bg-blue-50"
        style={{ left: `${minThumbPercent}%`, top: '50%' }}
        onMouseDown={(e) => handleMouseDown(e, 'min')}
      />
      <div
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white border-2 border-black hover:bg-blue-50"
        style={{ left: `${maxThumbPercent}%`, top: '50%' }}
        onMouseDown={(e) => handleMouseDown(e, 'max')}
      />
    </div>
  );
};

const ProductFilterSidebar: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleFilterChange = (
  filterType: keyof FilterState,
  value: any
) => {
  setFilters(prev => ({
    ...prev,
    [filterType]: value
  }));
};
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    availability: {
      inStock: false,
      outOfStock: false,
    },
    price: {
      min: 0,
      max: 1300,
    },
    colors: [],
    brands: [],
    sizes: [],
    productTypes: [],
    tags: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    availability: true,
    price: true,
    color: true,
    brand: true,
    size: true,
    productType: true,
    tags: true,
  });

  const categories: Category[] = [
    { name: "Babies & Moms", count: 0 },
    { name: "Books & Office", count: 0 },
    { name: "Chairs & Stools", count: 1 },
    { name: "Clothing & Apparel", count: 8 },
    { name: "Computers & Technologies", count: 11, isExpandable: true },
    { name: "Consumer Electrics", count: 6 },
    { name: "Decor & Furniture", count: 11 },
    { name: "Furniture & Accessories", count: 12 },
    { name: "Kitchen & Tableware", count: 10 },
    { name: "Phones & Accessories", count: 21 },
    { name: "Sport & Outdoor", count: 0 },
  ];

  const brands: Brand[] = [
    { name: "Morata Demo Store", count: 2 },
    { name: "Samsung", count: 10 },
    { name: "Sofine", count: 18 },
    { name: "Uminex", count: 23 },
    { name: "Uminex Demo Store", count: 1 },
    { name: "Accessories", count: 1 },
    { name: "Apple", count: 1 },
    { name: "Dell", count: 1 },
    { name: "HP", count: 1 },
    { name: "Logitech", count: 1 },
    { name: "Morta", count: 1 },
  ];

  const sizes = [
    { size: "128GB", count: 1 },
    { size: "256GB", count: 1 },
    { size: "512GB", count: 1 }
  ];

  const productTypes = [
    { name: "Computer", count: 1 },
    { name: "Computer & Desktop", count: 2 },
    { name: "Cutting Machine", count: 1 },
    { name: "Dining & Kitchen", count: 4 },
    { name: "Drills", count: 4 },
    { name: "Electronic", count: 1 },
    { name: "Electronics", count: 3 },
    { name: "Fresh Vegetables", count: 4 },
    { name: "Furniture", count: 6 }
  ];

  const tags = [
    { name: "Furniture", count: 2 },
    { name: "Furniture & Accessories", count: 4 },
    { name: "Galaxy", count: 1 },
    { name: "Garden & Kitchen", count: 6 },
    { name: "Handheld Circular Saws", count: 1 },
    { name: "Handheld Power Drills", count: 2 },
    { name: "Health", count: 4 },
    { name: "Accessories", count: 10 },
    { name: "Apple", count: 7 }
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryName: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryName)
        ? prev.categories.filter(cat => cat !== categoryName)
        : [...prev.categories, categoryName]
    }));
  };

  const handleAvailabilityChange = (type: 'inStock' | 'outOfStock') => {
    setFilters(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: !prev.availability[type]
      }
    }));
  };

  const handlePriceChange = (values: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      price: {
        min: values[0],
        max: values[1]
      }
    }));
  };

  const handleColorChange = (newColors: string[]) => {
    setFilters(prev => ({
      ...prev,
      colors: newColors
    }));
  };

  const handleBrandChange = (brandName: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brandName)
        ? prev.brands.filter(b => b !== brandName)
        : [...prev.brands, brandName]
    }));
  };

  const handleSizeChange = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleProductTypeChange = (typeName: string) => {
    setFilters(prev => ({
      ...prev,
      productTypes: prev.productTypes.includes(typeName)
        ? prev.productTypes.filter(t => t !== typeName)
        : [...prev.productTypes, typeName]
    }));
  };

  const handleTagChange = (tagName: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter(t => t !== tagName)
        : [...prev.tags, tagName]
    }));
  };

  const resetSection = (section: keyof FilterState) => {
    setFilters(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) ? [] : 
                 section === 'availability' ? { inStock: false, outOfStock: false } :
                 section === 'price' ? { min: 0, max: 1300 } : prev[section]
    }));
  };

  return (
    <div className="min-w-[22%] max-w-[22%] h-screen p-4 mt-20 border-gray-200 rounded-lg">
      {/* Categories */}
      <div className="mb-6 p-6 bg-white rounded-md">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h2 className="text-base font-medium">Product Categories</h2>
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-600 hover:text-black transition-colors">
                    {category.name} ({category.count})
                  </span>
                </label>
                {category.isExpandable && (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="bg-white p-6 rounded-md">
        <div className="mb-6 rubik">
          <div className="w-full mb-7 relative">
            <h2 className="text-xl rubik font-medium relative inline-block">
              Filter By
              <div className="absolute -bottom-3 left-0 w-[65%] h-[2px] bg-[#16BCDC] z-10"></div>
            </h2>
            <div className="w-full h-[2px] absolute -bottom-3 bg-gray-300"></div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center space-x-2"
            >
              <Minus className="w-4 h-4" />
              <span className="text-md font-medium">AVAILABILITY</span>
            </button>
            <button
              onClick={() => resetSection('availability')}
              className="text-xs font-md text-gray-500 hover:text-gray-700 transition-colors"
            >
              RESET
            </button>
          </div>
          {expandedSections.availability && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availability.inStock}
                  onChange={() => handleAvailabilityChange('inStock')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">In Stock (113)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availability.outOfStock}
                  onChange={() => handleAvailabilityChange('outOfStock')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Out Of Stock (1)</span>
              </label>
            </div>
          )}
        </div>

        {/* Price Filter */}
      <div className="mb-6 rubik">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center space-x-2"
          >
            <Minus className="w-4 h-4" />
            <span className="text-md font-medium">PRICE</span>
          </button>
          <button 
            className="text-xs font-medium  text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => handleFilterChange('price', { min: 0, max: 1300 })}
          >
            RESET
          </button>
        </div>
        {expandedSections.price && (
          <div className="px-2">
            <p className="text-sm mb-4">The highest price is $1,300.00</p>
            <CustomRangeSlider
              min={0}
              max={1300}
              value={[filters.price.min, filters.price.max]}
              onChange={(values) =>
                handleFilterChange('price', {
                  min: values[0],
                  max: values[1],
                })
              }
            />
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500">$</span>
                  <span className="text-sm">From</span>
                </div>
                <input
                  type="number"
                  value={filters.price.min}
                  onChange={(e) =>
                    handleFilterChange('price', {
                      ...filters.price,
                      min: Math.max(0, Math.min(parseFloat(e.target.value), filters.price.max - 10)),
                    })
                  }
                  className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500">$</span>
                  <span className="text-sm">To</span>
                </div>
                <input
                  type="number"
                  value={filters.price.max}
                  onChange={(e) =>
                    handleFilterChange('price', {
                      ...filters.price,
                      max: Math.min(1300, Math.max(parseFloat(e.target.value), filters.price.min + 10)),
                    })
                  }
                  className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='w-full h-[1px] bg-gray-200 mb-6'></div>
        {/* Color Filter */}
         <ColorFilter onColorChange={handleColorChange} />
      <div className='w-full h-[2px] bg-gray-200 mb-6 mt-6'></div>
      {/* Brand Filter */}
      <div className='rubik'>
        <div className="flex items-center justify-between mb-4 mt-6 ">
          <div className="flex items-center space-x-2">
            <Minus className="w-4 h-4" />
            <span className="text-md font-medium">BRAND</span>
          </div>
          <button 
            onClick={() => setSelectedBrands([])}
            className="text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            RESET
          </button>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand.name} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => {
                  setSelectedBrands(prev =>
                    prev.includes(brand.name)
                      ? prev.filter(b => b !== brand.name)
                      : [...prev, brand.name]
                  );
                }}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {brand.name} ({brand.count})
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className='w-full h-[2px] bg-gray-200 mb-3 mt-8 '></div>
      {/* Size Filter */}
      <div className='rubik'>
        <div className="flex items-center justify-between mb-4 mt-10">
          <div className="flex items-center space-x-2">
            <Minus className="w-4 h-4" />
            <span className="text-md font-medium">SIZE</span>
          </div>
          <button 
            onClick={() => setSelectedBrands([])}
            className="text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            RESET
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => (
            <button
              key={item.size}
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes(item.size)
                    ? prev.filter(s => s !== item.size)
                    : [...prev, item.size]
                );
              }}
              className={`px-4 py-2 text-sm rounded-md border ${
                selectedSizes.includes(item.size)
                  ? 'border-blue-500 text-blue-500'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {item.size} ({item.count})
            </button>
          ))}
        </div>
      </div>
      <div className='w-full h-[2px] bg-gray-200 mt-10'></div>
      {/* Product Type Filter */}
      <div className='rubik'>
        <div className="flex items-center justify-between mb-4 mt-10">
          <div className="flex items-center space-x-2">
            <Minus className="w-4 h-4" />
            <span className="text-md font-medium">PRODUCT TYPE</span>
          </div>
          <button 
            onClick={() => setSelectedProductTypes([])}
            className="text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            RESET
          </button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {productTypes.map((type) => (
            <label key={type.name} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedProductTypes.includes(type.name)}
                onChange={() => {
                  setSelectedProductTypes(prev =>
                    prev.includes(type.name)
                      ? prev.filter(t => t !== type.name)
                      : [...prev, type.name]
                  );
                }}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {type.name} ({type.count})
              </span>
            </label>
          ))}
        </div>
      </div>
     {/* Tags Filter */}
     <div className='w-full h-[2px] bg-gray-200  mt-10'></div>
     <div className='rubik'> 
        <div className="flex items-center justify-between mb-4 mt-10">
          <div className="flex items-center space-x-2">
            <Minus className="w-4 h-4" />
            <span className="text-md font-medium">TAGS</span>
          </div>
          <button 
            onClick={() => setSelectedTags([])}
            className="text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            RESET
          </button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {tags.map((tag) => (
            <label key={tag.name} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.name)}
                onChange={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag.name)
                      ? prev.filter(t => t !== tag.name)
                      : [...prev, tag.name]
                  );
                }}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {tag.name} ({tag.count})
              </span>
            </label>
          ))}
        </div>
      </div>
      </div>
      <FeaturedProducts />
      <AdImage />
    </div>

  );
};

export default ProductFilterSidebar;