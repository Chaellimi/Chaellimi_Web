import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from './admin.api';
import { adminKeys } from './admin.key';

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

export const useGetAdminInventory = () => {
  return useQuery({
    queryKey: [adminKeys.useGetAdminInventory],
    queryFn: () => API.getAdminInventory(),
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

export const useDeleteAdminInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.deleteAdminInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [adminKeys.useGetAdminInventory],
      });
    },
  });
};
