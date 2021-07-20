import { ApiResponse } from 'src/commons/types/Response.type';
import { User } from 'src/commons/types/User.type';

import ApiClient from './ApiClient';

const apiVersion = '1.0';
const endpoint = 'users';
const url = `${apiVersion}/${endpoint}`;

type SearchUserParams = {
  q: string;
  role: string;
};

export async function getCurrentUser(): Promise<User> {
  const { data } = await ApiClient.get<User>(`${url}/me`);

  return data;
}

export async function getUser(id: string): Promise<User> {
  const { data } = await ApiClient.get<User>(`${url}/${id}`);

  return data;
}

export async function getUsers(
  params?: Partial<SearchUserParams>
): Promise<User[]> {
  const { data } = await ApiClient.get<User[]>(url, { params });

  return data;
}

export async function createUser(
  params: Partial<User>
): Promise<ApiResponse<User>> {
  const { data } = await ApiClient.post<ApiResponse<User>>(url, params);

  return data;
}

export async function updateUser(
  params: Partial<User>
): Promise<ApiResponse<User>> {
  const { data } = await ApiClient.put<ApiResponse<User>>(
    `${url}/${params.id}`,
    params
  );

  return data;
}

export async function deleteUser(
  params: Partial<User>
): Promise<ApiResponse<User>> {
  const { data } = await ApiClient.delete<ApiResponse<User>>(
    `${url}/${params.id}`
  );

  return data;
}
