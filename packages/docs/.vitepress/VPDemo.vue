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
    import(`../css/${filename}.vue`).then(mod => (module.value = mod.default));
    import(`../css/${filename}.vue?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
  case 'design':
    import(`../design/${filename}.vue`).then(
      mod => (module.value = mod.default),
    );
    import(`../design/${filename}.vue?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
  case 'html':
    import(`../html/${filename}.vue`).then(mod => (module.value = mod.default));
    import(`../html/${filename}.vue?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
  default:
    throw new Error();
}
</script>

<template>
  <div class="VPDemo undoc">
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
    --a: var(--tone-rasp-foam);

    --x: 18px;
    --y: 40px;
    --z: 2px;
    background:
      linear-gradient(var(--a), var(--a)) var(--x) 0 / var(--z) var(--y)
        no-repeat,
      linear-gradient(var(--a), var(--a)) 0 var(--x) / var(--y) var(--z)
        no-repeat,
      linear-gradient(var(--a), var(--a)) calc(100% - var(--x)) 0 / var(--z)
        var(--y) no-repeat,
      linear-gradient(var(--a), var(--a)) 100% var(--x) / var(--y) var(--z)
        no-repeat,
      linear-gradient(var(--a), var(--a)) 0 calc(100% - var(--x)) / var(--y)
        var(--z) no-repeat,
      linear-gradient(var(--a), var(--a)) var(--x) 100% / var(--z) var(--y)
        no-repeat,
      linear-gradient(var(--a), var(--a)) 100% calc(100% - var(--x)) / var(--y)
        var(--z) no-repeat,
      linear-gradient(var(--a), var(--a)) calc(100% - var(--x)) 100% / var(--z)
        var(--y) no-repeat,
      transparent;
  }
}
</style>
