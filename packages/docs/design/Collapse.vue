<script setup lang="ts">
import { collapse } from '@mookiepiece/strawberry-farm/vue/Collapse';
import { ref } from 'vue';

const a = ref<HTMLDivElement>();
const b = ref<HTMLDivElement>();
</script>

<template>
  <button @click="a && collapse.toggle(a)">toggle</button>
  <div ref="a" class="(///)">
    <div class="p-4" style="border: 10px dotted var(--mat-air-2)">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid magni,
      veniam sapiente aperiam dolorum vero eos hic repellat quasi deserunt optio
      voluptatem expedita aut quam laborum culpa quaerat facere quisquam?
    </div>
  </div>
  <div></div>
  <button @click="b && collapse.toggle(b)">toggle</button>
  <div ref="b" class="(///) Collapsed">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid magni,
    veniam sapiente aperiam dolorum vero eos hic repellat quasi deserunt optio
    voluptatem expedita aut quam laborum culpa quaerat facere quisquam?
  </div>
</template>

<style scoped>
div {
  max-width: 300px;
}
</style>
