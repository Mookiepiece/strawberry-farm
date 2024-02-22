<script setup lang="ts">
import { Toast, ToastBarElement } from '@mookiepiece/strawberry-farm/vue/Toast';

if (!customElements.get('toast-bar')) {
  customElements.define('toast-bar', ToastBarElement);
}

const cll = () => {
  Toast.error('123');
  setTimeout(() => {
    Toast.error('123');
  }, 200);

  setTimeout(() => {
    const div = Toast.error('123');
    setTimeout(() => {
      div.style.height = '300px'
//       div.innerText = 

//       `
      
//  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?
      
//  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?

//  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?

//       `
    }, 500);
  }, 500);

  setTimeout(() => {
    Toast.error('123');
  }, 700);
};
</script>

<template>
  <div class="[A]" style="gap: 10px">
    <button @click="cll">Toast</button>
 
    <toast-bar />
  </div>
</template>

<style scoped></style>
