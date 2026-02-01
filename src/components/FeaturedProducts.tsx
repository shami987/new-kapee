import type { Product } from '../types';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './ProductCard';
import { products as localProducts } from '../data/products';
import { getAllProducts } from '../services/productService';

export const FeaturedProducts = ({
  onAddToCart,
  onLoginRequired,
  onViewAll,
}: {
  onAddToCart: (product: Product) => void;
  onLoginRequired?: () => void;
  onViewAll?: () => void;
}) => {

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  if (isLoading) return <p>Loading products...</p>;

  // Use API products if available, otherwise fallback to local products
  const allProducts = products.length > 0 ? products : localProducts;
  const featuredProducts = Array.isArray(allProducts) ? allProducts.slice(0, 10) : [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">FEATURED PRODUCTS</h2>
          <button
            onClick={onViewAll}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            VIEW ALL
          </button>
        </div>

        <div className="relative flex items-center">
          <div
            className="overflow-x-auto flex gap-6 scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="w-72 flex-shrink-0"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onLoginRequired={onLoginRequired}
                  isFeatured
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
