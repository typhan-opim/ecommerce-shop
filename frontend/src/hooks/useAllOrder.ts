import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useAllOrder() {
  return useQuery({
    queryKey: ['allOrder'],
    queryFn: async () => {
      return await getData<any>(SummaryApi.allOrder.url);
    },
    staleTime: 2 * 60 * 1000,
  });
}
