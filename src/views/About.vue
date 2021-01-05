<template>
  <div>
    <van-button type="primary" to="/">Back to Home</van-button>
    <div class="mock-info">
      Mock数据返回为：
      {{ mockData }}
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';
  import useService from '/@/apis/services/user';
  import { MUser } from '/@/apis/model';

  export default defineComponent({
    setup() {
      const mockData = ref({}) as Ref<MUser>;
      useService.fetch().then((data) => {
        mockData.value = data;
        // data.code
      });

      return {
        mockData,
      };
    },
  });
</script>

<style scoped lang="less">
  .mock-info {
    padding: 30px 5px;
    font-size: 24px;
  }
</style>
