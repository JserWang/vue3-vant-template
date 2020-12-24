import { Button, Field } from 'vant';
import 'vant/lib/index.css';
import type { App } from 'vue';

export default (app: App) => {
  app.use(Button);
  app.use(Field);
};
