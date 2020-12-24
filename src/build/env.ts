// https://github.com/vitejs/vite/blob/master/src/node/config.ts
import { loadEnv } from 'vite/dist/node/config';

const loadEnvConfig = () => {
  return loadEnv(process.env.NODE_ENV as string, process.cwd());
};

export default loadEnvConfig();
