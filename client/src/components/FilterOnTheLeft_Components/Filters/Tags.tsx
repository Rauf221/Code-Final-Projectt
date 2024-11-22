import React, { useState } from 'react';
import { Minus } from 'lucide-react';

interface Tag {
  name: string;
  count: number;
}

interface TagsFilterProps {
  tags: Tag[];
  onTagsChange: (selectedTags: string[]) => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ tags, onTagsChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTagChange = (tagName: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tagName)
        ? prevTags.filter(t => t !== tagName)
        : [...prevTags, tagName]
    );
    onTagsChange(selectedTags);
  };

  const handleReset = () => {
    setSelectedTags([]);
    onTagsChange([]);
  };

  return (
    <div className='rubik'>
      <div className="flex items-center justify-between mb-4 mt-10">
        <div className="flex items-center space-x-2">
          <Minus className="w-4 h-4" />
          <span className="text-md font-medium">TAGS</span>
        </div>
        <button 
          onClick={handleReset}
          className="text-xs font-medium text-gray-500 hover:text-gray-700"
        >
          RESET
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {tags.map(tag => (
            <label key={tag.name} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.name)}
                onChange={() => handleTagChange(tag.name)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {tag.name} ({tag.count})
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsFilter;