<template>
  <div>
    <div class="clock" :style="timerCss">
      <div class="inner" ref="clock" @click="clickClock">
        <div class="mask full">
          <div class="fill"></div>
        </div>
        <div class="mask half">
          <div class="fill"></div>
        </div>
        <div class="second hand"></div>
        <div class="center" ref="center"></div>
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
// import clock from "@/utils/Clock.js";

export default {
  name: "Clock",
  data: function() {
    return {
      middle: {
        x: 0,
        y: 0
      },
      mouse: {
        x: 0,
        y: 0
      }
    };
  },
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
    },
    clickClock(e) {
      const x = e.clientX;
      const y = e.clientY;
      const dx = x - this.$data.middle.x;
      const dy = y - this.$data.middle.y;
      let cal = 0;
      if (dx > 0) {
        cal = (Math.atan2(dx, -dy) * 180) / Math.PI;
      } else {
        cal = 360 + (Math.atan2(dx, -dy) * 180) / Math.PI;
      }
      this.$store.dispatch("setTime", parseInt(cal * 10));
    }
  },
  mounted() {
    // new clock();
    const centerRect = this.$refs.center.getBoundingClientRect();
    const middleX = centerRect.left + centerRect.width / 2;
    const middleY = centerRect.top + centerRect.height / 2;

    this.$set(this.middle, "x", parseInt(middleX));
    this.$set(this.middle, "y", parseInt(middleY));
    console.log(this.$data.middle.x, this.$data.middle.y);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Clock.sass"></style>
