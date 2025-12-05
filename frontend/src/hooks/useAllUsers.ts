import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useAllUsers() {
  return useQuery({
    queryKey: ['allUser'],
    queryFn: async () => {
      return await getData<any>(SummaryApi.allUser.url);
    },
    staleTime: 5 * 60 * 1000,
  });
}
