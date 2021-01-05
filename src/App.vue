<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
  });
</script>

<style lang="less">
  *:not(i) {
    font-family: 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC',
      'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
  }

  body,
  html {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  body,
  html,
  div,
  span {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #app {
    height: 100vh;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: @lightBlack;
    background: @white;
    -webkit-tap-highlight-color: transparent;
  }
</style>
