import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';

interface Category {
  name: string;
  count: number;
  isExpandable?: boolean;
}

interface CategoryFilterProps {
  categories: Category[];
  onCategoryFilterChange: (newCategories: Category[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onCategoryFilterChange }) => {
  const [expandedCategories, setExpandedCategories] = useState<boolean[]>(categories.map(() => false));

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-md">
      <button
        onClick={() => toggleCategory(0)}
        className="w-full flex items-center justify-between mb-4"
      >
        <h2 className="text-base font-medium">Product Categories</h2>
        {expandedCategories[0] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedCategories[0] && (
        <div className="space-y-3">
          {categories.map((category, i) => (
            <div key={category.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span
                  className="text-gray-600 hover:text-black cursor-pointer transition-colors"
                  onClick={() => toggleCategory(i)}
                >
                  {category.name}
                </span>
                <span className="text-gray-400">({category.count})</span>
              </div>
              {category.isExpandable && (
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transform transition-transform ${
                    expandedCategories[i] ? 'rotate-180' : ''
                  }`}
                  onClick={() => toggleCategory(i)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;