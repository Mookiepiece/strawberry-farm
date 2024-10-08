<script setup lang="ts" generic="T = any">
import { computed, ref, watchEffect } from 'vue';
import {
  VListbox,
  ListboxLeaf,
  ListboxGroup,
  Listbox,
  useListbox,
  UseListboxProps,
} from '../patterns';

const model = defineModel();

const props = defineProps<
  UseListboxProps<T> & {
    listbox?: Listbox<T>;
    action?(e: KeyboardEvent, listbox: Listbox): void;
  }
>();

const slots = defineSlots<{
  default?(props: { option: ListboxLeaf<T> }): any;
  group?(props: { group: ListboxGroup<T> }): any;
}>();

const listbox = props.listbox || useListbox(model, props);

const magnetic = computed(() => !listbox.multi);

const ready = ref(false);
const root = ref();
watchEffect(
  () => {
    listbox.model;
    const wrap = root.value?.$el as HTMLElement | undefined;
    if (!wrap) return;
    const optionEl = wrap.querySelector<HTMLElement>(
      "[role='option'][aria-selected='true']",
    );
    if (!optionEl) return;
    const [l, w] = [optionEl.offsetLeft, optionEl.offsetWidth];
    wrap.style.setProperty('--v-seg-l', l + 'px');
    wrap.style.setProperty('--v-seg-w', w + 'px');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ready.value = true;
      });
    });
  },
  { flush: 'post' },
);

defineExpose({ listbox });
</script>

<template>
  <VListbox
    :listbox
    circular
    :magnetic
    class="VSegmented"
    :class="[ready && '--ready']"
    ref="root"
  >
    <template #default="props">
      <slot v-bind="props">
        <div data-trunk>
          {{ props.option.label }}
        </div>
      </slot>
    </template>
    <template v-if="$slots.group" #default="props">
      <slot v-bind="props" />
    </template>
  </VListbox>
</template>

<style>
.VSegmented :where([data-trunk]) {
  padding-inline: 15px;
}

.VSegmented {
  position: relative;
  display: inline-flex;

  font-size: var(---f);
  line-height: 1.6;
  outline: none;
  border: 1px solid var(--mat-solid-1);
  background: var(--mat-solid-1);

  --v-seg-l: 0;
  --v-seg-w: 0;

  :where([role='option']) {
    position: relative;
    display: flex;
    align-items: center;

    min-height: 40px;

    color: var(--text-2);
    cursor: pointer;
    user-select: none;

    &:where(:not([aria-disabled='true']):not([aria-selected='true'])) {
      &:where(:hover) {
        color: var(--text-1);
        background: var(--mat-solid-2);
      }
      &:where(:active) {
        background: var(--mat-solid-3);
      }
    }

    &:where([aria-selected='true']) {
      color: var(--600);
      cursor: default;
    }

    &:where([aria-disabled='true']) {
      color: var(--text-3);
      cursor: not-allowed;
    }
  }
}

.VSegmented::before {
  position: absolute;
  left: var(--v-seg-l);
  width: calc(var(--v-seg-w) - 2px);
  height: calc(100% - 2px);
  background: var(--mat-solid-0);
  transform: translate(1px, 1px);
  content: '';
}

.VSegmented.--ready::before {
  transition: all 0.2s var(--curve-wave);
}

.VSegmented:where(:focus-visible) {
  outline: 2px solid var(--500);
}
</style>
