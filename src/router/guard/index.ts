import type { Router } from 'vue-router';
import documentGuard from './document';
import historyGuard from './history';
import pluginsGuard from './plugins';
import progressGuard from './progress';
import requestGuard from './request';

export default (router: Router) => {
  progressGuard(router);
  requestGuard(router);
  pluginsGuard(router);
  documentGuard(router);
  historyGuard(router);
};
