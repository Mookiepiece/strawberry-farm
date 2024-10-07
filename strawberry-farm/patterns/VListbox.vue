<script lang="ts">
const weakCache = <F extends (param: any) => any>(cb: F): F => {
  const weakMap = new WeakMap<any, any>();

  return ((param: any) =>
    weakMap.get(param) ||
    (() => {
      const a = cb(param);
      weakMap.set(param, a);
      return a;
    })()) as F;
};

const toArray = (a: any) => (Array.isArray(a) ? a : [a]);

export const useListboxExtra = weakCache((listbox: Listbox) => {
  const addRange = (a: number, b: number) => {
    if (a < 0 || b < 0) return;
    const range = listbox.options.slice(Math.min(a, b), Math.max(a, b) + 1);
    const models = new Set(listbox.model);
    listbox.input(...range.map(r => r.value).filter(i => !models.has(i)));
  };

  const findIndex = (v: any) =>
    listbox.options.findIndex(({ value }) => value === v);

  let anchor = -1;
  const handleKeydown = (
    e: KeyboardEvent,
    {
      circular = false,
      magnetic = true,
    }: {
      circular?: boolean;
      magnetic?: boolean;
    } = {},
  ) => {
    if (listbox.disabled) return;

    if (e.shiftKey) {
      anchor = listbox.current;
    } else {
      anchor = -1;
    }

    if (e.shiftKey) {
      if (!listbox.multi) return;
      const nav = (delta: number) => {
        e.preventDefault();
        listbox.nav(delta);
        addRange(anchor, listbox.current);
      };
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          nav(-1);
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          nav(1);
          break;
        case 'Home':
          nav(-Infinity);
          break;
        case 'End':
          nav(Infinity);
          break;
      }
    } else {
      const nav = (delta: number) => {
        e.preventDefault();
        if (magnetic === e.ctrlKey) return listbox.nav(delta, circular);
        const prev = listbox.current;
        listbox.nav(delta, circular);
        if (prev !== listbox.current) {
          listbox.input(...toArray(listbox.model), listbox);
        }
      };

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          nav(-1);
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          nav(1);
          break;
        case 'Home':
          nav(-Infinity);
          break;
        case 'End':
          nav(Infinity);
          break;
        case ' ':
          e.preventDefault();
          listbox.input(listbox);
          break;
      }
    }
  };

  const handlePointerdown = (
    e: MouseEvent,
    i: ListboxLeaf,
    { magnetic = true }: { magnetic?: boolean } = {},
  ) => {
    if (i.disabled) return;
    if (listbox.multi) {
      if (e.shiftKey) {
        document.getSelection()?.removeAllRanges();
        const a = i.index;
        const b = (anchor > -1 && anchor) || listbox.current;
        if (b >= 0) {
          listbox.current = a;
          useListboxExtra(listbox).addRange(a, b);
        }
      } else {
        if (e.ctrlKey === magnetic) {
          listbox.input(i.value);
          listbox.current = i.index;
        } else {
          listbox.input(...listbox.model, i.value);
          listbox.current = i.index;
        }
      }
    } else {
      listbox.input(i.value);
      listbox.current = i.index;
    }
  };

  return {
    addRange,
    findIndex,
    getAnchor: () => anchor,

    handlePointerdown,
    handleKeydown,
  };
});
</script>

<script setup lang="ts" generic="T = any">
import { cloneVNode, h, ref, toRef } from 'vue';
import { ListboxLeaf, ListboxGroup, Listbox } from './listbox';
import { useListbox, UseListboxProps } from './listbox';
import { child } from '../shared';

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
  { magnetic: true },
);

const slots = defineSlots<{
  default?(props: { option: ListboxLeaf<T> }): any;
  group?(props: { group: ListboxGroup<T> }): any;
}>();

const listbox = props.listbox || useListbox(model, props);
const listboxEX = useListboxExtra(listbox);
const current = toRef(listbox, 'current');

const renderOption = (i: ListboxLeaf<T>) =>
  cloneVNode(
    (slots.default && child(slots.default({ option: i }))) || h('div', i.label),
    {
      id: listbox.id + ':' + i.index,
      onPointerdown: (e: MouseEvent) => e.shiftKey && e.preventDefault(),
      onClick: (e: MouseEvent) =>
        listboxEX.handlePointerdown(e, i, { magnetic: props.magnetic }),
      role: 'option',
      'aria-selected':
        (Array.isArray(listbox.model)
          ? listbox.model.includes(i.value)
          : listbox.model === i.value) || undefined,
      class: listbox.current === i.index && 'current',
      'aria-disabled': props.disabled || i.disabled || undefined,
    },
  );

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    props.action
      ? props.action(e, listbox)
      : (root.value as HTMLElement).closest('form')?.submit();
  } else {
    listboxEX.handleKeydown(e, {
      circular: props.circular,
      magnetic: props.magnetic,
    });
  }
};

const root = ref();

defineExpose({ listbox });
</script>

<template>
  <div
    ref="root"
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
    <template v-for="(g, index) in listbox.tree" :key="index">
      <div
        role="group"
        :aria-label="g.title"
        v-if="g && typeof g === 'object' && 'options' in g"
      >
        <slot name="group" :group="g">
          <h6>{{ g.title }}</h6>
        </slot>
        <component
          v-for="(i, index) in g.options"
          :key="index"
          :is="renderOption(i)"
        />
      </div>
      <component v-else :is="renderOption(g)" />
    </template>
  </div>
</template>
