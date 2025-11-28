import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['current_user'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method.toUpperCase(),
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
