<script setup lang="ts">
defineProps<{
  i: number;
}>();
</script>

<template>
  <div class="a" :class="{ noscrollbar: i === 2 }">
    <div v-for="i in 5" class="b 🦄"></div>
  </div>
</template>

<style scoped>
.a {
  position: relative;
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
  border: 5px solid #8883;
}

.noscrollbar {
  scrollbar-width: none;
}

.noscrollbar::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.a::after {
  content: 'Mouse Not Available';
  position: absolute;
  top: 0;
  left: 0;
}
@media (any-pointer: fine) {
  .a::after {
    content: 'Mouse Available';
  }
}

.b {
  scroll-snap-align: center;
  flex: 0 0 100%;
  height: 300px;
}
</style>
