// https://github.com/vitejs/vite/blob/ef100d09cbd1c6745108afc2877396fe69b08bdd/packages/vite/src/node/config.ts#L483
import { loadEnv } from 'vite/dist/node';

const loadEnvConfig = () => {
  return loadEnv(process.env.NODE_ENV as string, process.cwd());
};

export default loadEnvConfig();
