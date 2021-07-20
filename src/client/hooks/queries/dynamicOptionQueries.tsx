import { QueryClient, useQuery } from 'react-query';

import { getDynamicOptions } from 'src/client/api/DynamicOptionApi';
import { FormField } from 'src/commons/constants/fields';
import { DynamicOption } from 'src/commons/types/DynamicOption.type';

export const GET_DYNAMIC_OPTIONS_KEY = 'GET_DYNAMIC_OPTIONS_KEY';

const GET_MEMBERSHIP_KEY = [
  GET_DYNAMIC_OPTIONS_KEY,
  FormField.MEMBERSHIP_STATUS,
];

export function useGetDynamicOptions(formField: FormField) {
  return useQuery([GET_DYNAMIC_OPTIONS_KEY, formField], () =>
    getDynamicOptions(formField)
  );
}

export function addDynamicOptionQueryData(
  queryClient: QueryClient,
  data: DynamicOption
) {
  queryClient.setQueryData(
    GET_MEMBERSHIP_KEY,
    (old: DynamicOption[] | undefined) => [...(old || []), data]
  );
}

export function removeDynamicOptionQueryData(
  queryClient: QueryClient,
  data: DynamicOption
) {
  queryClient.setQueryData(
    GET_MEMBERSHIP_KEY,
    (old: DynamicOption[] | undefined) =>
      [...(old || [])].filter((o) => o.id !== data.id)
  );
}
