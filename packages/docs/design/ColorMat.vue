<script setup lang="ts">
import { ref } from 'vue';

const mats = [
  'mat:air',
  'mat:airy',
  'mat:air-crown',
  'mat:solid',
  'mat:solidity',
  'mat:solid-crown',
  'mat:ruby',
  'mat:dust',
  'mat:dusty',
];

const actives = ref(
  Array(mats.length)
    .fill(0)
    .map(() => false),
);
</script>

<template>
  <div class="good f2" style="">
    <div v-for="(cls, index) in mats" class="[A]">
      <button
        :class="[cls, actives[index] && 'active']"
        @click="actives[index] = !actives[index]"
      >
        {{ cls }}
      </button>
      <button
        class="[:-]"
        :class="[cls, !actives[index] && 'active']"
        @click="actives[index] = !actives[index]"
      >
        {{ cls }}
      </button>

      <button
        class="[:-]"
        aria-disabled="true"
        style="pointer-events: none"
        :class="[cls, !actives[index] && 'active']"
        @click="actives[index] = !actives[index]"
      >
        {{ cls }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid-template: 150px / repeat(auto-fill, 100px);
  gap: var(--3);
  justify-content: start;

  > div {
    display: flex;
    > button {
      height: 50px;
    }
  }
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
