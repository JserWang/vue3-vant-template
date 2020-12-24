<template>
  <van-field v-model="sms" center label="短信验证码" placeholder="请输入短信验证码">
    <template #button>
      <slot name="button">
        <van-button :disabled="disabled" size="small" type="primary" @click="handleSmsClick">{{
          label
        }}</van-button>
      </slot>
    </template>
  </van-field>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import useTimer from './useTimer';

  export default defineComponent({
    name: 'VerifyCodeInput',
    props: {
      url: {
        type: String,
        default: '',
      },
    },
    setup() {
      const sms = ref('');
      let { remain, setTime } = useTimer(0);
      const handleSmsClick = () => {
        setTime(500);
      };

      const label = computed(() => (remain.value > 0 ? remain.value : '发送验证码'));
      const disabled = computed(() => remain.value > 0);

      return {
        sms,
        handleSmsClick,
        label,
        disabled,
      };
    },
  });
</script>
