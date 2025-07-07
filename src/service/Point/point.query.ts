import { useQuery } from '@tanstack/react-query';
import API from './point.api';
import { pointKeys } from './point.key';

export const useGetPoint = () => {
  return useQuery({
    queryKey: [pointKeys.useGetPoint],
    queryFn: () => API.getPoint(),
  });
};
