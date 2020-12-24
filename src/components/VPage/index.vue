<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" class="transition-view"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import usePageTransition from './usePageTransition';

  export default defineComponent({
    name: 'VPage',
    setup() {
      const { transitionName } = usePageTransition();
      return {
        transitionName,
      };
    },
  });
</script>

<style lang="less" scoped>
  .transition-view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);

    &.header {
      top: @headerHeight;
      height: calc(100vh - @headerHeight);
    }
  }

  .slide {
    &-left-enter-from,
    &-right-leave-to {
      opacity: 0;
      transform: translate(50px, 0);
    }

    &-left-leave-to,
    &-right-enter-from {
      opacity: 0;
      transform: translate(-50px, 0);
    }
  }
</style>
