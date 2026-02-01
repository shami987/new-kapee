import { apiClient } from './api';
import type { CartItem } from '../types';

export const cartAPI = {
  // Get user's cart
  getCart: () => apiClient.get<CartItem[]>('/cart'),
  
  // Add item to cart
  addToCart: (productId: string, quantity: number = 1) => 
    apiClient.post('/cart', { productId, quantity }),
  
  // Update item quantity - PUT /cart/:productId
  updateCartItem: (productId: string, quantity: number) => 
    apiClient.put(`/cart/${productId}`, { quantity }),
  
  // Remove item from cart - DELETE /cart/:productId
  removeFromCart: (productId: string) => 
    apiClient.delete(`/cart/${productId}`),
  
  // Clear entire cart
  clearCart: () => apiClient.delete('/cart'),
};