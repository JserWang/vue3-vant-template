import { history } from '@/utils/history';
import { ref } from '@vue/reactivity';
import { onBeforeRouteUpdate } from 'vue-router';

export default () => {
  const transitionName = ref('slide-left');

  onBeforeRouteUpdate((to, _, next) => {
    if (history.getLast() === to.path) {
      transitionName.value = 'slide-right';
    } else {
      transitionName.value = 'slide-left';
    }
    next();
  });

  return {
    transitionName,
  };
};
