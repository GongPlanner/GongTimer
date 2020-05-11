<template>
  <div class="timer-container">
    <input
      name="timer-range"
      class="timer-range"
      type="range"
      :value="time"
      @input="inputTimerRange"
      min="0"
      max="3600"
    />
    <label class="timer-label" for="timer-range">{{ min }} : {{ sec }}</label>
    <button
      class="timer-start-button"
      @click="start"
      @keyup.enter="start"
      :disabled="timerState === 1 ? true : false"
    >
      <span v-if="timerState === 1">playing...</span>
      <span v-else>start</span>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      min: "00",
      sec: "00",
      alarm: {
        name: "default",
        file: new Audio(
          "http://soundbible.com/mp3/Fire_pager-jason-1283464858.mp3"
        )
      }
    };
  },
  watch: {
    time: function() {
      this.min = `${parseInt(this.time / 60)}`.padStart(2, "0");
      this.sec = `${this.time % 60}`.padStart(2, "0");
      console.log(this.time);
    }
  },
  computed: {
    ...mapState({
      time: state => state.time,
      timerState: state => state.timerState
    })
  },
  methods: {
    inputTimerRange(e) {
      this.$store.commit("setTime", e.target.value);
    },
    start() {
      this.$data.alarm.file.pause();

      const isNotValid = this.timerState === 1 || this.time <= 0;
      if (isNotValid) return;

      this.$store.dispatch("setTimerState", 1);

      const stop = this.stop;
      this.timer = setInterval(() => {
        if (this.timerState === 1) {
          this.$store.dispatch("decreaseTime");
          if (this.time <= 0) {
            stop();
          }
        } else {
          stop();
        }
      }, 1000);
    },
    stop() {
      if (this.timerState === 1) {
        this.$store.dispatch("setTimerState", 0);
      }
      if (this.time <= 0) {
        this.$data.alarm.file.play();
      }
      clearInterval(this.timer);
    }
  },
  destroyed() {
    this.stop();
  }
};
</script>

<style lang="sass" scoped src="@/assets/css/Timer.sass"></style>
