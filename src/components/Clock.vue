<template>
  <div class="clock" :style="timerCss">
    <div class="inner">
      <div class="mask full">
        <div class="fill"></div>
      </div>
      <div class="mask half">
        <div class="fill"></div>
      </div>
      <div class="hour hand"></div>
      <div class="minute hand"></div>
      <div class="second hand"></div>
      <div class="graduations">
        <div class="graduation" v-for="i in 60" :key="i">
          <p v-if="i % 5 === 0">{{ i }}</p>
        </div>
      </div>
    </div>
    <input
      name="timer-range"
      type="range"
      v-model="timerRange"
      min="0"
      max="360"
    />
    {{ timerRange }}
  </div>
</template>

<script>
import clock from "@/utils/Clock.js";

export default {
  name: "Clock",

  // watch: {
  //   timerRange: v => {
  //     // sass export한 변수 불러는 와지지만 css가 실시간 적용이 안됨.
  //     // if (v > 180) {
  //     //   styles.degree1 = 180;
  //     //   styles.degree2 = v - 180;
  //     // } else {
  //     // }
  //     // this.timerRange = v;
  //     console.log(v);
  //     // document.style.setProperty("--degree1", `${v}px`);
  //   }
  // },
  computed: {
    timerCss() {
      let degree1 = 0;
      let degree2 = 0;
      if (this.timerRange > 180) {
        degree1 = 180;
        degree2 = this.timerRange - 180;
      } else {
        degree1 = this.timerRange;
      }
      console.log(degree1, degree2);

      return {
        "--degree1": `${degree1}deg`,
        "--degree2": `${degree2}deg`
      };
    }
  },
  data: () => ({
    timerRange: 120
  }),

  mounted() {
    new clock();
    // document로 불러오고싶은데 안불러와짐
    let timer = document.querySelector(".mask.half .fill");
    console.log(timer.style.transform);

    // 이건 제대로 나옴
    let timer2 = document.querySelector(".second.hand");
    console.log(timer2.style.transform);
  },
  destroyed() {
    clock.endSecTimer();
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Clock.sass"></style>
