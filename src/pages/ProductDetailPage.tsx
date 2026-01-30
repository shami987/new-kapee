import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, Heart, Share2, Truck, HelpCircle, Minus, Plus } from 'lucide-react';

import { Header } from '../components/Header';
import { CartSidebar } from '../components/CartSidebar';
import { useCart } from '../hooks/useCart';
import { getProductById } from '../services/productService';
import { products as localProducts } from '../data/products';



export const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    cartItems,
    addToCart,
    getTotalItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice
  } = useCart();

  const { data: fetchedProduct, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  // Fallback to local products if API fails
  const product = fetchedProduct || localProducts.find(p => p._id === id);

  console.log('Product data:', product); // Debug log

  if (isLoading) return <div className="p-10">Loading product...</div>;
  if (!product) return <div className="p-10">Product not found</div>;

  const images = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemsCount={getTotalItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={() => {}}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex space-x-2 mt-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 border-2 rounded ${
                    selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            {product.category && (
              <p className="text-blue-600 font-medium">
                Category: {typeof product.category === 'object' ? product.category.name : product.category}
              </p>
            )}
            
            {product.description && (
              <p className="text-gray-600 text-lg">{product.description}</p>
            )}

            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-gray-600">({product.reviews || 0} reviews)</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold">${product.price || 0}</span>
              {product.originalPrice && (
                <span className="line-through text-gray-500 text-xl">
                  ${product.originalPrice}
                </span>
              )}
              {product.isSale && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  Sale
                </span>
              )}
            </div>

            {/* Quantity + Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2"
                >
                  <Minus />
                </button>

                <span className="px-6 py-2 border-x">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2"
                >
                  <Plus />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setIsCartOpen(true);
                }}
                className="bg-orange-500 text-white px-8 py-3 rounded hover:bg-orange-600"
              >
                ADD TO CART
              </button>

              <button className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600">
                BUY NOW
              </button>
            </div>

            {/* Actions */}
            <div className="flex space-x-6 text-gray-600">
              <button className="flex items-center space-x-1">
                <Heart />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center space-x-1">
                <Share2 />
                <span>Share</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Truck />
                <span>Delivery & Return</span>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle />
                <span>Ask a Question</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
