import {
  customOptions,
  requestInterceptor,
  requestInterceptorCatch,
  responseCallback,
  responseInterceptor,
  responseInterceptorCatch,
} from '@/config/request';
import { MethodEnum } from '@/enums/request';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import Canceler from './canceler';
import useLoading from './loading';
import { AxiosOptions, ResponseBody } from './types';
import { genUniqueReqKey } from './utils';

const appendUrl = (url: string, str: string): string =>
  `${url}${url.indexOf('?') > -1 ? '&' : '?'}${str}`;

const pendingList = new Map<string, any>();

const instance = axios.create();

const setupInterceptors = () => {
  instance.interceptors.request.use((config) => {
    Canceler.add(config);

    if (requestInterceptor) {
      config = requestInterceptor(config);
    }

    return config;
  }, requestInterceptorCatch);

  instance.interceptors.response.use((res: AxiosResponse) => {
    Canceler.remove(res.config);

    if (responseInterceptor) {
      res = responseInterceptor(res);
    }

    return res;
  }, responseInterceptorCatch);
};

setupInterceptors();

const fetch = <T, R = ResponseBody<T>>(opts: AxiosOptions): Promise<T> => {
  const uniqueKey = genUniqueReqKey(opts);
  // 保证请求队列中相同请求只有一个，防止类似“重复点击”导致的重复请求
  if (pendingList.has(uniqueKey)) {
    return pendingList.get(uniqueKey);
  }

  // 全局loading
  const { show, hide } = useLoading();
  opts.loading && show();

  const promise = new Promise<T>((resolve, reject) => {
    instance
      .request<R>(opts)
      .then((response) => {
        const resp = (response.data as unknown) as ResponseBody<T>;
        responseCallback<T>(resp, resolve, reject, opts);
      })
      .catch((e: Error) => {
        reject(e);
      })
      .finally(() => {
        pendingList.delete(uniqueKey);
        hide();
      });
  });

  pendingList.set(uniqueKey, promise);

  return promise;
};

export default {
  get<T>(url: string, opts?: AxiosOptions) {
    return fetch<T>({
      ...customOptions,
      ...opts,
      method: MethodEnum.GET,
      // 追加当前时间戳，防止GET请求缓存
      url: appendUrl(url, `_t=${Date.now()}`),
      params: opts ? opts.data : {},
    });
  },
  post<T>(url: string, opts?: AxiosOptions) {
    return fetch<T>({
      ...customOptions,
      ...opts,
      url,
      method: MethodEnum.POST,
    });
  },
};
