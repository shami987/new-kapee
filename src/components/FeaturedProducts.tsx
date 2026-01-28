import type { Product } from '../types';
import { useRef } from 'react';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onLoginRequired?: () => void;
  onViewAll?: () => void;
}

export const FeaturedProducts = ({
  products,
  onAddToCart,
  onLoginRequired,
  onViewAll,
}: FeaturedProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter featured products
  const featuredProducts = products.filter((p) => p.isSale || p.isNew).slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; // scroll 80% of container width
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">FEATURED PRODUCTS</h2>
          <button
            onClick={onViewAll}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
          >
            VIEW ALL
          </button>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center">
          {/* Prev Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 z-10 bg-white border border-gray-300 rounded-full p-2 sm:p-3 hover:bg-gray-100 hover:border-blue-500 transition-all shadow-md"
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth flex gap-4 sm:gap-6 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              ::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="flex gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80"
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onLoginRequired={onLoginRequired}
                    isFeatured={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 z-10 bg-white border border-gray-300 rounded-full p-2 sm:p-3 hover:bg-gray-100 hover:border-blue-500 transition-all shadow-md"
            aria-label="Next"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
