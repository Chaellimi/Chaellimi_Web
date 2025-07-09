import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { challengeKeys } from './challenge.key';
import API from './challenge.api';
import { ChallengeFilter } from '@/types/Challenge';

export const useGetChallenge = (filter?: ChallengeFilter) => {
  return useQuery({
    queryKey: [challengeKeys.useGetChallenge, filter],
    queryFn: () => API.getChallenge(filter || {}),
  });
};

export const useGetChallengeById = (id: number, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: [challengeKeys.useGetChallengeById, id],
    queryFn: () => API.getChallengeById(id),
    ...options,
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

export const useGetChallengeProgressLog = (challengeId: string) => {
  return useQuery({
    queryKey: [challengeKeys.useGetChallengeProgressLog, challengeId],
    queryFn: () => API.getChallengeProgressLog(challengeId),
  });
};
