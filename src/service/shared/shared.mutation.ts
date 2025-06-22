import { useMutation } from '@tanstack/react-query';
import API from './shared.api';

export const useUploadImg = () => {
  return useMutation({
    mutationFn: API.postUploadImg,
  });
};
