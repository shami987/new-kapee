import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/categoryService';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

export const useCategories = () =>
  useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

