import { useQuery } from '@tanstack/react-query';
import { challengeKeys } from './challenge.key';
import API from './challenge.api';

export const useGetChallenge = () => {
  return useQuery({
    queryKey: [challengeKeys.useGetChallenge],
    queryFn: API.getChallenge,
  });
};
