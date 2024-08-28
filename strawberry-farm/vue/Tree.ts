import { InjectionKey, Ref } from 'vue';
import { TreeNode } from './misc';

export const V_TREE_IN: InjectionKey<{
  model?: any;
  connected: boolean;
  tree: TreeNode[];
  load?: (value: any) => TreeNode[];
  nav(delta: 1 | -1): void;
  current: any;
}> = Symbol('VTree');

export const computedSelectedStateForTreeNode = new WeakMap<
  TreeNode<any>,
  Ref<{
    unclear: boolean;
    selected: boolean;
    mixed: boolean;
  }>
>();
