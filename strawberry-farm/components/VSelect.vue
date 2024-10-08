<script setup lang="ts" generic="T">
import { ListboxInput } from '../patterns';
import VListbox from '../patterns/VListbox.vue';
import { applyTransform, flip, margin, PopPlugin, sameWidth } from '../shared';
import VPopover from './VPopover.vue';

const model = defineModel();

const props = withDefaults(
  defineProps<{
    options?: ListboxInput<T>;
    disabled?: boolean;
    placeholder?: string;
    clearable?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const clickToClose = (e: Event, cb: () => void) =>
  !Array.isArray(model) &&
  e.target instanceof Element &&
  e.target.matches("[role='option']") &&
  cb();

const spaceToClose = (e: Event, cb: () => void) =>
  !Array.isArray(model) && cb();

const plugins: PopPlugin[] = [
  margin(5),
  flip({ margin: 5 }),
  sameWidth,
  applyTransform,
];
</script>

<template>
  <VPopover trigger="click" animated trap :plugins>
    <template #default="{ open }">
      <div
        :tabindex="-disabled"
        class="VField VSelect"
        :aria-expanded="open"
        :aria-disabled="disabled"
      >
        <div data-trunk>Value: {{ model }}</div>
      </div>
    </template>
    <template #popper="pop">
      <div>
        <VListbox
          v-model="model"
          @click="(e: Event) => clickToClose(e, () => (pop.open = false))"
          @keydown.space="
            (e: Event) => spaceToClose(e, () => (pop.open = false))
          "
          :action="
            (_, listbox) => {
              listbox.input(listbox);
              spaceToClose(_, () => (pop.open = false));
            }
          "
          :magnetic="false"
          class="VSelectPicker"
          :options
        />
      </div>
    </template>
  </VPopover>
</template>
<style>
:where(.VSelect .VInputTrunk) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:where(.VSelect .VInputTrunk) {
  pointer-events: none;
}

:where(.VSelect:not([aria-disabled='true']):hover) {
  outline-color: var(---main);
  cursor: pointer;
}

:where(.VSelect:is(:focus-within, [aria-expanded='true'])) {
  outline: 2px solid var(---main);
}

:where(.VSelect[aria-expanded='true']) {
  box-shadow: 0 0 0 4px var(---foam);
}

.VSelectPicker {
  background-color: var(--mat-solid-0);
  outline: 0;

  :where([role='option']) {
    display: flex;
    align-items: center;
    gap: 5px;
    height: var(---size);
    padding: 10px;
    font-size: var(---f);
    line-height: 1.6;

    white-space: nowrap;
    /* text-overflow: ellipsis; unavailable */
    overflow: hidden;

    &:where(:not([aria-disabled='true'])) {
      cursor: pointer;
    }
    &:where(:not([aria-disabled='true']):hover) {
      background-color: var(--mat-solid-1);
    }
    &:where(:not([aria-disabled='true']):active) {
      background-color: var(--mat-solid-2);
    }
    &:where([aria-selected='true']) {
      color: var(---ink);
      background: color-mix(in oklab, var(---foam), transparent 50%);
    }
    &:where([aria-selected='true']:not([aria-disabled='true']):hover) {
      background: color-mix(in oklab, var(---foam), transparent 25%);
    }

    &:where([aria-selected='true']:not([aria-disabled='true']):active) {
      background: color-mix(in oklab, var(---foam), transparent 0%);
    }
  }

  &:where(:focus-visible) :where([role='option'].current) {
    outline: 2px solid var(---main);
    outline-offset: -2px;
  }

  :where([role='group'] > h6) {
    display: block;
    padding: 10px 10px 5px;
    font-size: 13px;
    line-height: 1.6;
    font-weight: 600;
  }
}
</style>
