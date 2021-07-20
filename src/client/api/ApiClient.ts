import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import config from 'src/client/configs';

export const baseURL = `${config.API_URL}/api/`;

const ApiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export const responseInterceptor = ApiClient.interceptors.response.use(
  (res) => res,
  interceptErrorResponse
);
export const requestInterceptor = ApiClient.interceptors.request.use(
  interceptAuthRequest,
  interceptErrorResponse
);

function interceptErrorResponse(error: AxiosError) {
  throw error;
}

async function interceptAuthRequest(oldConfig: AxiosRequestConfig) {
  return oldConfig;
}

export default ApiClient;
