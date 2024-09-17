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
  default:
    import(`../${dirname}/${filename}.vue`).then(
      mod => (module.value = mod.default),
    );
    import(`../${dirname}/${filename}.vue?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
}
</script>

<template>
  <div class="VPDemo undoc">
    <div>
      <component v-if="module" :is="module"></component>
    </div>
    <details>
      <summary class="mat:air p-10 f2 fw6 [B] [CS]">
        <i-feather i="code" />
        Code
      </summary>
      <VPHighlightVue lang="vue" :raw="raw" />
    </details>
  </div>
</template>

<style>
.VPDemo {
  border-radius: 10px;
  margin: 20px 0;

  box-shadow: inset 0 0 0 1px var(--mat-solid-15);

  > div:first-child {
    padding: 20px;
    --a: var(--mat-solid-15);

    --x: 18px;
    --y: 40px;
    --z: 2px;
    background:
      no-repeat
        linear-gradient(
          90deg,
          transparent 19px,
          var(--a) 20px,
          var(--a) 20px,
          transparent 20px
        ),
      no-repeat
        linear-gradient(
          180deg,
          transparent 19px,
          var(--a) 20px,
          var(--a) 20px,
          transparent 20px
        ),
      transparent;
  }
  summary {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 10px;
    padding: 10px 20px;
    cursor: pointer;
    user-select: none;

    box-shadow: inset 0 0 0 1px var(--mat-solid-15);
  }
  details:not([open]) > summary {
    border-radius: 0 0 10px 10px;
  }
  summary::marker {
    content: '';
    width: 0;
    height: 0;
    display: none;
  }

  [class*='language-'] {
    margin: 0 !important;

    code {
      font-size: 12px !important;
    }
  }
}
</style>
