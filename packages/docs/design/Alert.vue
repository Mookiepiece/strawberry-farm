<script setup lang="ts">
import { ref } from 'vue';

const a = ref<HTMLDivElement>();
const b = ref<HTMLDivElement>();
</script>

<template>
  <div class="Alert f2">
    <i-feather i="x" class="f1" />
    <div class="px-1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis sit
      architecto vero quia explicabo debitis assumenda veniam, unde cum sed, at
      voluptates velit, sunt voluptas pariatur culpa quaerat dolor repellendus!
    </div>
  </div>
  <div class="AlertV2 mt-4">
    <i-feather i="shopping-bag" />
    <div clas="[A] gap-1">
      <div class="pb-1 fw6">Your Orders</div>
      <div class="f2 clr-2">Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.</div>
    </div>
  </div>
</template>

<style scoped>
.AlertV2 {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  padding-left: 40px;
  font-size: 15px;
  background: var(--mat-solid-1);
  border: 1px solid var(---main);
  border-radius: 6px;

  > i-feather {
    position: absolute;
    top: 20px;
    left: 14px;
    color: var(---main);
    width: 1lh;
    aspect-ratio: 1;
  }
}
</style>
