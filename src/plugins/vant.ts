import { Button, Field, Icon } from 'vant';
import 'vant/lib/index.css';
import type { App } from 'vue';

export default (app: App) => {
  app.use(Button);
  app.use(Field);
  app.use(Icon);
};
