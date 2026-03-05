import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/productService';

export const PRODUCTS_QUERY_KEY = ['products'] as const;

export const useProducts = () =>
  useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

