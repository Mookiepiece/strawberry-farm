<script setup lang="ts">
import { computed, ref } from 'vue';

</script>

<template>
  <form class="sf-form">
    <slot />
  </form>
</template>

<style>
.sf-form {
  height: 100%;
}
</style>
