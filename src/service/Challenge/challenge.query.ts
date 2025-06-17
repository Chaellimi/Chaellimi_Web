import { useQuery } from '@tanstack/react-query';
import { challengeKeys } from './challenge.key';
import API from './challenge.api';
import { ChallengFilter } from '@/types/Challenge';

export const useGetChallenge = (filter?: ChallengFilter) => {
  return useQuery({
    queryKey: [challengeKeys.useGetChallenge, filter],
    queryFn: () => API.getChallenge(filter || {}),
  });
};
