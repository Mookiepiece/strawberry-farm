<script setup lang="ts">
import { usePopper } from '../vue/usePopover';

defineSlots<{
  default: any;

}>()

const popover = usePopper();


</script>

<template>

<Teleport to="body">
  <div data-pop>
    <div data-pop-box></div>
  </div>
</Teleport>
</template>


<style>

</style>