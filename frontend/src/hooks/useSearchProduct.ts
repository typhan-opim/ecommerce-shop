import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useSearchProduct(query: string) {
  return useQuery({
    queryKey: ['searchProduct', query],
    queryFn: async () => {
      const url = `${SummaryApi.searchProduct.url}?search=${encodeURIComponent(query)}`;
      return await getData<any>(url);
    },
    enabled: !!query,
    staleTime: 2 * 60 * 1000,
  });
}
