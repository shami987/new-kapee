import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useState, useEffect } from 'react';

interface WomenShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onLoginRequired?: () => void;
}

export const WomenShowcase = ({ products, onAddToCart, onLoginRequired }: WomenShowcaseProps) => {
  const [bannerIndex, setBannerIndex] = useState(0);

  const bannerSlides = [
    {
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/07/Product-box-banner-4.jpg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);



  // Filter women products
  const womenProducts = products.filter((p) =>
    (p.name || '').toLowerCase().includes('women') ||
    (p.name || '').toLowerCase().includes('dress')
  );

  const displayProducts = womenProducts.slice(0, 6);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">

          {/* Left sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <h3 className="text-lg font-semibold text-pink-400">Women's Fashion</h3>
          </div>

          {/* Banner */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-96"
              style={{
                backgroundImage: `url(${bannerSlides[bannerIndex].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onLoginRequired={onLoginRequired}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WomenShowcase;
