<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue';
import { CommonTreeItem } from './misc';
import { V_TREE_IN } from './Tree';
import { share } from '../functions';

const model = defineModel<CommonTreeItem>({
  required: true,
});

withDefaults(
  defineProps<{
    level?: number;
  }>(),
  {
    level: 0,
  },
);

const slots = defineSlots<{
  default?(
    props: CommonTreeItem & {
      current: boolean;
      selected: boolean;
      loading: boolean;
      foldable: boolean;
      level: number;
      fold(open?: boolean): Promise<unknown>;
      toggle(): void;
    },
  ): any;
}>();

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
  },
  set(v) {
    model.value.open = v as boolean;
  },
});

const foldable = computed(
  () =>
    !!(Array.isArray(model.value.children)
      ? model.value.children.length
      : model.value.children),
);

const loading = ref(false);
const load = share(async () => {
  try {
    loading.value = true;
    const $item = model;
    $item.value.children = await tree.load?.($item.value);
  } finally {
    loading.value = false;
  }
});

const show = async () => {
  open.value = true;
  if (model.value.children === true) await load();
};

const fold = async ($open = !open.value) => {
  if ($open) show();
  else open.value = false;
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
      show();
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
    :aria-expanded="foldable ? open : undefined"
    :aria-busy="loading"
    :aria-selected="selected"
    @keydown.self.exact="handleKeydown"
    :tabindex="current ? '0' : '-1'"
    :data-level="level"
  >
    <slot
      v-bind="{
        ...model,
        current,
        selected,
        foldable,
        loading,
        level,
        fold,
        toggle,
      }"
    />
    <div
      role="group"
      v-if="open && Array.isArray(model.children) && model.children.length"
    >
      <VTreeItem
        v-for="(i, index) in model.children"
        v-model="model.children[index]"
        :level="level + 1"
        :key="i.value"
        v-slot="_"
      >
        <slot v-bind="_" />
      </VTreeItem>
    </div>
  </div>
</template>
