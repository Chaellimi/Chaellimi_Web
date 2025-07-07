import { useMutation } from '@tanstack/react-query';
import API from './challenge.api';

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
