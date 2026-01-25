import { useState } from 'react';
import { Filter } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  priceRange: [number, number];
  sortBy: string;
}

export const ProductFilters = ({ categories, onFilterChange }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: [0, 1000],
    sortBy: 'name'
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 mr-2" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange({ category: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Range: $0 - ${filters.priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange({ 
              priceRange: [0, parseInt(e.target.value)] as [number, number]
            })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};