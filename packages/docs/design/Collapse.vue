<script setup lang="ts">
import { on } from '@mookiepiece/strawberry-farm/functions';
import { onMounted, ref, watchEffect } from 'vue';
function nextFrame(cb: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}

const Bag = () => {
  let cbs: (() => void)[] = [];
  return (cb?: () => void) => {
    if (cb) {
      cbs.push(cb);
    } else {
      cbs.forEach(_ => _());
      cbs = [];
    }
  };
};

const a = ref<HTMLDivElement>();

const r = ref(false);

const bag = Bag();

onMounted(() => {
  watchEffect(() => {
    const el = a.value!;

    if (r.value) {
      bag();
      el.style.setProperty('--h', el.scrollHeight + 'px');
      el.style.setProperty('height', `0`);
      nextFrame(() => {
        el.style.setProperty('height', `var(--h)`);
        bag(
          on(el).transitionend.self.once(e => {
            bag();
            el.style.removeProperty('height');
          }),
        );
        bag(
          on(el).transitioncancel.self.once(e => {
            bag();
            //
          }),
        );
      });
    } else {
      bag();
      el.style.setProperty('--h', el.scrollHeight + 'px');
      el.style.setProperty('height', `var(--h)`);
      nextFrame(() => {
        el.style.setProperty('height', `0`);
        bag(
          on(el).transitionend.self.once(e => {
            bag();
          }),
        );
        bag(
          on(el).transitioncancel.self.once(e => {
            bag();
            //
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
