import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onLoginRequired?: () => void; // Called when user is not logged in
  isFeatured?: boolean;
}

export const ProductCard = ({ product, onAddToCart, onLoginRequired, isFeatured }: ProductCardProps) => {
  const navigate = useNavigate();
  // Get the logged-in status from auth context
  const { isLoggedIn } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!isLoggedIn) {
      // If not logged in, trigger login modal instead of adding to cart
      onLoginRequired?.();
      return;
    }
    
    try {
      // User is logged in, proceed with adding to cart
      onAddToCart(product);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
      onClick={handleProductClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={product.name || 'Product image'}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded">
            FEATURED
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            Sale
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{typeof product.category === 'object' ? product.category?.name || 'Category' : product.category}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4 flex-grow items-end">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={false}
          className={`w-full text-white px-3 py-2 rounded-md transition-colors flex items-center justify-center space-x-1 ${
            !isLoggedIn
              ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-500' // Disabled look when not logged in
              : 'bg-blue-600 hover:bg-blue-700' // Normal look when logged in
          }`}
          title={!isLoggedIn ? 'Please log in to add items to cart' : 'Add to cart'}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{!isLoggedIn ? 'Login to Add' : 'Add'}</span>
        </button>
      </div>
    </div>
  );
};