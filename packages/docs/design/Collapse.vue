<script setup lang="ts">
import { Bag, on } from '@mookiepiece/strawberry-farm/functions';
import { onMounted, ref, watchEffect } from 'vue';
function nextFrame(cb: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}

const a = ref<HTMLDivElement>();

const r = ref(false);

const bag = Bag();

onMounted(() => {
  watchEffect(() => {
    const el = a.value!;

    bag();
    if (r.value) {
      el.style.removeProperty('display');
      el.style.setProperty('height', `0`);
      nextFrame(() => {
        el.style.setProperty('height', `var(--h)`);
        bag(
          on(el).transitionend.self.once(_ => {
            el.style.removeProperty('height');
            el.style.removeProperty('overflow');
          }),
        );
      });
    } else {
      el.style.setProperty('--h', el.scrollHeight + 'px');
      el.style.setProperty('height', `var(--h)`);
      el.style.setProperty('overflow', `hidden`);
      nextFrame(() => {
        el.style.setProperty('height', `0`);
        bag(
          on(el).transitionend.self.once(_ => {
            el.style.setProperty('display', `none`);
          }),
        );
      });
    }
  });
});
</script>

<template>
  <button @click="r = !r">toggle</button>
  <div ref="a" class="(///)">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid magni,
    veniam sapiente aperiam dolorum vero eos hic repellat quasi deserunt optio
    voluptatem expedita aut quam laborum culpa quaerat facere quisquam?
  </div>
</template>

<style scoped>
div {
  max-width: 300px;
  transition: height 0.3s;
}
</style>
