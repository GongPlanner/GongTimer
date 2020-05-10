<template>
  <div>
    <div class="clock" :style="timerCss">
      <div class="inner">
        <div class="mask full">
          <div class="fill"></div>
        </div>
        <div class="mask half">
          <div class="fill"></div>
        </div>
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
        value="timerRange"
        @input="changeTimerRange"
        min="0"
        max="3600"
      />
      {{ timerRange }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import clock from "@/utils/Clock.js";

export default {
  name: "Clock",
  computed: {
    ...mapState({
      timerRange: state => state.time
    }),
    timerCss() {
      let degree1 = 0;
      let degree2 = 0;
      if (this.timerRange > 1800) {
        degree1 = 180;
        degree2 = (this.timerRange - 1800) / 10;
      } else {
        degree1 = this.timerRange / 10;
        degree2 = 0;
      }

      return {
        "--degree1": `${degree1}deg`,
        "--degree2": `${degree2}deg`
      };
    }
  },
  methods: {
    changeTimerRange(e) {
      this.$store.commit("setTime", e.target.value);
    }
  },
  mounted() {
    new clock();
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Clock.sass"></style>
