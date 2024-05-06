<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue';
import { CommonTreeItem } from './misc';
import { V_TREE_IN } from './Tree';

const model = defineModel<CommonTreeItem>({
  required: true,
});

const tree = inject(V_TREE_IN);
if (!tree) throw new Error();

const el = ref<HTMLDivElement>();

const current = computed(() => tree.current === model.value.value);
watchEffect(() => {
  if (current.value) el.value?.focus();
});

const selected = computed(() =>
  Array.isArray(tree.model)
    ? tree.model.includes(model.value.value)
    : tree.model === model.value.value,
);

const toggle = () => {
  const $value = model.value.value;

  Array.isArray(tree.model)
    ? tree.model.includes($value)
      ? tree.model.splice(tree.model.indexOf($value), 1)
      : tree.model.push($value)
    : (tree.model = $value);
};

const open = computed({
  get() {
    return !!model.value.open;
    // return Array.isArray(model.items)
    //   ? tree.opens.get(model.value)
    //   : undefined;
  },
  set(v) {
    model.value.open = v as boolean;
    // tree.opens.set(model.value, v as boolean);
  },
});

const slots = defineSlots<{
  default?(props: CommonTreeItem): any;
}>();

const expandable = computed(
  () => model.value.lazy || model.value.items?.length,
);

const loading = ref(false);
const load = async () => {
  try {
    loading.value = true;
    const $item = model;
    $item.value.items = await tree.load?.($item.value);
    delete $item.value.lazy;
  } finally {
    loading.value = false;
  }
};

const expand = () => {
  open.value = true;
  if (model.value.lazy) load();
};

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
      expand();
      break;
    case 'Enter':
    case ' ':
      toggle();
      break;
  }
};
</script>

<template>
  <div
    ref="el"
    role="treeitem"
    :aria-expanded="expandable ? open : undefined"
    :aria-busy="loading"
    :aria-selected="selected"
    @keydown.self.exact="handleKeydown"
    :tabindex="current ? '0' : '-1'"
  >
    <div @click="open = !open">
      <slot v-bind="{ ...model, open }">
        {{ model.label ?? model.value }}
      </slot>
    </div>
    <div role="group" v-if="open && model.items?.length">
      <VTreeItem
        v-for="(i, index) in model.items"
        v-model="model.items[index]"
        :key="i.value"
        :item="i"
      />
    </div>
  </div>
</template>
