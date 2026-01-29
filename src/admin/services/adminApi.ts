import { apiClient } from '../../services/api';
import type { Order, Product } from '../../types';

// Admin Orders API
export const adminOrdersAPI = {
  getOrders: () => apiClient.get<Order[]>('/admin/orders'),
  getOrder: (id: string) => apiClient.get<Order>(`/admin/orders/${id}`),
  updateOrderStatus: (id: string, status: Order['status']) =>
    apiClient.put(`/admin/orders/${id}`, { status }),
  deleteOrder: (id: string) => apiClient.delete(`/admin/orders/${id}`),
};

// Admin Products API
export const adminProductsAPI = {
  getProducts: () => apiClient.get<Product[]>('/admin/products'),
  getProduct: (id: number) => apiClient.get<Product>(`/admin/products/${id}`),
  createProduct: (product: Omit<Product, 'id'>) =>
    apiClient.post<Product>('/admin/products', product),
  updateProduct: (id: number, product: Partial<Product>) =>
    apiClient.put<Product>(`/admin/products/${id}`, product),
  deleteProduct: (id: number) => apiClient.delete(`/admin/products/${id}`),
};

// Admin Customers API
export const adminCustomersAPI = {
  getCustomers: () => apiClient.get('/admin/customers'),
  getCustomer: (id: number) => apiClient.get(`/admin/customers/${id}`),
  deleteCustomer: (id: number) => apiClient.delete(`/admin/customers/${id}`),
};

// Admin Dashboard Stats API
export const adminStatsAPI = {
  getStats: () => apiClient.get('/admin/stats'),
  getRevenueData: (period: 'week' | 'month' | 'year') =>
    apiClient.get(`/admin/stats/revenue?period=${period}`),
};
