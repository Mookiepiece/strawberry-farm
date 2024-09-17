<script setup lang="ts" generic="T = any">
import { computed } from 'vue';
import {
  VListbox,
  ListboxLeaf,
  ListboxGroup,
  Listbox,
  useListbox,
  UseListboxProps,
} from '../patterns';

const model = defineModel();

const props = withDefaults(
  defineProps<
    UseListboxProps<T> & {
      listbox?: Listbox<T>;
      circular?: boolean;
      magnetic?: boolean;
      action?(e: KeyboardEvent, listbox: Listbox): void;
    }
  >(),
  {
    circular: true,
    magnetic: undefined,
  },
);

const slots = defineSlots<{
  default?(props: { option: ListboxLeaf<T> }): any;
  group?(props: { group: ListboxGroup<T> }): any;
}>();

const listbox = props.listbox || useListbox(model, props);

const magnetic = computed(() => props.magnetic ?? !listbox.multi);

defineExpose({ listbox });
</script>

<template>
  <VListbox :listbox :circular :magnetic class="VRadios">
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

    box-shadow: inset 0 0 0 1px var(--mat-solid-15);
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
      color: var(--600);
      outline-offset: -1px;
      outline: 2px solid var(--500);

      &:where(:not([aria-disabled='true'])) {
        &:where(:hover) {
          background: var(--100);
        }
        &:where(:active) {
          background: var(--200);
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
  box-shadow:
    0 0 0 3px var(--mat-solid-0),
    0 0 0 5px var(--500);
}
</style>
