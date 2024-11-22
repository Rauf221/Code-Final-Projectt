import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';

interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ min, max, value, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.max(0, Math.min(parseFloat(e.target.value), value[1] - 10));
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.min(1300, Math.max(parseFloat(e.target.value), value[0] + 10));
    onChange([value[0], newMax]);
  };

  return (
    <div className="mb-6 rubik">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handleToggle} className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">PRICE</span>
        </button>
        <button
          className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => onChange([0, 1300])}
        >
          RESET
        </button>
      </div>
      {isExpanded && (
        <div className="px-2">
          <p className="text-sm mb-4">The highest price is $1,300.00</p>
          <div className="relative h-6 w-full">
            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200 rounded" />
            <div
              className="absolute h-full bg-blue-500"
              style={{
                left: `${((value[0] - min) / (max - min)) * 100}%`,
                right: `${100 - ((value[1] - min) / (max - min)) * 100}%`
              }}
            />
            <div
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white border-2 border-blue-500 hover:bg-blue-50"
              style={{ left: `${((value[0] - min) / (max - min)) * 100}%`, top: '50%' }}
            >
              <input
                type="number"
                value={value[0]}
                onChange={handleMinChange}
                className="absolute top-full left-1/2 -translate-x-1/2 w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white border-2 border-blue-500 hover:bg-blue-50"
              style={{ left: `${((value[1] - min) / (max - min)) * 100}%`, top: '50%' }}
            >
              <input
                type="number"
                value={value[1]}
                onChange={handleMaxChange}
                className="absolute top-full left-1/2 -translate-x-1/2 w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;