<template>
  <div class="Gong-Content">
    <Timer class="Gong-Timer-Content" />
    <Clock class="Gong-Clock-Content" />
  </div>
</template>

<script>
import Clock from "@/components/Clock.vue";
import Timer from "@/components/Timer.vue";

export default {
  name: "GongTimer",
  components: {
    Clock,
    Timer
  }
};
</script>

<style scoped>
.Gong-Content {
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.Gong-Timer-Content {
  align-items: center;
  justify-content: center;

  display: block;
}
.Gong-Clock-Content {
  align-items: center;
  justify-content: center;

  display: block;
}
</style>
