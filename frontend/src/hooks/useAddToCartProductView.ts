import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useAddToCartProductView() {
  return useQuery({
    queryKey: ['addToCartProductView'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.addToCartProductView.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch cart products');
      return res.json();
    },
    staleTime: 2 * 60 * 1000,
  });
}
