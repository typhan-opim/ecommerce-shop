import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useAddToCartProductView() {
  return useQuery({
    queryKey: ['addToCartProductView'],
    queryFn: async () => {
      return await getData<any>(SummaryApi.addToCartProductView.url);
    },
    staleTime: 2 * 60 * 1000,
  });
}
