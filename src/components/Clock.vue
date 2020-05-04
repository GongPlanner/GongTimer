<template>
  <div class="clock">
    <div class="inner">
      <div class="hour hand"></div>
      <div class="minute hand"></div>
      <div class="second hand"></div>
      <div class="graduations">
        <div class="graduation" v-for="i in 60" :key="i">
          <p v-if="i % 5 === 0">{{ i }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clock from "@/utils/Clock.js";
export default {
  name: "Clock",
  mounted() {
    new clock();
  },
  destroyed() {
    clock.endSecTimer();
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Clock.sass"></style>
