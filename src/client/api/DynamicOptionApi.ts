import { FormField } from 'src/commons/constants/fields';
import { DynamicOption } from 'src/commons/types/DynamicOption.type';
import { ApiResponse } from 'src/commons/types/Response.type';

import ApiClient from './ApiClient';

const apiVersion = '1.0';
const endpoint = 'options';
const url = `${apiVersion}/${endpoint}`;

type CreateParams = {
  dynamicOption: Partial<DynamicOption>;
};

type DeleteParams = {
  id: string;
};

export async function getDynamicOptions(
  field: FormField
): Promise<DynamicOption[]> {
  const { data } = await ApiClient.get<DynamicOption[]>(url, {
    params: {
      field,
    },
  });

  return data;
}

export async function createDynamicOption(
  params: CreateParams
): Promise<ApiResponse<DynamicOption>> {
  const { data } = await ApiClient.post<ApiResponse<DynamicOption>>(
    url,
    params.dynamicOption
  );

  return data;
}

export async function deleteDynamicOption(
  params: DeleteParams
): Promise<ApiResponse<DynamicOption>> {
  const { data } = await ApiClient.delete<ApiResponse<DynamicOption>>(
    `${url}/${params.id}`
  );

  return data;
}
