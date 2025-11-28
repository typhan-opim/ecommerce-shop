import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useAllProducts() {
  return useQuery({
    queryKey: ['allProduct'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.allProduct.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}
