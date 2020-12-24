import setupVant from '@/plugins/vant';
import { setupRouter } from '@/router';
import type { App } from 'vue';

export default (app: App) => {
  setupRouter(app);
  setupVant(app);
};
