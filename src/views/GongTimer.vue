<template>
  <div class="Gong-Timer-Content">
    <Clock />
  </div>
</template>

<script>
import Clock from "@/components/Clock.vue";

export default {
  name: "GongTimer",
  components: {
    Clock
  }
};
</script>

<style scoped>
.Gong-Timer-Content {
  display: flex;
  justify-content: center;
}
</style>
