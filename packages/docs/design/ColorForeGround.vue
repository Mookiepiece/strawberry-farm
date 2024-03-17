<script setup lang="ts">
import { ref } from 'vue';

const colors = ref(['var(--text1)', 'var(--text2)', 'var(--text3)']);
</script>

<template>
  <div class="good" style="">
    <button
      class="mat:air f1 [:-] p-1"
      v-for="c in colors"
      :style="{ color: c }"
    >
      蒹葭苍苍 白露为霜 ({{ c }})
    </button>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid-template: auto / 1fr;
  justify-content: start;
}

</style>
