import { User } from 'src/commons/types/User.type';

import ApiClient from './ApiClient';

type RegisterParams = {
  email: string;
  name: string;
  password: string;
  username: string;
};

type LoginParams = {
  password: string;
  username: string;
};

const apiVersion = '1.0';
const endpoint = 'auth';
const url = `${apiVersion}/${endpoint}`;

export async function login(params: LoginParams): Promise<User> {
  const { data } = await ApiClient.post<User>(`${url}/login`, params);

  return data;
}

export async function logout(): Promise<User> {
  const { data } = await ApiClient.post<User>(`${url}/logout`);

  return data;
}

export async function register(params: RegisterParams): Promise<User> {
  const { data } = await ApiClient.post<User>(`${url}/register`, params);

  return data;
}
