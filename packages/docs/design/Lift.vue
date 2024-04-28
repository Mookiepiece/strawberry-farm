<script setup>
import { Lift } from '@mookiepiece/strawberry-farm/vue/Lift';
import VLift from '@mookiepiece/strawberry-farm/vue/VLift.vue';

const click = () => {
  Lift(VLift);
};
</script>

<template>
  <button @click="click">foo</button>
</template>
