import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { Toast } from './Toast';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onLoginRequired?: () => void;
  isFeatured?: boolean;
}

export const ProductCard = ({ product, onAddToCart, onLoginRequired, isFeatured }: ProductCardProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      // Add to cart (works for both logged in and non-logged in users)
      await addToCart(product, 1);
      
      // Show success toast
      setShowToast(true);
      
      // Call the optional callback if provided
      onAddToCart?.(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // If user is not logged in and backend fails, still show login modal
      if (!isLoggedIn) {
        onLoginRequired?.();
      }
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <>
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors flex items-center justify-center space-x-1"
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      
      <Toast
        message={`${product.name} added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </>
  );
};