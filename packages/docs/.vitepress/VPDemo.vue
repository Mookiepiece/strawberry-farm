<script setup lang="ts">
import { shallowRef } from 'vue';
import VPHighlightVue from './VPHighlight.vue';

const props = defineProps<{
  path: string;
}>();

const module = shallowRef<any>();
const raw = shallowRef<any>('');
// https://github.com/vitejs/vite/issues/4945
const [dirname, filename] = props.path.split('/');
switch (dirname) {
  case 'learn':
    import(`../learn/${filename}.vue`).then(
      mod => (module.value = mod.default),
    );
    import(`../learn/${filename}.vue?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
  case 'css':
    import(`../css/${filename}.vue`).then(
      mod => (module.value = mod.default),
    );
    import(`../css/${filename}.vue?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
  default:
    throw new Error();
}
</script>

<template>
  <div class="VPDemo">
    <div>
      <component v-if="module" :is="module"></component>
    </div>
    <details>
      <summary>Code</summary>
      <VPHighlightVue lang="vue" :raw="raw" />
    </details>
  </div>
</template>

<style>
.VPDemo {
  margin: 20px 0;

  > div:first-child {
    padding: 20px;
    --a: var(--vp-c-gray-3);
    --b: var(--vp-c-brand-3);
    /* border: 1px solid var(--a); */
    background:
      linear-gradient(var(--a), var(--a)) 20px 0/ 1px 70px no-repeat,
      linear-gradient(var(--a), var(--a)) 0 20px / 70px 1px no-repeat,
      linear-gradient(var(--a), var(--a)) calc(100% - 20px) 0/ 1px 70px no-repeat,
      linear-gradient(var(--a), var(--a)) 100% 20px / 70px 1px no-repeat,
      linear-gradient(var(--a), var(--a)) 0 calc(100% - 20px) / 70px 1px
        no-repeat,
      linear-gradient(var(--a), var(--a)) 20px 100% / 1px 70px no-repeat,
      linear-gradient(var(--a), var(--a)) 100% calc(100% - 20px) / 70px 1px
        no-repeat,
      linear-gradient(var(--a), var(--a)) calc(100% - 20px) 100% / 1px 70px
        no-repeat,
      transparent;
  }
}
</style>
