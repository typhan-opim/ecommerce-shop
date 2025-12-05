import { useQuery } from '@tanstack/react-query';
import SummaryApi from '@/common';
import { getData } from '@/services/apiService';

export function useCategoryProduct() {
  return useQuery({
    queryKey: ['categoryProduct'],
    queryFn: async () => {
      return await getData<any>(SummaryApi.categoryProduct.url);
    },
    staleTime: 5 * 60 * 1000,
  });
}
