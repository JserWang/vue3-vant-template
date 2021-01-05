import { resolve } from 'path';
import { defineConfig } from 'vite';
import plugins from './src/build/plugins';

export default defineConfig({
  alias: [
    {
      find: '/@',
      replacement: resolve(__dirname, './src'),
    },
  ],
  plugins: plugins(),
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import "${resolve(__dirname, './src/assets/styles/params.less')}";`,
        },
      },
    },
  },
});
