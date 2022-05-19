import React from 'react';
import type { Emitter } from '@mookiepiece/starfall-utils';

let seed = 0;
export const uuid = (): number => seed++;

export type FarmState = {
  fields: Map<number, FieldRegisterProps>;
  selectedBagItem: FarmBagItem | null;
  bag: FarmBagItem[];
  wallet: number;
};

export type SeedString = '🍓' | '🍇' | '🌽' | '🍟';

export const SEED_NAME_MAP = new Map<string, { name: string; value: number }>([
  ['🍓', { name: '草莓', value: 200 }],
  ['🍇', { name: '葡萄', value: 100 }],
  ['🌽', { name: '玉米', value: 50 }],
  ['🍟', { name: '薯条', value: 300 }],
]);

export type FarmBagItem = {
  id: number;
  type: SeedString;
};

export type FieldRegisterProps = {
  id: number;
};
export type FarmMitt = Emitter<{
  PLANT: undefined;
  HARVEST: FarmBagItem;
  SELECT_BAG_ITEM: FarmBagItem;
  REGISTER_FIELD: FieldRegisterProps;
  UNREGISTER_FIELD: number;
}>;

export const FarmContext = React.createContext<{
  farmMitt: FarmMitt;
}>({
  farmMitt: { on() {}, off() {}, emit() {} },
});
