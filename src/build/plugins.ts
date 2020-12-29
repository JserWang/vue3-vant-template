import type { Plugin } from 'vite';
import { vitePluginFaker } from 'vite-plugin-faker';
import VitePluginHtml from 'vite-plugin-html';
import config from '../config';
import env from './env';

const USE_MOCK = env.VITE_MOCK === '1';

export default (): Plugin[] => {
  const plugins = [] as Plugin[];

  if (USE_MOCK) {
    plugins.push(
      vitePluginFaker({
        basePath: '/src/apis',
        includes: [/^.*Service/],
        mockFile: true,
        watchFile: true,
      })
    );
  }

  plugins.push(
    VitePluginHtml({
      minify: process.env.NODE_ENV === 'production',
      options: {
        fontPath: `${env.VITE_PUBLIC_PATH}/font/${config.iconfont}`,
      },
    })
  );

  return plugins;
};
