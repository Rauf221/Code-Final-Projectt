import { Minus } from 'lucide-react';
import React, { useState, useCallback } from 'react';

const colorOptions = [
  { id: 'black', color: '#000000' },
  { id: 'blue', color: '#0000FF' },
  { id: 'teal', color: '#008080' },
  { id: 'darkgrey', color: '#404040' },
  { id: 'gold', color: '#FFD700' },
  { id: 'lightgrey', color: '#D3D3D3' },
  { id: 'mint', color: '#98FF98' },
  { id: 'skyblue', color: '#87CEEB' },
  { id: 'grey', color: '#808080' },
  { id: 'red', color: '#FF0000' },
  { id: 'purple', color: '#800080' },
  { id: 'lightred', color: '#FF6B6B' },
  { id: 'lightblue', color: '#ADD8E6' },
  { id: 'darkblue', color: '#00008B' },
  { id: 'magenta', color: '#FF00FF' },
  { id: 'brightred', color: '#FF4136' },
  { id: 'white', color: '#FFFFFF' },
  { id: 'silver', color: '#C0C0C0' },
];

const ColorFilter = ({ onColorChange }: { onColorChange: (colors: string[]) => void }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Use useCallback to ensure we're not calling onColorChange during render
  const toggleColor = useCallback((colorId: string) => {
    setSelectedColors((prevSelectedColors) => {
      const newColors = prevSelectedColors.includes(colorId)
        ? prevSelectedColors.filter(c => c !== colorId)
        : [...prevSelectedColors, colorId];

      // Update parent component outside the render cycle
      onColorChange(newColors);
      return newColors;
    });
  }, [onColorChange]); // Depend on onColorChange, which is passed as prop

  return (
    <div className="rubik">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">COLOR</span>
        </div>
        <button
          onClick={() => { setSelectedColors([]); onColorChange([]); }} // Reset both local state and parent state
          className="text-xs font-medium text-gray-500 hover:text-gray-700"
        >
          RESET
        </button>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {colorOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleColor(option.id)} // Use the toggleColor function
            className={`w-6 h-6 rounded-full border transition-transform ${selectedColors.includes(option.id) ? 'border-blue-500 scale-110' : 'border-gray-200 hover:scale-110'}`}
            style={{ backgroundColor: option.color, borderWidth: option.id === 'white' ? '1px' : '2px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
