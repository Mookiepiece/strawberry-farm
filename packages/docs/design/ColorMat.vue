<script setup lang="ts">
import { ref } from 'vue';

const actives = ref(
  Array(3)
    .fill(0)
    .map(() => false),
);
</script>

<template>
  <div class="good f2" style="">
    <button
      class="mat:air"
      @click="actives[0] = !actives[0]"
      :class="actives[0] && 'active'"
    >
      mat:air
    </button>
    <button
      class="mat:airy"
      @click="actives[1] = !actives[1]"
      :class="actives[1] && 'active'"
    >
      mat:airy
    </button>
    <button
      class="mat:ruby"
      @click="actives[2] = !actives[2]"
      :class="actives[2] && 'active'"
    >
      mat:ruby
    </button>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid-template: 100px / repeat(auto-fill, 150px);
  gap: var(--3);
  justify-content: start;
}

.tony {
  background: linear-gradient(
      70deg,
      var(---fore) 40px,
      var(---main) 41px,
      var(---main) 80px,
      var(---foam) 81px,
      var(---foam) 120px,
      transparent 121px
    ),
    linear-gradient(
      10deg,
      var(---fore) 30px,
      var(---main) 32px,
      var(---main) 50px,
      var(---foam) 52px,
      var(---foam) 70px,
      transparent 72px
    );

  border-radius: var(--5);
  color: var(---fore);
  box-shadow: inset 0 0 0 var(--3);

  padding: var(--4);

  &::first-line {
    font-size: var(--f1);
  }
}
</style>
