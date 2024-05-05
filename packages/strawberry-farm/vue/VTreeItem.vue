<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue';
import { CommonTreeItem } from './misc';
import { V_TREE_IN } from './Tree';

const props = withDefaults(
  defineProps<{
    item: CommonTreeItem;
    level?: number;
  }>(),
  { level: 0 },
);

const tree = inject(V_TREE_IN);

const el = ref<HTMLDivElement>();

const current = computed(() => tree?.current === props.item.value);
watchEffect(() => {
  if (current.value) el.value?.focus();
});

const selected = computed(() =>
  Array.isArray(tree?.model)
    ? tree.model.includes(props.item.value)
    : tree?.model === props.item,
);

const toggle = () => {
  const $value = props.item.value;
  Array.isArray(tree?.model)
    ? tree.model.includes($value)
      ? tree.model.splice(tree.model.indexOf($value), 1)
      : tree.model.push($value)
    : tree?.model === props.item;
};

const open = computed({
  get() {
    return Array.isArray(props.item.items)
      ? tree?.opens.get(props.item.value)
      : undefined;
  },
  set(v) {
    tree?.opens.set(props.item.value, v as boolean);
  },
});

const slots = defineSlots<{
  default?(props: CommonTreeItem): any;
}>();

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      tree?.nav(1);
      break;
    case 'ArrowUp':
      tree?.nav(-1);
      break;
    case 'ArrowLeft':
      open.value = false;
      break;
    case 'ArrowRight':
      open.value = true;
      break;
    case 'Enter':
    case 'Space':
      toggle();
      break;
  }
};
</script>

<template>
  <div
    ref="el"
    role="treeitem"
    :data-level="level"
    :aria-expanded="item.items?.length ? open : undefined"
    :aria-selected="selected"
    @keydown.self.exact="handleKeydown"
    :tabindex="current ? '0' : '-1'"
  >
    <div @click="open = !open">
      <slot v-bind="{ ...item, open }">
        {{ item.label ?? item.value }}
      </slot>
    </div>
    <div role="group" v-if="open && item.items?.length">
      <VTreeItem
        v-for="i in item.items"
        :key="i.value"
        :item="i"
        :level="level + 1"
      />
    </div>
  </div>
</template>
