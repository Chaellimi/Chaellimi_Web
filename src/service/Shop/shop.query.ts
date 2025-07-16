import { useQuery } from '@tanstack/react-query';
import { shopKeys } from './shop.key';
import API from './shop.api';

export const useGetProduct = () => {
  return useQuery({
    queryKey: [shopKeys.useGetProduct],
    queryFn: () => API.getProduct(),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: [shopKeys.useGetProductById, id],
    queryFn: () => API.getProductById(id),
  });
};

export const useGetCustody = () => {
  return useQuery({
    queryKey: [shopKeys.useGetCustody],
    queryFn: () => API.getCustody(),
  });
};
