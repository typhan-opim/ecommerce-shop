import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useAddToCartProductCount() {
  return useQuery({
    queryKey: ['addToCartProductCount'],
    queryFn: async () => {
      return await getData<any>(SummaryApi.addToCartProductCount.url);
    },
    staleTime: 2 * 60 * 1000,
  });
}
