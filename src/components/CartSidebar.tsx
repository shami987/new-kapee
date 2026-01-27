import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  totalPrice: number;
}

export const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice
}: CartSidebarProps) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const freeShippingThreshold = 120;
  const progressPercentage = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
          <button onClick={onClose} className="p-1 hover:bg-blue-700 rounded">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold flex-1 text-center">MY CART</h2>
          <div className="w-8"></div>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="border-b pb-6">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <button
                        onClick={() => {
                          const newQuantity = item.quantity - 1;
                          if (newQuantity >= 1) {
                            onUpdateQuantity(item.id, newQuantity);
                          }
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600">{item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4 bg-gray-50">
            {/* Subtotal */}
            <div className="flex justify-between items-center font-bold text-lg">
              <span>SUBTOTAL:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* Free Shipping Progress */}
            <div>
              <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden mb-2">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Spend ${Math.max(0, freeShippingThreshold - totalPrice).toFixed(2)} to get <span className="font-semibold text-blue-600">free shipping</span>
              </p>
            </div>

            {/* Buttons */}
            <button className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors">
              VIEW CART
            </button>
            <button 
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="w-full bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition-colors"
            >
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};