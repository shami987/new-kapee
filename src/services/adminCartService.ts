import { apiClient } from './api';

export const adminCartAPI = {
  // Get all user carts
  getAllCarts: () => apiClient.get('/admin/carts'),
  
  // Get specific user's cart
  getUserCart: (userId: string) => apiClient.get(`/admin/carts/${userId}`),
  
  // Add item to user's cart
  addItemToUserCart: (userId: string, productId: string, quantity: number) =>
    apiClient.post(`/admin/carts/${userId}`, { productId, quantity }),
  
  // Update user's cart item
  updateUserCartItem: (userId: string, productId: string, quantity: number) =>
    apiClient.put(`/admin/carts/${userId}/${productId}`, { quantity }),
  
  // Remove item from user's cart
  removeUserCartItem: (userId: string, productId: string) =>
    apiClient.delete(`/admin/carts/${userId}/${productId}`),
  
  // Clear user's cart
  clearUserCart: (userId: string) =>
    apiClient.delete(`/admin/carts/${userId}`),
};