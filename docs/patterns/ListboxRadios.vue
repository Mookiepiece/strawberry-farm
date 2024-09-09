<script setup lang="ts" generic="T = any">
import {
  Listbox,
  ListboxLeaf,
  useListbox,
  UseListboxProps,
  VListbox,
} from '@mookiepiece/strawberry-farm';

const model = defineModel<any>();

const props = defineProps<
  Partial<UseListboxProps<T>> & { listbox?: Listbox<T> }
>();

defineSlots<{
  default(scope: { option: ListboxLeaf<T> }): any;
}>();

const listbox = props.listbox || useListbox<T>(model, props);

defineExpose({ listbox });
</script>

<template>
  <VListbox class="VRadios" v-model="model" v-bind="props" v-slot="{ option }">
    <slot :option>
      <div data-trunk>
        {{ option.label }}
      </div>
    </slot>
  </VListbox>
</template>

<style>
.VRadios :where([data-trunk]) {
  padding-inline: 15px;
}

.VRadios {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  font-size: var(--f2);
  line-height: 1.6;
  outline: none;

  :where([role='option']) {
    position: relative;
    display: flex;
    align-items: center;

    min-height: 40px;

    box-shadow:inset 0 0 0 1px var(--mat-solid-15);
    cursor: pointer;
    user-select: none;

    &:where(:not([aria-disabled='true'])) {
      &:where(:hover) {
        background: var(--mat-solid-1);
      }
      &:where(:active) {
        background: var(--mat-solid-2);
      }
    }

    &:where([aria-selected='true']) {
      color: var(---ink);
      outline-offset: -1px;
      outline: 2px solid var(---main);

      &:where(:not([aria-disabled='true'])) {
        &:where(:hover) {
          background: var(--1);
        }
        &:where(:active) {
          background: var(--2);
        }
      }
    }

    &:where([aria-disabled='true']) {
      color: var(--text-3);
      background: var(--mat-solid-05);
      cursor: not-allowed;
    }
  }
}

.VRadios:where(:focus-visible) :where([role='option'].current) {
  /* outline: 2px solid var(--5);
  outline-offset: -1px; */
}

.VRadios:where(:focus-visible)
  :where([role='option'][aria-selected='true'].current) {
  outline: 2px solid var(--5);
  outline-offset: -1px;
}

/* .VRadios
  :where([role='option']:not([aria-selected='true']) .VCheckboxIndicator) {
  display: none;
}

.VCheckboxIndicator {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 15px;
  height: 15px;
  font-size: 15px;
  color: var(--mat-solid-0);
  background: var(---main);
} */
</style>
