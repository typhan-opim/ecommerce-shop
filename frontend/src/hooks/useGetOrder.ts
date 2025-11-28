import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useGetOrder() {
  return useQuery({
    queryKey: ['getOrder'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.getOrder.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      return res.json();
    },
    staleTime: 2 * 60 * 1000,
  });
}
