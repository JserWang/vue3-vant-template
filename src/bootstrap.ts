import type { App } from 'vue';
import setupVant from '/@/plugins/vant';
import { setupRouter } from '/@/router';

export default (app: App) => {
  setupRouter(app);
  setupVant(app);
};
