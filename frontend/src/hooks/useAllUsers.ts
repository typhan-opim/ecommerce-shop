import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useAllUsers() {
  return useQuery({
    queryKey: ['allUser'],
    queryFn: async () => {
      const res = await fetch(SummaryApi.allUser.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}
