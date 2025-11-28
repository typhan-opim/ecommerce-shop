import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useAllOrder() {
  return useQuery({
    queryKey: ['allOrder'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.allOrder.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch all orders');
      return res.json();
    },
    staleTime: 2 * 60 * 1000,
  });
}
