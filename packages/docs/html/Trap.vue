<script setup lang="ts">
import { trap } from '@mookiepiece/strawberry-farm/functions';
import { onMounted } from 'vue';
import { ref } from 'vue';

const a = ref<HTMLElement>();

onMounted(()=>{
  
  return trap(a.value!)
})

</script>

<template>
  <div ref="a">
    <button>a</button>
    <button>b</button>
    <button>c</button>
  </div>
</template>

<style scoped></style>
