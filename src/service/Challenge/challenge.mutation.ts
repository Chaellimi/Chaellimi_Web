import { useMutation } from '@tanstack/react-query';
import API from './challenge.api';
import { ChallengeWriteType } from '@/types/Challenge';

export const useCreateChallenge = () => {
  return useMutation({
    mutationFn: API.postChallenge,
  });
};

export const useCertificationChallenge = () => {
  return useMutation({
    mutationFn: API.postCertification,
  });
};

export const useDeleteChallenge = () => {
  return useMutation({
    mutationFn: API.deleteChallenge,
  });
};

export const useUpdateChallenge = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ChallengeWriteType }) =>
      API.updateChallenge(id, data),
  });
};

export const useJoinChallenge = () => {
  return useMutation({
    mutationFn: API.postJoinChallenge,
  });
};
