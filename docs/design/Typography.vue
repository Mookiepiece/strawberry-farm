<script setup>
const classes = [
  ['h1-1', 'h1', 'h1-3'],
  ['h2-1', 'h2', 'h2-3'],
  ['h3-1', 'h3', 'h3-3'],
  ['f1-1', 'f1', 'f1-3'],
  ['f2-1', 'f2', 'f2-3'],
  ['f3-1', 'f3', 'f3-3'],
].flat();
</script>

<template>
  <div class="good">
    <div class="t (///)" v-for="i of classes" :class="[i]">
      {{ i }}
    </div>
  </div>
</template>
<style scoped>
.good {
  display: grid;
  grid: auto-flow /  1fr;
  place-items: start start;
  gap: 10px;
}

@media (min-width: 700px) {
  .good {
  grid: auto-flow / 1fr 1fr 1fr;
  }
}

.t {
  box-shadow: 0 0 0 1px var(--DVD);
}
</style>
