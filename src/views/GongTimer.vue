<template>
  <div class="Gong-Content">
    <Timer class="Gong-Timer-Content" />
    <Clock class="Gong-Clock-Content" />
    {{ data }}
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
