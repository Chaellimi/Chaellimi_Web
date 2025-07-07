import { useQuery } from '@tanstack/react-query';
import API from './point.api';
import { pointKeys } from './point.key';
import { PointDetailType } from '@/types/Point';

export const useGetPoint = () => {
  return useQuery({
    queryKey: [pointKeys.useGetPoint],
    queryFn: () => API.getPoint(),
  });
};

export const useGetPointDetail = (type?: PointDetailType) => {
  return useQuery({
    queryKey: [pointKeys.useGetPointDetail],
    queryFn: () => API.getPointDetail(type),
  });
};
