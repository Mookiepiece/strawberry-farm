<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { highlight } from './_shikiji';

const props = defineProps<{
  lang: string;
  raw: string;
}>();

const a = ref<HTMLDivElement>()

watchEffect(async () => {
  if(!a.value) return;
  // v-html didn't work, strange
  a.value.innerHTML =
    `<button title="Copy Code" class="copy"></button><span class="lang">${props.lang}</span>` +
    (await highlight(props.raw, props.lang));
});
</script>

<template>
  <div class="language-html vp-code" ref="a" ></div>
</template>
