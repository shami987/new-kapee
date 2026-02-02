import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/productService';
import { useQuery } from '@tanstack/react-query';

const categories = [
  { letter: 'B', name: 'BEAUTY', tagline: 'BEAUTY TAGLINE' },
  { letter: 'D', name: 'DESIGN', tagline: 'DESIGN TAGLINE' },
  { letter: 'D', name: 'DRESS', tagline: 'DRESS TAGLINE' },
  { letter: 'F', name: 'FASHION', tagline: 'FASHION TAGLINE' },
  { letter: 'J', name: 'JACKET', tagline: 'JACKET TAGLINE' },
  { letter: 'S', name: 'SHOES', tagline: 'SHOES TAGLINE' }
];

export const ProductTabs = () => {
  const navigate = useNavigate();
  const tabs = ['RECENT', 'FEATURED', 'ON SALE', 'TOP RATED'] as const;

  // Fetch products from backend
  const { data: backendProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  // Organize products by category
  const productData = {
    RECENT: backendProducts.slice(0, 3),
    FEATURED: backendProducts.filter((p: any) => p.isSale || p.isNew).slice(0, 3),
    'ON SALE': backendProducts.filter((p: any) => p.isSale).slice(0, 3),
    'TOP RATED': backendProducts.filter((p: any) => p.rating >= 4).slice(0, 3)
  };

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
                {productData[tab].map((product: any) => (
                  <div 
                    key={product._id || product.id} 
                    className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer group"
                    onClick={() => navigate(`/product/${product._id || product.id}`)}
                  >
                    <div className="relative overflow-hidden rounded flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
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