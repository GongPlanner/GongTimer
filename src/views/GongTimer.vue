<template>
  <div class="Gong-Content">
    <Clock class="Gong-Clock-Content" />
    <Timer class="Gong-Timer-Content" />
    <!-- {{ data }} -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
import Clock from "@/components/Clock.vue";
import Timer from "@/components/Timer.vue";

export default {
  name: "GongTimer",
  store,
  computed: mapState(["data"]),
  methods: {},
  components: {
    Clock,
    Timer
  },
  created: function() {
    this.$store.dispatch("init");
  }
};
</script>

<style scoped>
.Gong-Content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
.Gong-Timer-Content {
  margin-top: 40px;
}
</style>
