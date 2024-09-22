<script setup lang="ts">
import { levitate, PopPlugin } from '@mookiepiece/strawberry-farm/shared';
import { ref, watchEffect } from 'vue';

const open = ref(false);

const anc = ref<HTMLElement>();
const pop = ref<HTMLElement>();

const applyTransformPro: PopPlugin = config => {
  [
    pop.value!,
    pop.value!.nextElementSibling as HTMLElement,
    pop.value!.nextElementSibling!.nextElementSibling as HTMLElement,
  ].forEach((el , index) => {
    el?.style.setProperty(
      'transform',
      `translate(${config.x! + index * 10 + 'px'}, ${config.y! + index * 10 + 'px'})`,
    );
  });

  return config;
};
applyTransformPro.post = true;

watchEffect(onCleanup => {
  const [$ref, $pop, $open] = [anc.value, pop.value, open.value];
  if ($ref && $pop && $open) {
    onCleanup(
      levitate.auto($ref, () => {
        levitate($ref, $pop, { plugins: [applyTransformPro] });
      }),
    );
  }
});
</script>

<template>
  <button ref="anc" @click="open = !open">Apply Transform</button>
  <Teleport to="body">
    <span ref="pop" v-if="open" class="b">🍒</span>
    <span v-if="open" class="b">🍓</span>
    <span v-if="open" class="b">🍇</span>
  </Teleport>
</template>

<style scoped>
.b {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
