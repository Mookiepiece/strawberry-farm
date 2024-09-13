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

const objKeyBuckets = new WeakMap();
const ObjKey = (cacheKey: any) => {
  return (
    (cacheKey && objKeyBuckets.get(cacheKey)) ||
    (() => {
      const key = 0n;
      const ids = new WeakMap<any, string>();
      const ans = (i: any) => {
        if (typeof i === 'symbol') {
          return i;
        }
        if (i && typeof i === 'object') {
          return (
            ids.get(i) ||
            (() => {
              const ans = 'object' + key.toString();
              ids.set(i, ans);
              return ans;
            })()
          );
        }

        return typeof i + i;
      };
      objKeyBuckets.set(cacheKey, ans);
      return ans;
    })()
  );
};

export const useListboxEx = weakCache((listbox: Listbox) => {
  const only = () => {};

  const addRange = (a: number, b: number) => {
    if (a < 0 || b < 0) return;
    const range = listbox.options.slice(Math.min(a, b), Math.max(a, b) + 1);
    const models = new Set(listbox.model);
    listbox.input(...range.map(r => r.value).filter(i => !models.has(i)));
  };

  const findIndex = (v: any) =>
    listbox.options.findIndex(({ value }) => value === v);

  return {
    addRange,
    findIndex,
  };
});

const toArray = (a: any) => (Array.isArray(a) ? a : [a]);

export const handleShiftKeyAnchor = () => {};

export const handleListboxClickAdvanced = (
  listbox: Listbox,
  i: ListboxLeaf,
  anchor = -1,
) => {
  return (e: MouseEvent) => {
    if (i.disabled) return;
    if (listbox.multi) {
      if (e.shiftKey) {
        document.getSelection()?.removeAllRanges();
        const a = i.index;
        const b = (anchor > -1 && anchor) || listbox.current;
        if (b >= 0) {
          const range = listbox.options.slice(
            Math.min(a, b),
            Math.max(a, b) + 1,
          );
          const models = new Set(listbox.model);
          listbox.input(...range.map(r => r.value).filter(i => !models.has(i)));
          listbox.current = a;
        }
      } else {
        if (e.ctrlKey) {
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
};

export const handleListboxKeyDownShiftAdvanced =
  (listbox: Listbox) => (e: KeyboardEvent) => {
    if (!listbox.multi) return;
    const { nav } = listbox;
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
  };

export const handleListboxKeyDownExactAdvanced =
  (listbox: Listbox, circular: boolean, magnetic: boolean) =>
  (e: KeyboardEvent) => {
    const nav = (delta: number) => {
      if (!magnetic) return listbox.nav(delta, circular);
      const prev = listbox.current;
      listbox.nav(delta, circular);
      if (prev !== listbox.current) {
        listbox.input(...toArray(listbox.model), listbox);
      }
    };

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
  };
</script>

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

const renderOption = (i: ListboxLeaf<T>) =>
  cloneVNode(
    (slots.default && child(slots.default({ option: i }))) || h('div', i.label),
    {
      id: listbox.id + ':' + i.index,
      onPointerdown: (e: MouseEvent) =>
        handleListboxClickAdvanced(listbox, i, anchor)(e),
      onClick: () => {},
      //       onPointerdown: () => {
      //         // 1+1
      // listbox.current=0      },
      'data-key': objKey(i.value),
      role: 'option',
      'aria-selected':
        (Array.isArray(listbox.model)
          ? listbox.model.includes(i.value)
          : listbox.model === i.value) || undefined,
      class: listbox.current === i.index && 'current',
      'aria-disabled': props.disabled || i.disabled || undefined,
    },
  );

let anchor = -1;

const onKeyDown = (e: KeyboardEvent) => {
  if (listbox.disabled) return;

  if (e.shiftKey) {
    anchor = listbox.current;
  } else {
    anchor = -1;
  }

  if (e.shiftKey) {
    handleListboxKeyDownShiftAdvanced(listbox)(e);
  } else if (!e.metaKey) {
    handleListboxKeyDownExactAdvanced(listbox, false, !e.ctrlKey)(e);
  }
};

const objKey = ObjKey(listbox);

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
          : objKey(g.value)
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
          :key="objKey(i.value)"
          :is="renderOption(i)"
        />
      </div>
      <component v-else :is="renderOption(g)" />
    </template>
  </div>
</template>
