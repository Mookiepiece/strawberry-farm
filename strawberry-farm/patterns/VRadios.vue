<script setup lang="ts" generic="T = any">
import { cloneVNode, h, toRef } from 'vue';
import { ListboxLeaf, ListboxGroup, Listbox } from './listbox';
import { useListbox, UseListboxProps } from './listbox';
import { child } from '../shared';

const model = defineModel();

const props = defineProps<UseListboxProps<T> & { listbox?: Listbox<T> }>();

const slots = defineSlots<{
  default?(props: { option: ListboxLeaf<T> }): any;
  group?(props: { group: ListboxGroup<T> }): any;
}>();

const listbox = useListbox(model, props);
const current = toRef(listbox, 'current');
const nav = listbox.nav;

const renderOption = (i: ListboxLeaf<T>) =>
  cloneVNode(
    (slots.default && child(slots.default({ option: i }))) || h('div', i.label),
    {
      id: listbox.id + ':' + i.index,
      onClick: !i.disabled
        ? (e: MouseEvent) => {
            e.preventDefault();
            if (e.shiftKey && listbox.multi) {
              document.getSelection()?.removeAllRanges();
              const targetIndex = i.index;
              const currentIndex = listbox.current;
              if (currentIndex >= 0) {
                const range =
                  targetIndex < currentIndex
                    ? listbox.options.slice(targetIndex, currentIndex)
                    : listbox.options.slice(currentIndex + 1, targetIndex + 1);

                listbox.input(...range.map(r => r.value));
                listbox.current = targetIndex;
                return;
              }
            }
            listbox.input(i.value);
            listbox.current = listbox.options.findIndex(
              ({ value }) => value === i.value,
            );
          }
        : undefined,
      role: 'option',
      'aria-selected': Array.isArray(listbox.model)
        ? listbox.model.includes(i.value)
        : listbox.model === i.value || undefined,
      class: listbox.current === i.index && 'current',
      'aria-disabled': props.disabled || i.disabled || undefined,
    },
  );

const onKeyDown = (e: KeyboardEvent) => {
  if (listbox.disabled) return;

  if (e.shiftKey && listbox.multi) {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        e.preventDefault();
        const prev = listbox.current;
        nav(-1);
        if (prev !== listbox.current) {
          const value = listbox.options[listbox.current].value;
          listbox.input(value);
        }
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        e.preventDefault();
        const prev = listbox.current;
        nav(1);
        if (prev !== listbox.current) {
          const value = listbox.options[listbox.current].value;
          listbox.input(value);
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        const prev = listbox.current;
        nav(Number.NEGATIVE_INFINITY);
        if (prev !== listbox.current) {
          const range =
            listbox.current < prev
              ? listbox.options.slice(listbox.current, prev)
              : listbox.options.slice(prev + 1, listbox.current + 1);
          listbox.input(...range.map(r => r.value));
        }
        break;
      }
      case 'End': {
        e.preventDefault();
        const prev = listbox.current;
        nav(Number.POSITIVE_INFINITY);
        if (prev !== listbox.current) {
          const range =
            listbox.current < prev
              ? listbox.options.slice(listbox.current, prev)
              : listbox.options.slice(prev + 1, listbox.current + 1);
          listbox.input(...range.map(r => r.value));
        }
        break;
      }
    }
    return;
  } else if (!e.metaKey && !e.ctrlKey) {
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
      case 'Home':
        e.preventDefault();
        nav(Number.NEGATIVE_INFINITY);
        break;
      case 'End':
        e.preventDefault();
        nav(Number.POSITIVE_INFINITY);
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        listbox.input(listbox);
        break;
    }
  }
};

defineExpose({ listbox });
</script>

<template>
  <div
    ref="el"
    :id="listbox.id"
    @keydown.self="onKeyDown"
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
