<script setup lang="ts" generic="T = any">
import { StyleValue, cloneVNode, computed, h, ref, toRef } from 'vue';
import {
  ListboxOption,
  ListboxInput,
  ListboxTreeLeaf,
  ListboxGroup,
  Listbox,
} from './listbox';
import { useListbox, UseListboxProps } from './listbox';

const model = defineModel();

const props = defineProps<UseListboxProps<T> & { listbox?: Listbox<T> }>();

const slots = defineSlots<{
  default?(props: { option: ListboxOption<T> }): any;
  group?(props: { group: ListboxGroup<T> }): any;
}>();

const listbox = useListbox(model, props);
const current = toRef(listbox, 'current');
const nav = listbox.nav;

defineExpose({ listbox });

const renderOption = (i: ListboxTreeLeaf<T>) =>
  cloneVNode(slots.default?.({ option: i }) || h('div', i.label), {
    id: listbox.id + ':' + i.index,
    onClick: !i.disabled ? () => listbox.toggle(i.value) : undefined,
    role: 'option',
    'aria-selected': i.selected || undefined,
    class: i.current && 'current',
    'aria-disabled': props.disabled || i.disabled || undefined,
  });

const onKeyDownExact = (e: KeyboardEvent) => {
  if (listbox.disabled) return;

  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault();
      nav(-1);
      break;
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault();
      nav(1);
      break;
    case ' ':
    case 'Enter':
      e.preventDefault();
      listbox.toggleCurrent();
      break;
  }
};
</script>

<template>
  <div
    ref="el"
    :id="listbox.id"
    @keydown.self.exact="onKeyDownExact"
    role="listbox"
    :tabindex="props.disabled ? -1 : 0"
    :aria-disabled="props.disabled"
    :aria-activedescendant="
      current > -1 ? `${listbox.id}:${current}` : undefined
    "
    :aria-multiselectable="listbox.multi"
  >
    <template
      v-for="g in listbox.tree"
      :key="
        g && typeof g === 'object' && 'options' in g
          ? 'g' + g.title
          : 'i' + g.value
      "
    >
      <div
        role="group"
        :aria-label="g.title"
        v-if="g && typeof g === 'object' && 'options' in g"
      >
        <slot name="group" :group="g">
          <h6>{{ g.title }}</h6>
        </slot>
        <component
          v-for="i in g.options"
          :key="i.value"
          :is="() => renderOption(i)"
        />
      </div>
      <component v-else :is="() => renderOption(g)" />
    </template>
  </div>
</template>
