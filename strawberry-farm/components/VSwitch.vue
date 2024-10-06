<script setup lang="ts">
import { h, isVNode, ref } from 'vue';
import { requestSubmit } from '../html';
const model = defineModel();

defineProps<{
  label?: any;
  disabled?: boolean;
}>();

defineSlots<{
  default?(scope: { indicator: () => any }): any;
}>();

const toggle = () => (model.value = !model.value);

const indicator = () => h('div', { class: 'VSwitchIndicator' });

const el = ref<HTMLDivElement>();
defineExpose({ el });
</script>

<template>
  <div
    :tabindex="disabled ? '-1' : '0'"
    class="VSwitch"
    role="button"
    :aria-disabled="disabled"
    :aria-pressed="model ? 'true' : 'false'"
    @click="toggle"
    @keydown.exact.enter.prevent="requestSubmit"
    @keydown.exact.space.prevent="toggle"
  >
    <slot :indicator>
      <component
        :is="label"
        v-if="typeof label == 'function' || isVNode(label)"
      />
      <span v-else>{{ label }}</span>
      <div class="VSwitchIndicator"></div>
    </slot>
  </div>
</template>
<style>
.VSwitch {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: var(---f);
  line-height: 1.6;
  outline: none;

  &:where(:not([aria-disabled='true'])) {
    cursor: pointer;
  }

  :where(.VSwitchIndicator) {
    position: relative;
    display: flex;
    align-items: center;
    width: var(---size);
    height: calc(var(---size) * 0.55);

    background: var(--mat-solid-2);
    border-radius: 999px;

    transition:
      transform 0.2s var(--curve-wave),
      background 0.2s var(--curve-wave);

    &::before {
      display: block;
      width: calc(var(---size) * 0.55 - 8px);
      aspect-ratio: 2;
      background: white;
      border-radius: 999px;
      content: '';
      transition:
        aspect-ratio 0.2s var(--curve-wave),
        transform 0.2s var(--curve-wave);
      transform: translateX(4px) scale(0.7);
    }
  }

  &:where(:focus-visible) .VSwitchIndicator {
    outline: 2px solid var(---main);
    outline-offset: 1px;
  }

  &:where([aria-pressed='true']) .VSwitchIndicator {
    background: var(---main);
    &::before {
      aspect-ratio: 1;
      transform: translateX(calc(var(---size) * 0.45 + 4px));
    }
  }

  &:where(:hover) .VSwitchIndicator {
    box-shadow: inset 0 2px 1px #0001;

    &::before {
      box-shadow: 0 1px 3px -1px #000a;
    }
  }
  &:where([aria-pressed='true']:hover) .VSwitchIndicator {
    box-shadow: inset 0 2px 1px #0004;

    &::before {
      box-shadow: 0 1px 3px -1px #000f;
    }
  }
}
</style>
