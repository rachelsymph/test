import { Give } from 'src/commons/types/Give.type';
import { ApiResponse } from 'src/commons/types/Response.type';

import ApiClient from './ApiClient';

const apiVersion = '1.0';
const endpoint = 'gives';
const url = `${apiVersion}/${endpoint}`;

type GetGivesParams = {
  cursor?: string;
};

export async function getGives(
  params: GetGivesParams
): Promise<ApiResponse<Give[]>> {
  const { data } = await ApiClient.get<ApiResponse<Give[]>>(url, {
    params,
  });

  return data;
}
