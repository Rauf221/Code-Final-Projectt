import React from 'react';

interface ContentProps {
  filters: any; // Replace 'any' with the appropriate type if known
  slideOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ filters,  children }) => {
  return (
    <div
      className={`flex-grow p-6 transition-all duration-300 
       
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Filtration Page</h1>
      </div>
      <div>
        
        {children}
      </div>
    </div>
  );
};