import { apiClient } from '../../services/api';
import type { Order, Product } from '../../types';

// Admin Orders API - handles all order management operations
export const adminOrdersAPI = {
  // Fetch all orders from the backend
  getOrders: () => {
    try {
      return apiClient.get<Order[]>('/admin/orders');
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
  
  // Fetch a specific order by ID
  getOrder: (id: string) => {
    try {
      return apiClient.get<Order>(`/admin/orders/${id}`);
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },
  
  // Update order status (e.g., pending -> paid -> shipped -> completed)
  updateOrderStatus: (id: string, status: Order['status']) => {
    try {
      return apiClient.put(`/admin/orders/${id}`, { status });
    } catch (error) {
      console.error(`Error updating order ${id} status:`, error);
      throw error;
    }
  },
  
  // Delete an order (with admin privileges)
  deleteOrder: (id: string) => {
    try {
      return apiClient.delete(`/admin/orders/${id}`);
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
      throw error;
    }
  },
};

// Admin Products API - handles product management operations
export const adminProductsAPI = {
  // Fetch all products for admin management
  getProducts: () => {
    try {
      return apiClient.get<Product[]>('/admin/products');
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Fetch a specific product by ID
  getProduct: (id: number) => {
    try {
      return apiClient.get<Product>(`/admin/products/${id}`);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new product
  createProduct: (product: Omit<Product, 'id'>) => {
    try {
      return apiClient.post<Product>('/admin/products', product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },
  
  // Update an existing product
  updateProduct: (id: number, product: Partial<Product>) => {
    try {
      return apiClient.put<Product>(`/admin/products/${id}`, product);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a product
  deleteProduct: (id: number) => {
    try {
      return apiClient.delete(`/admin/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
};

// Admin Customers API - handles customer management operations
export const adminCustomersAPI = {
  // Fetch all customers
  getCustomers: () => {
    try {
      return apiClient.get('/admin/customers');
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },
  
  // Fetch a specific customer by ID
  getCustomer: (id: number) => {
    try {
      return apiClient.get(`/admin/customers/${id}`);
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a customer account
  deleteCustomer: (id: number) => {
    try {
      return apiClient.delete(`/admin/customers/${id}`);
    } catch (error) {
      console.error(`Error deleting customer ${id}:`, error);
      throw error;
    }
  },
};

// Admin Dashboard Stats API - handles analytics and reporting
export const adminStatsAPI = {
  // Fetch general dashboard statistics
  getStats: () => {
    try {
      return apiClient.get('/admin/stats');
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  },
  
  // Fetch revenue data for charts (weekly, monthly, yearly)
  getRevenueData: (period: 'week' | 'month' | 'year') => {
    try {
      return apiClient.get(`/admin/stats/revenue?period=${period}`);
    } catch (error) {
      console.error(`Error fetching revenue data for ${period}:`, error);
      throw error;
    }
  },
};
