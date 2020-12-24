import { Toast } from 'vant';
import { VanToast } from 'vant/types/toast';

export default () => {
  let loading: VanToast;
  const show = () => {
    loading = Toast.loading({ forbidClick: true, duration: 0 });
  };

  const hide = () => {
    loading && loading.clear();
  };

  return {
    show,
    hide,
  };
};
