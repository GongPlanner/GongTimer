<template>
  <div>
    <div>{{ min }} : {{ sec }}</div>

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
        max="60"
      />
      {{ timerRange }}
    </div>
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
      if (this.timerRange > 30) {
        degree1 = 180;
        degree2 = (this.timerRange - 30) * 6;
      } else {
        degree1 = this.timerRange * 6;
      }

      return {
        "--degree1": `${degree1}deg`,
        "--degree2": `${degree2}deg`
      };
    }
  },
  data: () => ({
    timerRange: 0
  }),

  mounted() {
    new clock();
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Clock.sass"></style>
