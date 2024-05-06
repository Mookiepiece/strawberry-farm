<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue';
import { CommonTreeItem } from './misc';
import { V_TREE_IN } from './Tree';

const props = defineProps<{
  item: CommonTreeItem;
}>();

const tree = inject(V_TREE_IN);
if (!tree) throw new Error();

const el = ref<HTMLDivElement>();

const current = computed(() => tree.current === props.item.value);
watchEffect(() => {
  if (current.value) el.value?.focus();
});

const selected = computed(() =>
  Array.isArray(tree.model)
    ? tree.model.includes(props.item.value)
    : tree.model === props.item.value,
);

const toggle = () => {
  const $value = props.item.value;

  Array.isArray(tree.model)
    ? tree.model.includes($value)
      ? tree.model.splice(tree.model.indexOf($value), 1)
      : tree.model.push($value)
    : (tree.model = props.item.value);
};

const open = computed({
  get() {
    return Array.isArray(props.item.items)
      ? tree.opens.get(props.item.value)
      : undefined;
  },
  set(v) {
    tree.opens.set(props.item.value, v as boolean);
  },
});

const slots = defineSlots<{
  default?(props: CommonTreeItem): any;
}>();

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      tree.nav(1);
      break;
    case 'ArrowUp':
      tree.nav(-1);
      break;
    case 'ArrowLeft':
      open.value = false;
      break;
    case 'ArrowRight':
      open.value = true;
      break;
    case 'Enter':
    case ' ':
      toggle();
      break;
  }
};

// const expandable = computed(()=>{
//   props.item.lazy || props.item.items?.length
// })
</script>

<template>
  <div
    ref="el"
    role="treeitem"
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
      <VTreeItem v-for="i in item.items" :key="i.value" :item="i" />
    </div>
  </div>
</template>
