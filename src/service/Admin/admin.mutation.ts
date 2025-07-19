import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from './admin.api';
import { adminKeys } from './admin.key';
import { shopKeys } from '../Shop/shop.key';

export const useEditAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.editAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminKeys.useGetAdminUser] });
    },
  });
};

export const useEditAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.editAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [shopKeys.useGetProduct] });
    },
  });
};

export const useCreateAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.createAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [shopKeys.useGetProduct] });
    },
  });
};

export const useDeleteAdminProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.deleteAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [shopKeys.useGetProduct] });
    },
  });
};

export const useCreateAdminInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.createAdminInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [adminKeys.useGetAdminInventory],
      });
    },
  });
};
