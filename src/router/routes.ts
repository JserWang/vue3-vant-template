import { RouteRecordRaw } from 'vue-router';
import VPage from '/@/components/VPage/index.vue';
import About from '/@/views/About.vue';
import Home from '/@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: VPage,
    children: [
      {
        path: '',
        name: 'home',
        meta: { title: '首页' },
        component: Home,
      },
      {
        path: 'about',
        name: 'about',
        meta: { title: '关于' },
        component: About,
      },
    ],
  },
  {
    path: '/**',
    redirect: {
      name: 'home',
    },
  },
];

export default routes;
