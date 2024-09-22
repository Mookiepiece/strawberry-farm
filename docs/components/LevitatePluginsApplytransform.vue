<script setup lang="ts">
import { levitate, PopPlugin } from '@mookiepiece/strawberry-farm/shared';
import { ref, watchEffect } from 'vue';

const open = ref(false);

const anc = ref<HTMLElement>();
const pop1 = ref<HTMLElement>();
const pop2 = ref<HTMLElement>();
const pop3 = ref<HTMLElement>();

const applyTransformPro: PopPlugin = config => {
  [pop1, pop2, pop3].forEach(({ value }, index) => {
    value?.style.setProperty(
      'transform',
      `translate(${config.x! + index * 10 + 'px'}, ${config.y! + index * 10 + 'px'})`,
    );
  });

  return config;
};
applyTransformPro.post = true;

watchEffect(onCleanup => {
  const [$ref, $pop, $open] = [anc.value, pop1.value, open.value];
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
  <button ref="anc" @click="open = !open">Reference</button>
  <Teleport to="body">
    <span ref="pop1" v-if="open" class="b">🍒</span>
    <span ref="pop2" v-if="open" class="b">🍓</span>
    <span ref="pop3" v-if="open" class="b">🍇</span>
  </Teleport>
</template>

<style scoped>
.b {
  position: fixed;
  top: 0;
  left: 0;
}

.control {
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-100%, -100%);
  width: max-content;
  max-width: 100%;
}
</style>
