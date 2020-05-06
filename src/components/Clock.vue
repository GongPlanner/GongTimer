<template>
  <div class="clock">
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
    <input type="range" v-model="timerRange" min="0" max="365" />
    {{ timerRange }}
  </div>
</template>

<script>
import clock from "@/utils/Clock.js";
export default {
  name: "Clock",

  watch: {
    timerRange: v => {
      console.log(document.querySelector(".inner").style.width);
      console.log(v);
    }
  },
  data: () => ({
    timerRange: 120
  }),

  mounted() {
    new clock();
  },
  destroyed() {
    clock.endSecTimer();
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Clock.sass"></style>
