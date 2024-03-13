<script setup lang="ts">
import { fx } from '@mookiepiece/strawberry-farm/functions';
import { ref } from 'vue';

const open = ref(true);
const div = ref<HTMLDivElement>();

const toggle = () => {
  const el = div.value!;

  open.value = !open.value;

  if (!open.value) {
    fx.cssTransition(el, 'fx-demo-leave', {
      done() {
        el.setAttribute('hidden', '');
      },
    });
  } else {
    el.removeAttribute('hidden');
    fx.cssTransition(el, 'fx-demo-enter');
  }
};
</script>

<template>
  <div>
    <button @click="toggle">CSS</button>
    <div ref="div" class="fx-demo">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
      sequi, natus placeat hic fugiat corrupti. Ab maiores, minima debitis qui
      minus cupiditate, ullam quo earum veniam sapiente asperiores deserunt
      quis?
    </div>
  </div>
</template>

<style scoped>
.fx-demo-enter-from,
.fx-demo-leave-to {
  background-color: #f9ca;
  transform: translateX(100px) scale(0);
}

.fx-demo-enter-active {
  transition:
    background-color 0.5s,
    transform 1s;
}

.fx-demo-leave-active {
  transition: all 0.5s;
}
</style>
