import type { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import axiosLib from 'axios';

const axios = axiosLib.create({
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json; charset=utf-8;',
  } as AxiosRequestHeaders;

  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => response?.data,
  (error: AxiosError) => {
    console.error('[Axios interceptor error]:', error.toJSON());

    return Promise.reject(error);
  },
);

export default axios;
