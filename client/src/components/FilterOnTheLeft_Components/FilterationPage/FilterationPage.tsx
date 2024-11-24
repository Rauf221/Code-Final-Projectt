import React, { useState } from 'react';
import { ReactNode } from 'react';
import { Content } from '../Content/Content';
import ProductFilterSidebar from '@/components/FilterOnTheLeft_Components/FilterSidebar/Filtersidebar';
import ProductListWithFilters from '../ProductList/List';
import FilterOnTheLeftSlider from '../Slider/Slider';

interface FilterState {
  availability: {
    inStock: boolean;
    outOfStock: boolean;
  };
  price: {
    min: number;
    max: number;
  };
  color: string[];
  brands: string[];
  sizes: string[];
  productTypes: string[];
  tags: string[];
}

const FilterationPage = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({
    availability: { inStock: false, outOfStock: false },
    price: { min: 0, max: 1300 },
    color: [],
    brands: [],
    sizes: [],
    productTypes: [],
    tags: [],
  });

  const [slideOpen, setSlideOpen] = useState(false);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
    <div>
      <FilterOnTheLeftSlider/>
    </div>
   
    <div className="flex min-h-screen">
      <ProductFilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <Content
        filters={filters}
        slideOpen={slideOpen}
        onToggle={() => setSlideOpen(!slideOpen)}
      >
        <ProductListWithFilters filters={filters} />
      </Content>
    </div>
    </>
  );
};

export default FilterationPage;