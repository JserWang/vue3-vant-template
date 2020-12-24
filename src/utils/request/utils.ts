import type { AxiosRequestConfig } from 'axios';

export const genUniqueReqKey = (config: AxiosRequestConfig) => {
  const { method, url, data, params } = config;
  return [method, url, JSON.stringify(data), JSON.stringify(params)].join('|');
};
