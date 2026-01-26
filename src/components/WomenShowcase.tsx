import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useState, useEffect } from 'react';

interface WomenShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const WomenShowcase = ({ products, onAddToCart }: WomenShowcaseProps) => {
  const [bannerIndex, setBannerIndex] = useState(0);

  // Customize these banner images and text
  const bannerSlides = [
    {
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-4.jpg'
    }
  ];

  // Auto-rotate banner every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // take women's-related products (match category or name keywords)
  const womenKeywords = ['women', "women's", 'dress', 'dresses', 'tops', 'lingerie', 'skirt', 'skirts'];
  const womenProducts = products.filter(p => {
    const cat = (p.category || '').toLowerCase();
    const name = (p.name || '').toLowerCase();
    return womenKeywords.some(k => cat.includes(k) || name.includes(k));
  });
  const displayProducts = womenProducts.slice(0, 6);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
          {/* Left sidebar small (just a label) */}
          <div className="lg:col-span-1 hidden lg:block">
            <h3 className="text-lg font-semibold text-pink-400">Women' Fashion</h3>
            <ul className="mt-8 space-y-4 text-sm text-gray-600">
              <li>Trousers & Capris</li>
              <li>Tops</li>
              <li>Shorts & Skirts</li>
              <li>Lingerie & Nightwear</li>
              <li>Jeans</li>
              <li>Dresses</li>
            </ul>

            <div className="mt-12">
              <div className="bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs">$</div>
                  <div className="text-2xl font-bold">39</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center banner */}
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

              {/* Text Overlay - Hidden */}
              <div className="hidden"></div>

              {/* Carousel Indicators - Hidden */}
              <div className="hidden"></div>
            </div>
          </div>

          {/* Right product cards — show first 6 in 2 rows (3 columns) */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenShowcase;
