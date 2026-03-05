import { apiClient } from './api';

export const getCategories = async () => {
  const res = await apiClient.get('/categories');
  return Array.isArray(res.data) ? res.data : (res.data?.categories ?? []);
};
