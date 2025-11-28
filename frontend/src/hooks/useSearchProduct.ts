import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useSearchProduct(query: string) {
  return useQuery({
    queryKey: ['searchProduct', query],
    queryFn: async () => {
      const url = `${SummaryApi.searchProduct.url}?search=${encodeURIComponent(query)}`;
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to search products');
      return res.json();
    },
    enabled: !!query,
    staleTime: 2 * 60 * 1000,
  });
}
