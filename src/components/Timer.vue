<template>
  <div>{{ min }} : {{ sec }}</div>
</template>

<script>
export default {
  data: () => ({
    time: 60,
    min: "00",
    sec: "00"
  }),
  methods: {
    prettyTime() {
      let time = this.time / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + " : " + secondes;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.min = parseInt(this.time / 60);
      this.sec = this.time % 60;
      if (this.min < 10) {
        this.min = "0" + this.min;
      }
      if (this.sec < 10) {
        this.sec = "0" + this.sec;
      }
      if (this.time > 0) {
        this.time--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  },
  destroyed() {
    console.log("bye");
    clearInterval(this.timer);
  }
};
</script>

<style></style>
