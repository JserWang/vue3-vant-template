import { ref } from 'vue';

export default (time: number, millisecond = false) => {
  const remain = ref(time);
  let timer: number;

  const setTime = (time: number) => {
    remain.value = time;
    clearInterval(timer);
    startTimer();
  };

  const startTimer = () => {
    timer = window.setInterval(() => {
      remain.value -= millisecond ? 1000 : 1;
      if (remain.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    return timer;
  };

  remain.value > 0 && startTimer();

  return {
    remain,
    setTime,
  };
};
