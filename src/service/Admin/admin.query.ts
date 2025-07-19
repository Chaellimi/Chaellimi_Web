import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from './admin.api';
import { adminKeys } from './admin.key';
import { shopKeys } from '../Shop/shop.key';

export const useGetAdminHome = () => {
  return useQuery({
    queryKey: [adminKeys.useGetAdminHome],
    queryFn: () => API.getAdminHome(),
  });
};

export const useGetAdminUser = () => {
  return useQuery({
    queryKey: [adminKeys.useGetAdminUser],
    queryFn: () => API.getAdminUser(),
  });
};

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

export const useGetAdminInventory = () => {
  return useQuery({
    queryKey: [adminKeys.useGetAdminInventory],
    queryFn: () => API.getAdminInventory(),
  });
};
