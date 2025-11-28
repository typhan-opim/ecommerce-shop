import { useMutation } from '@tanstack/react-query';
import SummaryApi from '@/common';

export function useLogoutUser() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(SummaryApi.logout_user.url, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Logout failed');
      return res.json();
    },
  });
}
