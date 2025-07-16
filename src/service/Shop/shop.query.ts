import { useQuery } from '@tanstack/react-query';
import { shopKeys } from './shop.key';
import API from './shop.api';

export const useGetProduct = () => {
  return useQuery({
    queryKey: [shopKeys.useGetProduct],
    queryFn: () => API.getProduct(),
  });
};
