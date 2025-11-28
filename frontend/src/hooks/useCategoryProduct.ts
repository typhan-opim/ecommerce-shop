import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useCategoryProduct() {
  return useQuery({
    queryKey: ['categoryProduct'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.categoryProduct.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch category products');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}
