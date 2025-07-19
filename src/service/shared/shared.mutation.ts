import { useMutation } from '@tanstack/react-query';
import API from './shared.api';

export const useUploadImg = () => {
  return useMutation({
    mutationFn: API.postUploadImg,
  });
};

export const usePostBookmarkUpdate = () => {
  return useMutation({
    mutationFn: API.postBookmarkUpdate,
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: API.logoutUser,
  });
};
