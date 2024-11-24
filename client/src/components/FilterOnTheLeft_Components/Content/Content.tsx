import React from 'react';

interface ContentProps {
  filters: any; 
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
    
      <div className='min-h-screen '>
        
        {children}
      </div>
    </div>
  );
};