<script setup lang="ts">
import { fx } from '@mookiepiece/strawberry-farm/functions';
import { onUnmounted, ref } from 'vue';

const div = ref<HTMLDivElement>();
const toggle = () => {
  if (!div.value) return;

  fx.cssTransition(div.value, 'fx-demo-leave');
};

onUnmounted(() => {
  document.body.style.removeProperty('height');
});
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
.fx-demo {
  background-color: #f9ca;
  transform: translateX(0);
}

.fx-demo-enter-from {
  background-color: transparent;
  transform: translateX(100px) scale(0);
}

.fx-demo-enter-active {
  transition:
    background-color 0.5s,
    transform 1s;
}

.fx-demo-enter-to {
  /*  */
}

.fx-demo-leave-from {
  background-color: #f9ca;
  transform: translateX(0);
}

.fx-demo-leave-active {
  transition: all 0.5s;
}

.fx-demo-leave-to {
  background-color: transparent;
  /* transform: translateX(100px) scale(0); */
}
</style>
