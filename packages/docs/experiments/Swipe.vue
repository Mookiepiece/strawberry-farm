<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { trackPointer } from '@mookiepiece/strawberry-farm/functions';

const elRef = ref<HTMLDivElement>();
const infoRef = ref<HTMLSpanElement>();
const container = ref<HTMLDivElement>();

onMounted(() => {
  const [el, c] = [elRef.value, container.value];
  if (!el || !c) return;

  trackPointer(el, e => {
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
  box-shadow:
    inset -2px -2px 0 0 var(---main),
    inset 0 0 0 2px var(---flame);
  padding: 2px;

  border-radius: 10px;
  touch-action: none;
}

.z div {
  min-width: 50px;
  min-height: 50px;
}
</style>
