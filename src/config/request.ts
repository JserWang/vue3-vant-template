import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { Toast } from 'vant';
import { ContentTypeEnum, ResCode } from '/@/enums/request';
import type { AxiosOptions, ResponseBody } from '/@/utils/request/types';

export const customOptions: AxiosOptions = {
  // 请求超时时间
  timeout: 3000,
  // 请求前缀
  prefix: process.env.VITE_REQUEST_PREFIX,
  // 请求头设置
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
  },
  withCredentials: true,
  // 默认不显示loading
  loading: false,
  // 当存在msg时，是否提示
  errorTips: true,
};

/**
 * 通用请求拦截器
 * @param config
 */
export const requestInterceptor = (config: AxiosRequestConfig) => {
  return config;
};

/**
 * 通用请求拦截器异常处理
 * @param error
 */
export const requestInterceptorCatch = (error: any) => {
  return Promise.reject(error);
};

/**
 * 通用请求结束拦截器
 * @param res
 */
export const responseInterceptor = (res: AxiosResponse) => {
  return res;
};

/**
 * 通用请求结束拦截器异常处理
 * @param error
 */
export const responseInterceptorCatch = (error: any) => {
  if (axios.isCancel(error)) {
    return Promise.resolve({ code: ResCode.CANCEL });
  }
  return Promise.reject(error);
};

/**
 * 请求前勾子
 * @param opts
 */
export const beforeRequestHook = (opts: AxiosOptions) => {
  if (opts.prefix) {
    opts.url = `${opts.prefix}${opts.url}`;
  }
};

/**
 * 请求结果处理
 * @param response
 * @param resolve
 * @param reject
 */
export const responseCallback = <T>(
  response: ResponseBody<T>,
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void,
  opts: AxiosOptions
) => {
  const { code, data, msg } = response;
  switch (code) {
    case ResCode.SUCCESS:
      resolve(data);
      break;
    case ResCode.CANCEL:
      reject({});
      break;
    default:
      reject(response);
  }

  if (opts.errorTips && msg) {
    Toast(msg);
  }
};
