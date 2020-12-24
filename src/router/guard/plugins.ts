import { Dialog, Notify, Toast } from 'vant';
import type { Router } from 'vue-router';

export default (router: Router) => {
  router.beforeEach(() => {
    Dialog.close();
    Notify.clear();
    Toast.clear();
  });
};
