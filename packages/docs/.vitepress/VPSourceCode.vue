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
.VPDemo {
  margin: 20px 0;

  > div:first-child {
    padding: 20px;
    --a: var(--mat-solid-15);

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
  summary {
    padding: 10px;
    cursor: pointer;
    user-select: none;

    svg {
      display: block;
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  }
  summary::marker {
    content: '';
    width: 0;
    height: 0;
    display: none;
  }
}
</style>
