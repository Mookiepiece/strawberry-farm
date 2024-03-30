<script setup lang="ts">
import { shallowRef } from 'vue';
import VPHighlightVue from './VPHighlight.vue';
import { MemoryNotebook } from '@pictogrammers/memory/src/icons';
const props = defineProps<{
  path: string;
}>();

const raw = shallowRef<any>('');
// https://github.com/vitejs/vite/issues/4945
const [dirname, filename] = props.path.split('/');
switch (dirname) {
  case 'functions':
    import(`../functions/${filename}.ts?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
  default:
    throw new Error();
}
</script>

<template>
  <div class="VPSourceCode undoc">
    <details>
      <summary class="mat:air p-10 f2 fw6 [B] [CS]">
        <svg viewBox="0 0 22 22">
          <path :d="MemoryNotebook" />
        </svg>
        Code
      </summary>
      <VPHighlightVue lang="vue" :raw="raw" />
    </details>
  </div>
</template>

<style>
.VPSourceCode {
  /*  */
}
</style>
