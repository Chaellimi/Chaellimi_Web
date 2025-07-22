import { useMutation } from '@tanstack/react-query';
import API from './profile.api';

export const useEditUser = () => {
  return useMutation({
    mutationFn: ({ name, profileImg }: { name: string; profileImg: string }) =>
      API.editProfileUser(name, profileImg),
  });
};
