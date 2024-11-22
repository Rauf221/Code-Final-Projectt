import React, { useState } from 'react';
import { Minus } from 'lucide-react';

interface ColorOption {
  id: string;
  color: string;
}

interface ColorFilterProps {
  colors: ColorOption[];
  onColorChange: (newColors: ColorOption[]) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ colors, onColorChange }) => {
  const [selectedColors, setSelectedColors] = useState<ColorOption[]>([]);

  const handleColorSelect = (color: ColorOption) => {
    if (selectedColors.some((c) => c.id === color.id)) {
      setSelectedColors(selectedColors.filter((c) => c.id !== color.id));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
    onColorChange(selectedColors);
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-md">
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">COLOR</span>
        </button>
        <button
          className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setSelectedColors([])}
        >
          RESET
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <div
            key={color.id}
            onClick={() => handleColorSelect(color)}
            className={`w-8 h-8 rounded-full cursor-pointer transition-colors ${
              selectedColors.some((c) => c.id === color.id)
                ? 'border-2 border-blue-500'
                : 'hover:border-gray-300 border border-transparent'
            }`}
            style={{ backgroundColor: color.color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;