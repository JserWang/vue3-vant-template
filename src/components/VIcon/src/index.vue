<template>
  <van-icon :class-prefix="classPrefix"></van-icon>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'VIcon',
    props: {
      original: {
        default: false,
        type: Boolean,
      },
    },
    setup(props) {
      const classPrefix = computed(() => (props.original ? '' : 'iconfont'));
      return {
        classPrefix,
      };
    },
  });
</script>
