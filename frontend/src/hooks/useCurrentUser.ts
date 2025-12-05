import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['current_user'],
    queryFn: async () => {
      const response = await getData<any>(SummaryApi.current_user.url);
      if (response.success) {
        return response.data;
      }
      return null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
