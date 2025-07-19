import { useQuery } from '@tanstack/react-query';
import API from './admin.api';
import { adminKeys } from './admin.key';

export const useGetAdminHome = () => {
  return useQuery({
    queryKey: [adminKeys.useGetAdminHome],
    queryFn: () => API.getAdminHome(),
  });
};
