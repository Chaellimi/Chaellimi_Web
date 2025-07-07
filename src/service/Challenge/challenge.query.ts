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

export const useGetParticipatingChallenge = () => {
  return useQuery({
    queryKey: [challengeKeys.useGetParticipatingChallenge],
    queryFn: API.getParticipatingChallenge,
  });
};

export const useGetPopularChallenge = (limit: number) => {
  return useQuery({
    queryKey: [challengeKeys.useGetPopularChallenge, limit],
    queryFn: () => API.getPopularChallenge(limit),
  });
};
