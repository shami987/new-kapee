import { useState, useEffect } from 'react';
import type { Product, Category } from '../types';
import { ProductCard } from './ProductCard';

interface ProductShowcaseProps {
  products: Product[];
  categories: Category[];
  onAddToCart: (product: Product) => void;
  onLoginRequired?: () => void;
}

export const ProductShowcase = ({ products, onAddToCart, onLoginRequired }: ProductShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Men\'s Fashion');
  const [bannerIndex, setBannerIndex] = useState(0);
  
  // Static banner slides - Change image URLs here
  const bannerSlides = [
    {
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/06/Product-box-banner-3.jpg',
      title: "Men's Clothing",
      offer: 'UP TO 50% OFF'
    },
    {
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-1.jpg',
      title: "Summer Collection",
      offer: 'UP TO 60% OFF'
    },
    {
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-1.jpg',
      title: "Trending Fashion",
      offer: 'UP TO 70% OFF'
    }
  ];

  // Auto-scroll banner every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // Show only 6 products, no filtering
  const displayProducts = products.slice(0, 6);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Left Column - Sidebar only */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-blue-600 mb-4">{selectedCategory}</h3>
              
              <nav className="space-y-2">
                {['Men\'s Fashion', 'Women\'s Fashion', 'Shoes', 'Accessories'].map((cat) => (
                  <div key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left py-1 px-2 text-sm rounded transition-colors ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  </div>
                ))}
              </nav>

              {/* Price Tag */}
              <div className="mt-6 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <div className="text-center">
                  <div className="text-xs">$</div>
                  <div className="text-xl font-bold">39</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Automatic Banner Carousel */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-96">
              {/* Banner Carousel */}
              <div className="relative w-full h-full">
                {bannerSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === bannerIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  </div>
                ))}
              </div>

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{bannerSlides[bannerIndex].title}</h2>
                <p className="text-lg md:text-xl font-semibold">{bannerSlides[bannerIndex].offer}</p>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setBannerIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === bannerIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 6 Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayProducts.length > 0 ? (
                displayProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      onLoginRequired={onLoginRequired}
                      isFeatured={product.isSale || product.isNew}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
