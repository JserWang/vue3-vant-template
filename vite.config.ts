import { resolve } from 'path';
import type { UserConfig } from 'vite';
import alias from './src/build/alias';
import plugins from './src/build/plugins';

const config: UserConfig = {
  resolvers: [{ alias }],
  plugins: plugins(),
  cssPreprocessOptions: {
    less: {
      javascriptEnabled: true,
      modifyVars: {
        hack: `true; @import "${resolve(__dirname, './src/assets/styles/params.less')}";`,
      },
    },
  },
};

export default config;
