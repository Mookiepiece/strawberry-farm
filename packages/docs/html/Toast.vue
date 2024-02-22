<script setup lang="ts">
import { Toast, ToastBarElement } from '@mookiepiece/strawberry-farm/vue/Toast';
import { ref } from 'vue';

if (!customElements.get('toast-bar')) {
  customElements.define('toast-bar', ToastBarElement);
}

const cll = () => {
  Toast.error('123');
  setTimeout(() => {
    Toast.error('123');
  }, 200);

  setTimeout(() => {
    const { div } = Toast.error('123');
    setTimeout(() => {
      // div.style.height = '200px';
      div.innerHTML =
        `<div><ul><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?` +
        `</li></ul></div>`;
      //       div.innerText =

      //       `

      //  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?

      //       `
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
    <button @click="cll" class="mat:air">Toast</button>
    <button @click="a = !a" class="mat:air">Icon</button>
    <div v-show="a" class="sf-toast-i-error"></div>
    <div v-show="a" class="sf-toast-i-success"></div>
    <div v-show="a" class="sf-toast-i-info"></div>
    <toast-bar main />
  </div>
</template>

<style scoped></style>
