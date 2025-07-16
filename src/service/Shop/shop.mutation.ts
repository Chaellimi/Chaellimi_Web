import { useMutation } from '@tanstack/react-query';
import API from './shop.api';

export const usePostBuyProduct = (id: string) => {
  return useMutation({
    mutationFn: () => API.postBuyProduct(id),
  });
};
