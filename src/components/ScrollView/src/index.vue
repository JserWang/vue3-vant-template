<template>
  <div ref="scrollWrapper" :class="wrapperCls">
    <div class="v-scroll-view-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import type { PropType } from 'vue';
  import useScroll from './useScroll';

  declare type Direction = 'x' | 'y';

  export default defineComponent({
    name: 'ScrollView',
    props: {
      direction: {
        type: String as PropType<Direction>,
        default: 'y',
      },
    },
    emits: ['init', 'scroll'],
    setup(props, ctx) {
      const wrapperCls = computed(() => ({
        'v-scroll-view-wrapper': true,
        'v-scroll-view-direction-x': props.direction === 'x',
      }));

      const { scrollWrapper, scrollTo, scrollToElement } = useScroll(ctx);

      return {
        wrapperCls,
        scrollWrapper,
        scrollTo,
        scrollToElement,
      };
    },
  });
</script>

<style lang="less" scoped>
  .v-scroll-view {
    &-wrapper {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &-direction-x {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;

      .v-scroll-view-content {
        display: inline-block;
      }
    }
  }
</style>
