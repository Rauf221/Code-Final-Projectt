import React, { useState } from 'react';
import { ReactNode } from 'react';


import { Content } from '../Content/Content';
import ProductFilterSidebar from '@/components/FilterOnTheLeft_Components/FilterSidebar/Filtersidebar';
import ProductListWithFilters from '../ProductList/List';

const FilterationPage = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState({
    availability: { inStock: false, outOfStock: false },
    price: { min: 0, max: 1300 },
    color: [],
    brands: [],
    sizes: [],
    productTypes: [],
    tags: [],
  });
  const [slideOpen, setSlideOpen] = useState(false);
  const selectedColors = filters.color;

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex h-screen">
      {/* Pass filters state and the handleFilterChange function */}
      <ProductFilterSidebar filters={{ ...filters, color: selectedColors }} onFilterChange={handleFilterChange} />
      <Content filters={filters} slideOpen={slideOpen} onToggle={() => setSlideOpen(!slideOpen)}>
        {/* Pass filters as prop to ProductListWithFilters */}
        <ProductListWithFilters filters={filters} />
      </Content>
    </div>
  );
};

export default FilterationPage;
