<script setup lang="ts">
import { computed, ref } from 'vue';
import VPHighlightVue from './VPHighlight.vue';
const props = defineProps<{
  path: string;
}>();

const raw = ref('');
const count = computed(() => raw.value.split('\n').length);
// https://github.com/vitejs/vite/issues/4945
const [dirname, filename, extname] = props.path
  .split('/')
  .flatMap(s => s.split('.'));

switch (extname) {
  case 'ts':
    import(`../../strawberry-farm/${dirname}/${filename}.ts?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
  case 'vue':
    import(`../../strawberry-farm/${dirname}/${filename}.vue?raw`).then(
      mod => (raw.value = (mod.default as string).replace(/\r\n/g, '\n')), // Windows©️ is awesome
    );
    break;
}
</script>

<template>
  <div class="VPSource undoc">
    <details>
      <summary class="mat:air p-10 f2 fw6 [B] [CS]">
        <i-feather i="code" />
        Source Code ({{ count }} lines)
      </summary>
      <VPHighlightVue :lang="extname" :raw="raw" />
    </details>
  </div>
</template>
