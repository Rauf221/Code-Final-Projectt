import React, { useState } from 'react';
import { Minus } from 'lucide-react';

interface ProductType {
  name: string;
  count: number;
}

interface ProductTypeFilterProps {
  productTypes: ProductType[];
  onProductTypeChange: (newProductTypes: string[]) => void;
}

const ProductTypeFilter: React.FC<ProductTypeFilterProps> = ({ productTypes, onProductTypeChange }) => {
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);

  const toggleProductType = (type: string) => {
    if (selectedProductTypes.includes(type)) {
      setSelectedProductTypes(selectedProductTypes.filter((t) => t !== type));
    } else {
      setSelectedProductTypes([...selectedProductTypes, type]);
    }
    onProductTypeChange(selectedProductTypes);
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-md">
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">PRODUCT TYPE</span>
        </button>
        <button
          className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setSelectedProductTypes([])}
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
              onChange={() => toggleProductType(type.name)}
              className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {type.name} ({type.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductTypeFilter;