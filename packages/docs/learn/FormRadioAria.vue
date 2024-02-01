<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { on } from '../../strawberry-farm/functions';

const radiogroup = ref<HTMLElement>();

onMounted(() => {});

watchEffect(onCleanup => {
  if (radiogroup.value) {
    onCleanup(on(radiogroup.value).keydown.Enter(() => {}));
    //
  }
});
</script>

<template>
  <div role="radiogroup" ref="radiogroup" aria-label="TODO">
    <div
      role="radio"
      aria-checked="false"
      @keydown.enter="
        () => {
          (radiogroup?.closest('form') as HTMLFormElement).submit();
        }
      "
      tabindex=""
    >
      description
    </div>
  </div>
</template>

<style scoped>
:where(.my-radio:focus-visible + div, .my-radio:not(:disabled) + div:hover) {
  background: #8884;
}

:where(.my-radio:checked + div) {
  background: #8888;
}
</style>
