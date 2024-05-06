import { InjectionKey } from 'vue';
import { CommonTreeItem } from './misc';

export const V_TREE_IN: InjectionKey<{
  model?: any;
  items: CommonTreeItem[];
  load?: (value: any) => CommonTreeItem[];
  nav(delta: 1 | -1): void;
  opens: Map<any, boolean>;
  current: any;
}> = Symbol('VTree');
