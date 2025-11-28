import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useAddToCartProductCount() {
  return useQuery({
    queryKey: ['addToCartProductCount'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.addToCartProductCount.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch cart product count');
      return res.json();
    },
    staleTime: 2 * 60 * 1000,
  });
}
