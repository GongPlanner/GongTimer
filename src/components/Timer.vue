<template>
  <div>
    {{ min }} : {{ sec }}
    <div>
      <button @click="start" @keyup.enter="start">start</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      min: "00",
      sec: "00"
    };
  },
  watch: {
    "$store.state.time": function() {
      const time = this.$store.state.time;
      this.min = `${parseInt(time / 60)}`.padStart(2, "0");
      this.sec = `${time % 60}`.padStart(2, "0");
      console.log(this.$store.state.time);
    }
  },
  methods: {
    start() {
      this.$store.dispatch("setTimerState", 1);
      this.timer = setInterval(() => {
        if (this.$store.state.time > 0) {
          this.$store.dispatch("decreaseTime");
        } else {
          this.stop();
        }
      }, 1000);
    },
    stop() {
      this.$store.dispatch("setTimerState", 0);
      clearInterval(this.timer);
    }
  },
  destroyed() {
    console.log("bye");
    this.methods.stop();
  }
};
</script>

<style></style>
