import { useMutation } from 'react-query';

import { createUser, deleteUser, updateUser } from 'src/client/api/UserApi';
import { ApiResponse } from 'src/commons/types/Response.type';
import { User } from 'src/commons/types/User.type';

type CommonUserOptions = {
  onSuccess: (option: ApiResponse<User>) => void;
};

export function useAddUserMutation(opts: CommonUserOptions) {
  return useMutation(createUser, opts);
}

export function useUpdateUserMutation(opts: CommonUserOptions) {
  return useMutation(updateUser, opts);
}

export function useDeleteUserMutation(opts: CommonUserOptions) {
  return useMutation(deleteUser, opts);
}
