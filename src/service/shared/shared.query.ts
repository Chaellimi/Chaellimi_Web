import { useQuery } from '@tanstack/react-query';
import { sharedKeys } from './shared.key';
import API from './shared.api';

export const useGetUserRole = () => {
  return useQuery({
    queryKey: [sharedKeys.useGetUserRole],
    queryFn: () => API.getUserRole(),
  });
};
