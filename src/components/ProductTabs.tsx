import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
}

const productData = {
  RECENT: [
    {
      id: '1',
      name: 'Men Hooded Navy Blue & Gr...',
      price: 70.00,
      originalPrice: 95.00,
      rating: 5,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-5.jpg'
    },
    {
      id: '2',
      name: 'Navy Blue-Silver-White Multi...',
      price: 49.00,
      originalPrice: 85.00,
      rating: 4,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Navy-BlueSilver-White-Multifunction-Analog-Watch.jpg'
    },
    {
      id: '3',
      name: 'Women Off White Printed Bl...',
      price: 47.00,
      rating: 2.7,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Blouson-Top.jpg'
    }
  ],
  FEATURED: [
    {
      id: '4',
      name: 'Men Hooded Navy Blue & Gr...',
      price: 70.00,
      originalPrice: 95.00,
      rating: 5,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt-5.jpg'
    },
    {
      id: '5',
      name: 'Women Off White Printed Bl...',
      price: 47.00,
      rating: 2.7,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Off-White-Printed-Blouson-Top.jpg'
    },
    {
      id: '6',
      name: 'Men Blue Skinny Fit Stretcha...',
      price: 120.00,
      rating: 2,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Blue-Skinny-Fit-Stretchable-Jeans.jpg'
    }
  ],
  'ON SALE': [
    {
      id: '7',
      name: 'Men Hooded Navy Blue & Gr...',
      price: 70.00,
      originalPrice: 95.00,
      rating: 5,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt.jpg'
    },
    {
      id: '8',
      name: 'Navy Blue-Silver-White Multi...',
      price: 49.00,
      originalPrice: 85.00,
      rating: 4,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Navy-BlueSilver-White-Multifunction-Analog-Watch.jpg'
    },
    {
      id: '9',
      name: 'Men Navy & Red Checked Sli...',
      price: 99.00,
      originalPrice: 124.00,
      rating: 3.5,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Navy-Red-Checked-Slim-Fit-Casual-Shirt.jpg'
    }
  ],
  'TOP RATED': [
    {
      id: '10',
      name: 'Men Hooded Navy Blue & Gr...',
      price: 70.00,
      originalPrice: 95.00,
      rating: 5,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt.jpg'
    },
    {
      id: '11',
      name: 'Men Navy & White Striped Sh...',
      price: 49.00,
      originalPrice: 54.00,
      rating: 5,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/06/Men-Navy-White-Striped-Shoes-1.jpg'
    },
    {
      id: '12',
      name: 'Women Blue Skinny Fit Stretc...',
      price: 70.00,
      originalPrice: 78.00,
      rating: 5,
      image: 'https://kapee.presslayouts.com/wp-content/uploads/2019/04/Women-Blue-Skinny-Fit-Stretchable-Jeans.jpg'
    }
  ]
};

const categories = [
  { letter: 'B', name: 'BEAUTY', tagline: 'BEAUTY TAGLINE' },
  { letter: 'D', name: 'DESIGN', tagline: 'DESIGN TAGLINE' },
  { letter: 'D', name: 'DRESS', tagline: 'DRESS TAGLINE' },
  { letter: 'F', name: 'FASHION', tagline: 'FASHION TAGLINE' },
  { letter: 'J', name: 'JACKET', tagline: 'JACKET TAGLINE' },
  { letter: 'S', name: 'SHOES', tagline: 'SHOES TAGLINE' }
];

export const ProductTabs = () => {
  const tabs = ['RECENT', 'FEATURED', 'ON SALE', 'TOP RATED'] as const;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 3.5) return 'bg-green-400';
    if (rating >= 2.5) return 'bg-orange-400';
    return 'bg-orange-500';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tabs.map((tab) => (
            <div key={tab} className="">
              {/* Tab Header */}
              <h3 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b-2 border-blue-500">
                {tab}
              </h3>
              
              {/* Products List */}
              <div className="space-y-4">
                {productData[tab].map((product) => (
                  <div key={product.id} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs text-white px-2 py-1 rounded font-bold ${getRatingColor(product.rating)}`}>
                          {product.rating}★
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Category Tags */}
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-600 text-white px-8 py-6 rounded text-center min-w-[180px] hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="text-3xl font-bold mb-2">{category.letter}</div>
              <div className="text-sm font-bold mb-1">{category.name}</div>
              <div className="text-xs opacity-75 uppercase">{category.tagline}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;