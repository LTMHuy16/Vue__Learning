<template lang="">
  <div class="screen">
    <h1>POKE MEMORIES</h1>
    <p>Select mode to start game</p>
    <div class="actions">
      <button @click="onStart(16)">
        <span>4x4</span>
        <span>Easy</span>
      </button>
      <button @click="onStart(36)">
        <span>6x6</span>
        <span>Normal</span>
      </button>
      <button @click="onStart(64)">
        <span>8x8x</span>
        <span>Hard</span>
      </button>
      <button @click="onStart(100)">
        <span>10x10</span>
        <span>Supper Hard</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeC",
  data() {
    return {};
  },
  methods: {
    onStart(totalCards) {
      this.$emit("onStart", { totalCards });
    },
  },
};
</script>
<style lang=""></style>
