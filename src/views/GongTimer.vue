<template>
  <div class="Gong-Timer-Content">
    <Clock />
    <ClockColor />
  </div>
</template>

<script>
import Clock from "@/components/Clock.vue";
import ClockColor from "@/components/ClockColor.vue";

export default {
  name: "GongTimer",
  components: {
    Clock,
    ClockColor
  }
};
</script>

<style scoped>
.Gong-Timer-Content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
