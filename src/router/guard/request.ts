import type { Router } from 'vue-router';
import Canceler from '/@/utils/request/canceler';

export default (router: Router) => {
  router.beforeEach(() => {
    // 页面切换清空当前所有pending中的请求
    Canceler.removeAll();
  });
};
