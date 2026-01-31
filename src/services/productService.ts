import { apiClient } from './api';

export const getAllProducts = async (): Promise<any[]> => {
  const res = await apiClient.get('/products');
  return res.data.products;
};

// Alias for backward compatibility
export const getProducts = getAllProducts;

export const getProductsByCategory = async (category: string): Promise<any[]> => {
  const res = await apiClient.get(`/products/category/${category}`);
  return res.data.products;
};

export const getProductById = async (id: string) => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data.product || res.data; // Handle both response formats
};
