<script setup lang="ts">
import { Toast } from '@mookiepiece/strawberry-farm/vue/Toast';

import { h } from 'vue';
import { createApp } from 'vue';
import { ref } from 'vue';

const complex = () => {
  const span = document.createElement('span');
  const app = createApp({
    beforeUnmount() {
      console.log('wa');
    },
    unmounted() {
      console.log('sei');
    },
    render() {
      return h('details', {}, [
        h('summary', {}, 'Click To expand'),
        h('ul', {}, [
          h(
            'li',
            {},
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?',
          ),
        ]),
      ]);
    },
  });
  app.mount(span);

  // span.innerHTML =
  //   `<details><summary>Click To expand</summary>
  //   <ul><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?` +
  //   `</li></ul>
  //   </details>`;
  const { bag } = Toast.error(span);
  bag(app.unmount);
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
const infinityToast = ref<ReturnType<typeof Toast.error>>();

const a = ref(false);
</script>

<template>
  <div class="[A]" style="gap: 10px">
    <button @click="() => Toast.success('Strawberry Farm')" class="p-4 mat:air">
      Success Toast
    </button>
    <button @click="() => Toast.error('Strawberry Farm')" class="p-4 mat:air">
      Error Toast
    </button>
    <button
      @click="() => Toast.error({ message: 'Strawberry Farm', duration: 2000 })"
      class="p-4 mat:air"
    >
      Error Toast (2000ms)
    </button>
    <button
      @click="
        () =>
          infinityToast
            ? (infinityToast = void infinityToast.close())
            : (infinityToast = Toast.error({
                message: 'Strawberry Farm',
                duration: Infinity,
              }))
      "
      class="p-4 mat:air"
    >
      Error Toast (Infinity)
    </button>
    <button @click="complex" class="p-4 mat:air">Complex Error Toast</button>
    <button @click="() => Toast.blank('Strawberry Farm')" class="p-4 mat:air">
      Blank Toast
    </button>
    <button @click="() => Toast.custom('Strawberry Farm')" class="p-4 mat:air">
      Custom Toast
    </button>
    <button @click="cll" class="p-4 mat:air">Many Toasts</button>
    <button @click="a = !a" class="p-4 mat:air">Icon</button>
    <div v-show="a" class="toast-i-error"></div>
    <div v-show="a" class="toast-i-success"></div>
    <div v-show="a" class="toast-i-info"></div>
  </div>
</template>

<style scoped></style>
