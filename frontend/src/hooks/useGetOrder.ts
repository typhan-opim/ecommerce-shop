import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useGetOrder() {
  return useQuery({
    queryKey: ['getOrder'],
    queryFn: async () => {
      return await getData<any>(SummaryApi.getOrder.url);
    },
    staleTime: 2 * 60 * 1000,
  });
}
