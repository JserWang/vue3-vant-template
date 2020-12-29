<template>
  <div>
    <van-button type="primary" to="/about">Go to About</van-button>
    <v-icon name="check-o" />
    <scroll-view ref="scrollView" @scroll="handleScroll">
      <div class="block1" />
      <div class="block2" />
    </scroll-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, ref } from 'vue';
  import { ScrollView, TScrollView } from '@/components/ScrollView';
  import { VIcon } from '@/components/VIcon';

  export default defineComponent({
    components: {
      ScrollView,
      VIcon,
    },
    setup() {
      const scrollView = ref({}) as Ref<TScrollView>;
      return {
        scrollView,
      };
    },

    methods: {
      handleScroll() {
        console.log('handleScroll');
      },
    },
  });
</script>

<style lang="less">
  .test {
    font-size: 30px;
  }

  .block1 {
    height: 1000px;
    background: @bgGray;
  }

  .block2 {
    height: 1000px;
    background: @yellow;
  }
</style>
