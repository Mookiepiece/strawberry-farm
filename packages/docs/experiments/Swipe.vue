<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { trackPointer } from '@mookiepiece/strawberry-farm/functions';

const elRef = ref<HTMLDivElement>();
const infoRef = ref<HTMLSpanElement>();
const container = ref<HTMLDivElement>();

onMounted(() => {
  const [el, c] = [elRef.value, container.value];
  if (!el || !c) return;

  trackPointer(el, ({ subscribe, e }) => {
    const start = { x: e.clientX, y: e.clientY };
    let relative = { x: 0, y: 0 };

    subscribe(({ e, done }) => {
      relative = {
        x: e.clientX - start.x,
        y: e.clientY - start.y,
      };

      if (!done) {
        infoRef.value!.innerText = JSON.stringify(relative);

        el.style.removeProperty('transition');
        el.style.setProperty('transform', `translate(${relative.x}px,${relative.y}px)`);
      } else {
        infoRef.value!.innerText = '{}';

        el.style.setProperty('transform', `translate(0px, 0px)`);
        el.style.setProperty('transition', `transform .3s`);
      }
    });
  });
});
</script>

<template>
  <div class="z [B] [CC] \{+}" ref="container">
    <div ref="elRef" class="\{+}"></div>
    <samp ref="infoRef" class="\{*}/" :style="{ '--y': '10px' }">{}</samp>
  </div>
</template>

<style scoped>
.z {
  position: relative;
  min-height: 250px;
}

.z,
.z div {
  border: 5px solid salmon;
  padding: 2px;

  border-radius: 10px;
  touch-action: none;
}

.z div {
  min-width: 50px;
  min-height: 50px;
}
</style>
../../strawberry-farm/functions/trackPointer