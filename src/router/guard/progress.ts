import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { Router } from 'vue-router';

const PROGRESS_DISPLAY = import.meta.env.VITE_PROGRESS_DISPLAY === '1';

NProgress.configure({ showSpinner: false });

export default (router: Router) => {
  router.beforeEach(() => {
    PROGRESS_DISPLAY && NProgress.start();
  });

  router.afterEach(() => {
    PROGRESS_DISPLAY && NProgress.done();
  });
};
