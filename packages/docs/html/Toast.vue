<script setup lang="ts">
import { Toast, ToastBarElement } from '@mookiepiece/strawberry-farm/vue/Toast';
import { ref } from 'vue';

const complex = () => {
  const span = document.createElement('span');
  span.innerHTML =
    `<details><summary>Click To expand</summary>
    <ul><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?` +
    `</li></ul>
    </details>`;
  Toast.error(span);
};

const cll = () => {
  setTimeout(() => {
    Toast.error('123');
  }, 200);

  setTimeout(() => {
    const span = document.createElement('span');
    span.textContent = '123';
    Toast.error(span);
    setTimeout(() => {
      span.innerHTML =
        `<div><ul><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?` +
        `</li></ul></div>`;
    }, 500);
  }, 500);

  setTimeout(() => {
    Toast.error('123');
  }, 700);
};

const a = ref(false);
</script>

<template>
  <div class="[A]" style="gap: 10px">
    <button @click="() => Toast.success('Strawberry Farm')" class="p-4 mat:air">
      Success Toast
    </button>
    <button @click="() => Toast.info('Strawberry Farm')" class="p-4 mat:air">
      Info Toast
    </button>
    <button @click="() => Toast.error('Strawberry Farm')" class="p-4 mat:air">
      Error Toast
    </button>
    <button
      @click="() => Toast.error({ message: 'Strawberry Farm', duration: Infinity })"
      class="p-4 mat:air"
    >
      Error Toast (2000ms)
    </button>
    <button @click="complex" class="p-4 mat:air">Complex Error Toast</button>
    <button @click="() => Toast.blank('Strawberry Farm')" class="p-4 mat:air">
      Blank Toast
    </button>
    <button @click="() => Toast.custom('Strawberry Farm')" class="p-4 mat:air">
      Custom Toast
    </button>
    <button @click="cll" class="p-4 mat:air">Toast</button>
    <button @click="a = !a" class="p-4 mat:air">Icon</button>
    <div v-show="a" class="toast-i-error"></div>
    <div v-show="a" class="toast-i-success"></div>
    <div v-show="a" class="toast-i-info"></div>
    <Teleport to="body">
      <toast-bar main />
    </Teleport>
  </div>
</template>

<style scoped></style>
