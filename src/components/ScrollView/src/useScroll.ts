import type { Ref, SetupContext } from 'vue';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

export default (ctx: SetupContext<('init' | 'scroll')[]>) => {
  const scrollWrapper = ref({}) as Ref<HTMLElement>;

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    ctx.emit('scroll', { x: target.scrollLeft, y: target.scrollTop });
  };

  const scrollTo = (x: number, y: number) => {
    scrollWrapper.value.scrollTo({
      left: x,
      top: y,
      behavior: 'smooth',
    });
  };

  const scrollToElement = (el: HTMLElement) => {
    scrollWrapper.value.scrollTo({
      left: el.offsetLeft,
      top: el.offsetTop,
      behavior: 'smooth',
    });
  };

  onMounted(async () => {
    await nextTick();
    ctx.emit('init');
    scrollWrapper.value.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    scrollWrapper.value.removeEventListener('scroll', handleScroll);
  });

  return {
    scrollWrapper,
    scrollTo,
    scrollToElement,
  };
};
