import { useQuery, useMutation } from '@tanstack/react-query';
import { sharedKeys } from './shared.key';
import API from './shared.api';

export const useGetUserRole = () => {
  return useQuery({
    queryKey: [sharedKeys.useGetUserRole],
    queryFn: () => API.getUserRole(),
  });
};

export const useGetProfileChallengeState = () => {
  return useQuery({
    queryKey: [sharedKeys.useGetProfileChallengeState],
    queryFn: () => API.getProfileChallengeState(),
  });
};

export const useGetBookmarkList = () => {
  return useQuery({
    queryKey: [sharedKeys.useGetBookmarkList],
    queryFn: () => API.getBookmarkList(),
  });
};

export const usePostUploadImg = () => {
  return useMutation({
    mutationFn: API.postUploadImg,
  });
};
