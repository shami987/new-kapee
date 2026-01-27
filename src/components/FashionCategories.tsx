import { useState } from 'react';
import type { Category } from '../types';

interface FashionCategoriesProps {
  categories: Category[];
}

export const FashionCategories = ({ categories }: FashionCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState('Men');

  const categoryList = [
    'Women',
    'Watches',
    'Shoes',
    'Men',
    'Jewellery',
    'Beauty & Care',
    'Bags & Backpacks',
    'Accessories'
  ];

  // Banner image for the center section
  const bannerImage = 'https://kapee.presslayouts.com/wp-content/uploads/2019/06/Product-box-category-banner.jpg';

  // Get the first 6 categories for the right grid
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left Sidebar - Categories List */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h3 className="text-2xl font-bold text-orange-600 mb-6">
                Fashion<br />Categories
              </h3>
              
              <nav className="space-y-2">
                {categoryList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left py-2 px-3 rounded transition-colors text-sm ${
                      selectedCategory === cat
                        ? 'bg-orange-100 text-orange-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Center - Large Banner */}
          <div className="lg:col-span-2">
            <div
              className="relative rounded-lg overflow-hidden h-96 bg-center bg-cover"
              style={{ backgroundImage: `url(${bannerImage})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">MEN'S ACCESSORIES</h2>
                <p className="text-2xl md:text-3xl font-bold">SALE 30% OFF</p>
              </div>
            </div>
          </div>

          {/* Right - Category Grid (2 rows × 3 columns) */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {displayCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-4 text-center flex-1 flex flex-col justify-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{cat.name}</h4>
                    <p className="text-sm text-gray-600">{cat.productCount} PRODUCTS</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionCategories;
