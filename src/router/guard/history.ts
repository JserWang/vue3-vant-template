import { history, HOME_PATH } from '@/utils/history';
import type { Router } from 'vue-router';

export default (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (from.path === to.path) {
      return next();
    }

    // 当回到首页时，清空之前所有访问记录
    if (to.path === HOME_PATH) {
      history.init();
      return next();
    }

    const lastPath = history.getLast();
    if (lastPath === to.path) {
      history.remove();
    } else {
      history.push(to.path);
    }
    next();
  });
};
