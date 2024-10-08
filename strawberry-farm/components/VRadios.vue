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

defineExpose({ listbox });
</script>

<template>
  <VListbox :listbox circular :magnetic class="VRadios">
    <template #default="scope">
      <slot v-bind="scope">
        <div data-trunk>
          {{ scope.option.label }}
        </div>
      </slot>
    </template>
    <template v-if="$slots.group" #group="scope">
      <slot name="group" v-bind="scope" />
    </template>
  </VListbox>
</template>

<style>
.VRadios :where([data-trunk]) {
  padding-inline: 15px;
}

.VRadios {
  &,
  :where([role='group']) {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

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

  :where([role='group'] > h6) {
    font-size: 13px;
    font-weight: 600;
    width: 100%;
  }
  :where([role='group']:not(:first-child) > h6) {
    margin-top: 10px;
  }
}

.VRadios:where(:focus-visible) :where([role='option'].current) {
  box-shadow:
    0 0 0 3px var(--mat-solid-0),
    0 0 0 5px var(--500);
}
</style>
