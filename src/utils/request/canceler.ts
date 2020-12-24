import type { AxiosRequestConfig, Canceler as AxiosCanceler } from 'axios';
import axios from 'axios';
import { genUniqueReqKey } from './utils';

class Canceler {
  private requestMap: Map<string, AxiosCanceler>;

  constructor() {
    this.requestMap = new Map<string, AxiosCanceler>();
  }

  add(config: AxiosRequestConfig) {
    this.remove(config);
    const uniqueKey = genUniqueReqKey(config);
    config.cancelToken = new axios.CancelToken((cancel) => {
      if (!this.requestMap.has(uniqueKey)) {
        this.requestMap.set(uniqueKey, cancel);
      }
    });
  }

  remove(config: AxiosRequestConfig) {
    const uniqueKey = genUniqueReqKey(config);
    if (this.requestMap.has(uniqueKey)) {
      const cancel = this.requestMap.get(uniqueKey);
      cancel && cancel(uniqueKey);
      this.requestMap.delete(uniqueKey);
    }
  }

  removeAll() {
    this.requestMap.forEach((cancel) => {
      cancel && cancel();
    });

    this.requestMap.clear();
  }

  reset() {
    this.requestMap = new Map<string, AxiosCanceler>();
  }
}

export default new Canceler();
