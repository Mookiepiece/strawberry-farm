<script setup lang="ts">
import { ref } from 'vue';

const colors = ref([
  'var(--mat-air-0)',
  'var(--mat-air-05)',
  'var(--mat-air-1)',
  'var(--mat-air-15)',
  'var(--mat-air-2)',
  'var(--mat-air-3)',
  'var(--mat-air-4)',
  'var(--mat-solid-0)',
  'var(--mat-solid-05)',
  'var(--mat-solid-1)',
  'var(--mat-solid-15)',
  'var(--mat-solid-2)',
  'var(--mat-solid-3)',
  'var(--mat-solid-4)',
]);
</script>

<template>
  <div class="good f2" style="">
    <button
      class="mat:air [:-] p-3"
      v-for="c in colors"
      :style="{ background: c }"
    >
      {{ c }}
    </button>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid-template: 40px / 1fr;
  gap: var(--3);
  justify-content: start;
}

.tony {
  background: linear-gradient(
      70deg,
      var(---ink) 40px,
      var(---main) 41px,
      var(---main) 80px,
      var(---foam) 81px,
      var(---foam) 120px,
      transparent 121px
    ),
    linear-gradient(
      10deg,
      var(---ink) 30px,
      var(---main) 32px,
      var(---main) 50px,
      var(---foam) 52px,
      var(---foam) 70px,
      transparent 72px
    );

  border-radius: var(--3);
  color: var(---ink);
  box-shadow: inset 0 0 0 var(--1);

  padding: var(--2);

  &::first-line {
    font-size: var(--f1);
  }
}
</style>
