<script setup lang="ts">
import { computed, ref } from 'vue';

// const = defineProps()

const onSumbit = () => {};
</script>

<template>
  <form class="sf-form" @submit.prevent="onSumbit">
    <slot />
  </form>
</template>

<style>
.sf-form {
  height: 100%;
}
</style>
