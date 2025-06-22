import { useQuery } from '@tanstack/react-query';
import { challengeKeys } from './challenge.key';
import API from './challenge.api';
import { ChallengeFilter } from '@/types/Challenge';

export const useGetChallenge = (filter?: ChallengeFilter) => {
  return useQuery({
    queryKey: [challengeKeys.useGetChallenge, filter],
    queryFn: () => API.getChallenge(filter || {}),
  });
};

export const useGetChallengeById = (id: number) => {
  return useQuery({
    queryKey: [challengeKeys.useGetChallengeById, id],
    queryFn: () => API.getChallengeById(id),
  });
};
