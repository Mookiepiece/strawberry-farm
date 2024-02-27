<script setup lang="ts">
import { Collapse } from '@mookiepiece/strawberry-farm/vue/Collapse';
import { ref } from 'vue';

const a = ref<HTMLDivElement>();
const b = ref<HTMLDivElement>();
</script>

<template>
  <button @click="a && Collapse.toggle(a)">toggle</button>
  <div ref="a" class="(///)">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid magni,
    veniam sapiente aperiam dolorum vero eos hic repellat quasi deserunt optio
    voluptatem expedita aut quam laborum culpa quaerat facere quisquam?
  </div>
  <div></div>
  <button @click="b && Collapse.toggle(b)">toggle</button>
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
