<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Bag, swipe } from '@mookiepiece/strawberry-farm/functions';

const elRef = ref<HTMLDivElement>();
const infoRef = ref<HTMLSpanElement>();
const container = ref<HTMLDivElement>();

const bag = Bag();
onMounted(() => {
  const [el, c] = [elRef.value, container.value];
  if (!el || !c) return;

  bag(
    swipe(el, e => {
      const start = { x: e.clientX, y: e.clientY };
      let relative = { x: 0, y: 0 };

      return ({ e, done }) => {
        relative = {
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        };

        if (!done) {
          infoRef.value!.innerText = JSON.stringify(relative);

          el.style.removeProperty('transition');
          el.style.setProperty(
            'transform',
            `translate(${relative.x}px,${relative.y}px)`,
          );
        } else {
          infoRef.value!.innerText = '{}';

          el.style.setProperty('transform', `translate(0px, 0px)`);
          el.style.setProperty('transition', `transform .3s`);
        }
      };
    }),
  );
});
</script>

<template>
  <div class="z [B] [CC]" ref="container">
    <div class="draggable 🍷" ref="elRef"></div>
    <samp ref="infoRef" :style="{ '--y': '10px' }">{}</samp>
  </div>
</template>

<style scoped>
samp {
  position: absolute;
  top: 0;
}

.z {
  position: relative;
  min-height: 250px;
  box-shadow: inset 0 0 0 2px var(---main);
  border-radius: 10px;
}

.draggable {
  width: 50px;
  height: 50px;
  touch-action: none;
}
</style>
