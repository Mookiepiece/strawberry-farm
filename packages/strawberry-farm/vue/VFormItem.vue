<script setup lang="ts">
import { ref } from 'vue';

const v = ref();

</script>

<template>
  <label>
      <span>
        if this work
      </span>
      <VRadioGroup v-model="v" :options="[1,2,3,4,5]" />
  </label>
</template>
