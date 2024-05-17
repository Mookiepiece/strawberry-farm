<script setup lang="ts">
import { computed, isReactive, provide, reactive, ref } from 'vue';
import { CommonTreeItem } from './misc';
import { V_TREE_IN } from './Tree';
import VTreeItem from './VTreeItem.vue';

const model = defineModel<any>();

const props = withDefaults(
  defineProps<{
    tree?: CommonTreeItem[];
    load?: (value: any) => CommonTreeItem[];
  }>(),
  {
    tree: () => [],
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

const tree = computed(() =>
  isReactive(props.tree) ? props.tree : reactive(props.tree),
);

const choices = computed(() => {
  let choices: CommonTreeItem[] = [];

  const each = (i: CommonTreeItem) => {
    choices.push(i);
    if (i.open) {
      Array.isArray(i.children) && i.children?.forEach(each);
    }
  };
  tree.value?.forEach(each);

  return choices;
});

const _current = ref(null);
const current = computed({
  get() {
    return choices.value.some(i => i.value === _current.value)
      ? _current.value
      : choices.value[0].value;
  },
  set(v) {
    _current.value = v;
  },
});

const nav = (delta: 1 | -1) => {
  const i =
    choices.value[
      choices.value.findIndex(({ value }) => value === current.value) + delta
    ];
  if (!i) return;
  current.value = i.value;
};

provide(
  V_TREE_IN,
  reactive({
    model,
    tree,
    load: computed(() => props.load),
    current,
    nav,
  }),
);

const el = ref<HTMLDivElement>();
const onFocus = () =>
  el.value
    ?.querySelector<HTMLElement>('[role="treeitem"][tabindex="0"]')
    ?.focus();

defineExpose({ el });
</script>

<template>
  <div ref="el" role="tree" class="VTree" tabindex="-1" @focus="onFocus">
    <VTreeItem
      v-for="(i, index) in tree"
      :key="i.value"
      v-model="tree[index]"
      v-slot="_"
    >
      <slot v-bind="_">
        <div @click="_.fold(!_.open)">
          {{ _.label ?? _.value }}
        </div>
      </slot>
    </VTreeItem>
  </div>
</template>
