import { useQuery } from '@tanstack/react-query';
import { profileKeys } from './profile.key';
import API from './profile.api';

export const useGetProfileDetail = () => {
  return useQuery({
    queryKey: [profileKeys.useGetProfileDetail],
    queryFn: () => API.getProfileDetail(),
  });
};
