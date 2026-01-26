import { useState } from 'react';
import { X, Star, Heart, Share2, Truck, Shield, RotateCcw, HelpCircle, Minus, Plus } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetail = ({ product, isOpen, onClose, onAddToCart }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen) return null;

  const images = [product.image, product.image, product.image];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Home / Shop / Watches / Leather</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex space-x-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded border-2 overflow-hidden ${selectedImage === idx ? 'border-blue-500' : 'border-gray-200'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.isSale && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">42% Off</span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Bank Offer 10% instant Discount on VISA Cards, T&C</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Special Price Get extra 20% off (price inclusive of discount), T&C</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">No cost EMI ₹8 months, Standard EMI also available, View Plans</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold">W</div>
                  <span className="font-semibold">WATCH</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Watch Machine</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Services:</span>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>• 30 Day Return Policy</li>
                      <li>• Cash on Delivery available</li>
                      <li>• Free Delivery</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">Highlights:</span>
                    <ul className="mt-1 space-y-1 text-gray-600">
                      <li>• Adjustable bracelet</li>
                      <li>• Mineral crystal face</li>
                      <li>• Quartz movement</li>
                      <li>• Water resistant</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  className="bg-orange-500 text-white px-8 py-3 rounded font-medium hover:bg-orange-600"
                >
                  ADD TO CART
                </button>
                <button className="bg-red-500 text-white px-8 py-3 rounded font-medium hover:bg-red-600">
                  BUY NOW
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Heart className="h-4 w-4" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <Share2 className="h-4 w-4" />
                  <span>Compare</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-gray-600" />
                  <span>Delivery & Return</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-gray-600" />
                  <span>Ask a Question</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>Estimated Delivery: 25 January - 02 February</p>
                <p className="mt-1">29 People viewing this product right now!</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Guaranteed Safe Checkout</p>
                <div className="flex space-x-2">
                  {['AMEX', 'Apple Pay', 'Google Pay', 'Mastercard', 'PayPal', 'Visa'].map((payment) => (
                    <div key={payment} className="bg-gray-100 px-2 py-1 rounded text-xs">{payment}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};