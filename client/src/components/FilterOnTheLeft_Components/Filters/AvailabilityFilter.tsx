import React from 'react';
import { Minus } from 'lucide-react';

interface Availability {
  inStock: boolean;
  outOfStock: boolean;
}

interface AvailabilityFilterProps {
  availability: Availability;
  onAvailabilityChange: (newAvailability: Availability) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ availability, onAvailabilityChange }) => {
  return (
    <div className="mb-6 p-6 bg-white rounded-md">
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">AVAILABILITY</span>
        </button>
        <button
          className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => onAvailabilityChange({ inStock: false, outOfStock: false })}
        >
          RESET
        </button>
      </div>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={availability.inStock}
            onChange={() => onAvailabilityChange({ ...availability, inStock: !availability.inStock })}
            className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">In Stock (113)</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={availability.outOfStock}
            onChange={() => onAvailabilityChange({ ...availability, outOfStock: !availability.outOfStock })}
            className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Out Of Stock (1)</span>
        </label>
      </div>
    </div>
  );
};

export default AvailabilityFilter;