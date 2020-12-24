import type { Router } from 'vue-router';

export default (router: Router) => {
  router.afterEach((to) => {
    // 设置标题
    document.title = to.meta.title;
  });
};
