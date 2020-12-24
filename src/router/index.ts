import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import setupGuard from './guard';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const setupRouter = (app: App) => {
  app.use(router);
  setupGuard(router);
};

export default router;
