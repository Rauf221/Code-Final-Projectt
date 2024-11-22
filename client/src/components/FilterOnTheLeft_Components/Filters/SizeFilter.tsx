import React, { useState } from 'react';
import { Minus } from 'lucide-react';

interface Size {
  size: string;
  count: number;
}

interface SizeFilterProps {
  sizes: Size[];
  onSizeChange: (newSizes: string[]) => void;
}

const SizeFilter: React.FC<SizeFilterProps> = ({ sizes, onSizeChange }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
    onSizeChange(selectedSizes);
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-md">
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">SIZE</span>
        </button>
        <button
          className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setSelectedSizes([])}
        >
          RESET
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((item) => (
          <button
            key={item.size}
            onClick={() => toggleSize(item.size)}
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
  );
};

export default SizeFilter;