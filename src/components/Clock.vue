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
          <div class="graduation" v-for="i in 60" :key="i"></div>
        </div>
        <!-- <div class="numbers">
          <span class="number" v-for="(n, i) in clockNumbers" :key="i">{{
            n
          }}</span>
        </div> -->
      </div>
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
      center: {
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
    clockNumbers() {
      return [...Array(12).keys()].map(x => x * 5);
    },
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
    clickClock(e) {
      const x = e.clientX;
      const y = e.clientY;
      const dx = x - this.$data.center.x;
      const dy = y - this.$data.center.y;
      let cal = 0;
      if (dx > 0) {
        cal = (Math.atan2(dx, -dy) * 180) / Math.PI;
      } else {
        cal = 360 + (Math.atan2(dx, -dy) * 180) / Math.PI;
      }
      this.$store.dispatch("setTime", parseInt(cal * 10));
      this.$store.dispatch("setTimerState", 0);
    }
  },
  mounted() {
    // new clock();
    const centerRect = this.$refs.center.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2;
    const centerY = centerRect.top + centerRect.height / 2;

    this.$set(this.center, "x", parseInt(centerX));
    this.$set(this.center, "y", parseInt(centerY));
    console.log(this.$data.center.x, this.$data.center.y);
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Clock.sass"></style>
