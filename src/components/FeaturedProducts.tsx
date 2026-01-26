import type { Product } from '../types';
import { useRef } from 'react';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewAll?: () => void;
}

export const FeaturedProducts = ({ products, onAddToCart, onViewAll }: FeaturedProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Filter products that are marked as featured (isSale or isNew)
  const featuredProducts = products.filter(p => p.isSale || p.isNew).slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">FEATURED PRODUCTS</h2>
          <button 
            onClick={onViewAll}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          >
            VIEW ALL
          </button>
        </div>

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
            <div className="flex gap-6 min-w-min px-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-full sm:w-80">
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    isFeatured={true}
                  />
                </div>
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

export default FeaturedProducts;
