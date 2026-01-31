import { useState } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface PopularFashionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onLoginRequired?: () => void;
}

export const PopularFashion = ({ products, onAddToCart, onLoginRequired }: PopularFashionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Women');

  const categories = [
    'Women',
    'Watches',
    'Shoes',
    'Others',
    'Men',
    'Jewellery',
    'Beauty & Care',
    'Bags & Backpacks'
  ];



  // 🔎 Filter by selected category
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'Others') return true;

    const name = (product.name || '').toLowerCase();
    const category =
      typeof product.category === 'string'
        ? product.category.toLowerCase()
        : '';

    return (
      name.includes(selectedCategory.toLowerCase()) ||
      category.includes(selectedCategory.toLowerCase())
    );
  });

  const displayProducts = filteredProducts.slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Popular Fashion</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <nav className="space-y-3 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left py-2 px-3 rounded text-sm ${
                      selectedCategory === cat
                        ? 'bg-blue-100 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>

              <div className="bg-green-500 text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                <div className="text-center">
                  <div className="text-xl">$</div>
                  <div className="text-4xl font-bold">39</div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onLoginRequired={onLoginRequired}
                  isFeatured={product.isSale || product.isNew}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PopularFashion;
