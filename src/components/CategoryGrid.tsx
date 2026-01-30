import type { Category } from '../types';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/categoryService';

export const CategoryGrid = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 🔹 Categories from backend
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  const duplicatedCategories = categories;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Carousel with navigation buttons */}
        <div className="relative flex items-center gap-4">

          {/* Previous Button */}
          <button
            onClick={() => scroll('left')}
            className="flex-shrink-0 bg-white border border-gray-300 rounded-full p-2 md:p-3 hover:bg-gray-100 hover:border-blue-500 transition-all shadow-md z-10"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-2 flex-1 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style>{`
              ::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="flex gap-8 min-w-min px-4">
              {duplicatedCategories.map((category, index) => (
                <button
                  key={`${category.id}-${index}`}
                  className="flex flex-col items-center cursor-pointer group transition-all hover:scale-110 flex-shrink-0"
                  onClick={() =>
                    navigate(
                      `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`
                    )
                  }
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-gray-300 group-hover:border-blue-500 shadow-lg group-hover:shadow-xl bg-white">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900 text-center text-xs md:text-sm">
                    {category.name}
                  </h3>
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => scroll('right')}
            className="flex-shrink-0 bg-white border border-gray-300 rounded-full p-2 md:p-3 hover:bg-gray-100 hover:border-blue-500 transition-all shadow-md z-10"
            aria-label="Next"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
