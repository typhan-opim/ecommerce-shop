import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useAllProducts() {
  return useQuery({
    queryKey: ['allProduct'],
    queryFn: async () => {
      return await getData<any>(SummaryApi.allProduct.url);
    },
    staleTime: 5 * 60 * 1000,
  });
}
