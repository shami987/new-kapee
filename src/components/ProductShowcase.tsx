import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onLoginRequired?: () => void;
}

export const ProductShowcase = ({ products, onAddToCart, onLoginRequired }: ProductShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Men's Fashion");
  const [bannerIndex, setBannerIndex] = useState(0);



  // Banner slides (still static – this is OK)
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

  // Auto-scroll banner
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Show only first 6 products
  const displayProducts = products.slice(0, 6);

  if (products.length === 0) {
    return (
      <section className="py-12 text-center text-gray-500">
        Loading products...
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                {selectedCategory}
              </h3>

              {["Men's Fashion", "Women's Fashion", "Shoes", "Accessories"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left py-1 px-2 text-sm rounded ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Banner */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-96">
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
                />
              ))}

              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold">
                  {bannerSlides[bannerIndex].title}
                </h2>
                <p className="text-lg">{bannerSlides[bannerIndex].offer}</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayProducts.length > 0 ? (
                displayProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onLoginRequired={onLoginRequired}
                    isFeatured={product.isSale || product.isNew}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
