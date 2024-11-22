import React, { useState } from 'react';
import { Minus } from 'lucide-react';

interface Brand {
  name: string;
  count: number;
}

interface BrandFilterProps {
  brands: Brand[];
  onBrandChange: (newBrands: string[]) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ brands, onBrandChange }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
    onBrandChange(selectedBrands);
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-md">
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">BRAND</span>
        </button>
        <button
          className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setSelectedBrands([])}
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
              onChange={() => toggleBrand(brand.name)}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {brand.name} ({brand.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;