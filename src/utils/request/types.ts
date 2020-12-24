import type { AxiosRequestConfig } from 'axios';

export interface AxiosOptions extends AxiosRequestConfig {
  prefix?: string;
  loading?: boolean;
  errorTips?: boolean;
}

/**
 * 后端返回基础结构
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResponseBody<T = any> {
  code: number;
  msg: string;
  data: T;
}
