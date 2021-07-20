import { useMutation } from 'react-query';

import {
  createDynamicOption,
  deleteDynamicOption,
} from 'src/client/api/DynamicOptionApi';
import { DynamicOption } from 'src/commons/types/DynamicOption.type';
import { ApiResponse } from 'src/commons/types/Response.type';

type AddMutationOptions = {
  onSuccess: (option: ApiResponse<DynamicOption>) => void;
};

export function useAddOptionMutation(opts: AddMutationOptions) {
  return useMutation(createDynamicOption, opts);
}

export function useDeleteOptionMutation(opts: AddMutationOptions) {
  return useMutation(deleteDynamicOption, opts);
}
